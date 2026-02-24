// components/hero/HeroCanvas.tsx
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // --- SAHNE KURULUMU ---
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,       // Şeffaf — arkaplan CSS'ten gelecek
            antialias: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // --- PARTİKÜL SİSTEMİ ---
        // Mobilde performans için daha az parçacık
        const isMobile = window.innerWidth < 768
        const particleCount = isMobile ? 100 : 300

        const positions = new Float32Array(particleCount * 3)
        const velocities: { x: number; y: number }[] = []

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10
            velocities.push({
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.002,
            })
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        // Renk: mevcut --color-blue = #2020FF = rgb(32,32,255)
        const material = new THREE.PointsMaterial({
            color: 0x2020FF,   // --color-blue
            size: isMobile ? 0.06 : 0.04,
            transparent: true,
            opacity: isMobile ? 0.4 : 0.55,
            sizeAttenuation: true,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        // --- MOUSE PARALLAX ---
        let mouseX = 0, mouseY = 0
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', onMouseMove)

        // --- ANİMASYON DÖNGÜSÜ ---
        let animId: number
        const animate = () => {
            animId = requestAnimationFrame(animate)

            // Kamera mouse'a göre hafif kayar
            camera.position.x += (mouseX * 0.25 - camera.position.x) * 0.04
            camera.position.y += (mouseY * 0.25 - camera.position.y) * 0.04
            camera.lookAt(scene.position)

            // Parçacıklar drift eder
            const pos = particles.geometry.attributes.position.array as Float32Array
            for (let i = 0; i < particleCount; i++) {
                pos[i * 3] += velocities[i].x
                pos[i * 3 + 1] += velocities[i].y
                if (Math.abs(pos[i * 3]) > 10) velocities[i].x *= -1
                if (Math.abs(pos[i * 3 + 1]) > 10) velocities[i].y *= -1
            }
            particles.geometry.attributes.position.needsUpdate = true

            // Sistem yavaşça döner
            particles.rotation.y += 0.0003
            particles.rotation.x += 0.0001

            renderer.render(scene, camera)
        }
        animate()

        // --- RESIZE ---
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize)

        // --- CLEANUP ---
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%', height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
            id="ih-canvas"
        />
    )
}
