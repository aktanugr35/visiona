// components/hero/HeroCustomCursor.tsx
'use client'

import { useEffect, useRef } from 'react'

export default function HeroCustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Sadece desktop'ta çalış
        if (window.matchMedia('(hover: none)').matches) return

        let dotX = 0, dotY = 0
        let ringX = 0, ringY = 0
        let raf: number

        const onMove = (e: MouseEvent) => {
            dotX = e.clientX
            dotY = e.clientY
        }
        window.addEventListener('mousemove', onMove)

        const update = () => {
            ringX += (dotX - ringX) * 0.11
            ringY += (dotY - ringY) * 0.11

            if (dotRef.current) {
                dotRef.current.style.left = `${dotX}px`
                dotRef.current.style.top = `${dotY}px`
            }
            if (ringRef.current) {
                ringRef.current.style.left = `${ringX}px`
                ringRef.current.style.top = `${ringY}px`
            }
            raf = requestAnimationFrame(update)
        }
        update()

        // Tıklanabilir elementlerde hover state
        const addHover = (el: Element) => {
            el.addEventListener('mouseenter', () => rootRef.current?.classList.add('ih-cursor--hover'))
            el.addEventListener('mouseleave', () => rootRef.current?.classList.remove('ih-cursor--hover'))
        }
        document.querySelectorAll('a, button, [data-cursor]').forEach(addHover)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
        }
    }, [])

    return (
        <div className="ih-cursor" ref={rootRef}>
            <div className="ih-cursor__dot" ref={dotRef} />
            <div className="ih-cursor__ring" ref={ringRef} />
        </div>
    )
}
