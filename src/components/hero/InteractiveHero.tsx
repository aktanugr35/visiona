// components/hero/InteractiveHero.tsx
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import HeroCanvas from './HeroCanvas'
import HeroCustomCursor from './HeroCustomCursor'
import HeroScenes from './HeroScenes'
import '@/styles/interactive-hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [preloaderDone, setPreloaderDone] = useState(false)

    // --- LENIS SMOOTH SCROLL KURULUMU ---
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => { lenis.raf(time * 1000) })
        gsap.ticker.lagSmoothing(0)

        // Preloader bittikten sonra scroll'u aç
        document.body.style.overflow = 'hidden'

        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => { lenis.raf(time * 1000) })
        }
    }, [])

    // --- 5 SAHNE GSAP SCROLL TRIGGER KURULUMU ---
    const initScrollScenes = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        // Sahne 1 → 2 geçişi (scroll 0–20%)
        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: '20% top',
                scrub: true,
            }
        })
            .to('#ih-scene-1 .ih-badge', { y: -40, opacity: 0, duration: 0.4 })
            .to('#ih-scene-1 .ih-title', { y: -80, opacity: 0, duration: 0.6, stagger: 0.1 }, '<0.1')
            .to('#ih-scene-1 .ih-subtitle', { y: -50, opacity: 0, duration: 0.4 }, '<0.2')
            .to('#ih-scene-1 .ih-cta-group', { y: -40, opacity: 0, duration: 0.3 }, '<0.1')
            .to('#ih-scene-1 .ih-stats', { y: -30, opacity: 0, duration: 0.3 }, '<0.1')
            .to('#ih-scene-1', { opacity: 0, visibility: 'hidden', pointerEvents: 'none', duration: 0.3 }, '-=0.2')
            .fromTo('#ih-scene-2', { opacity: 0, y: 50, visibility: 'visible', pointerEvents: 'auto' }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, '-=0.3')

        // Sahne 2 → 3 geçişi (scroll 20–40%)
        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: '20% top',
                end: '40% top',
                scrub: true,
            }
        })
            .to('#ih-scene-2 .ih-service-item', { x: 60, opacity: 0, duration: 0.5, stagger: 0.08 })
            .to('#ih-scene-2', { opacity: 0, visibility: 'hidden', pointerEvents: 'none', duration: 0.3 }, '-=0.3')
            .fromTo('#ih-scene-3', { opacity: 0, visibility: 'visible', pointerEvents: 'auto' }, { opacity: 1, duration: 0.5, immediateRender: false }, '-=0.2')

        // Sahne 3 manifesto satırları — scrub ile kelime kelime belirir
        ScrollTrigger.create({
            trigger: container,
            start: '40% top',
            end: '60% top',
            scrub: true,
            onUpdate: (self) => {
                const lines = document.querySelectorAll<HTMLElement>('#ih-scene-3 .ih-manifesto-line')
                lines.forEach((line, i) => {
                    const lineProgress = Math.max(0, Math.min(1, self.progress * lines.length - i * 0.6))
                    line.style.opacity = String(lineProgress)
                    line.style.transform = `translateY(${(1 - lineProgress) * 50}px)`
                })
            }
        })

        // Sahne 3 → 4 geçişi (scroll 55–65%)
        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: '58% top',
                end: '65% top',
                scrub: true,
            }
        })
            .to('#ih-scene-3', { opacity: 0, visibility: 'hidden', pointerEvents: 'none', duration: 0.4 })
            .fromTo('#ih-scene-4', { opacity: 0, scale: 0.96, visibility: 'visible', pointerEvents: 'auto' }, { opacity: 1, scale: 1, duration: 0.6, immediateRender: false }, '-=0.2')

        // Sahne 4 count-up — bir kez tetiklenir, scrub değil
        ScrollTrigger.create({
            trigger: container,
            start: '65% top',
            once: true,
            onEnter: () => {
                document.querySelectorAll<HTMLElement>('#ih-scene-4 [data-count]').forEach((el) => {
                    const target = parseInt(el.dataset.count || '0')
                    gsap.fromTo(el,
                        { textContent: '0' },
                        {
                            textContent: target,
                            duration: 2,
                            ease: 'power2.out',
                            snap: { textContent: 1 },
                            onUpdate() {
                                el.textContent = String(Math.round(parseFloat(el.textContent || '0')))
                            },
                        }
                    )
                })
            }
        })

        // Sahne 4 → 5 geçişi (scroll 75–85%)
        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: '78% top',
                end: '86% top',
                scrub: true,
            }
        })
            .to('#ih-scene-4', { opacity: 0, visibility: 'hidden', pointerEvents: 'none', duration: 0.4 })
            .fromTo('#ih-scene-5', { opacity: 0, y: 40, visibility: 'visible', pointerEvents: 'auto' }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, '-=0.2')

        // Sahne 5 CTA başlığı scale-in
        gsap.fromTo('#ih-scene-5 .ih-cta-title',
            { scale: 0.88, opacity: 0 },
            {
                scale: 1, opacity: 1, duration: 1, ease: 'expo.out',
                scrollTrigger: {
                    trigger: container,
                    start: '80% top',
                    toggleActions: 'play none none reverse',
                }
            }
        )

        // Nokta navigasyon güncelleme
        ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const index = Math.min(4, Math.floor(self.progress * 5))
                document.querySelectorAll('.ih-dot').forEach((dot, i) => {
                    dot.classList.toggle('ih-dot--active', i === index)
                })
            }
        })

        // Canvas'ı hero bitince gizle
        ScrollTrigger.create({
            trigger: container,
            start: 'bottom bottom',
            end: 'bottom bottom',
            onEnter: () => {
                const canvas = document.getElementById('ih-canvas') as HTMLCanvasElement
                if (canvas) canvas.style.display = 'none'
            },
            onLeaveBack: () => {
                const canvas = document.getElementById('ih-canvas') as HTMLCanvasElement
                if (canvas) canvas.style.display = 'block'
            }
        })

        return () => ScrollTrigger.killAll()
    }, [])

    // --- PRELOADER BİTİNCE SCROLL AÇ ---
    useEffect(() => {
        if (preloaderDone) {
            document.body.style.overflow = 'auto'
            initScrollScenes()
        }
    }, [preloaderDone, initScrollScenes])

    return (
        <>
            {/* Preloader */}
            <IHPreloader onDone={() => setPreloaderDone(true)} />

            {/* Özel cursor — sadece desktop */}
            <HeroCustomCursor />

            {/* Navigasyon — hero üzerine, koyu arkaplan modunda */}
            <IHNavbar />

            {/* Three.js canvas arkaplan */}
            <HeroCanvas />

            {/* 500vh scroll container */}
            <div className="ih-scroll-container" ref={containerRef} id="ih-container">
                <div className="ih-sticky">
                    <HeroScenes />
                </div>
            </div>

            {/* Geçiş çizgisi: hero koyu → site açık */}
            <div className="ih-transition-fade" />
        </>
    )
}

// --- PRELOADER ALT COMPONENT ---
function IHPreloader({ onDone }: { onDone: () => void }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const tl = gsap.timeline()
        tl.fromTo('.ih-preloader__logo',
            { scale: 0.65, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
        )
            .to('.ih-preloader__logo', {
                y: -28, opacity: 0, duration: 0.45, ease: 'power2.in'
            }, '+=0.35')
            .to(el, {
                opacity: 0, duration: 0.4,
                onComplete: () => {
                    el.style.display = 'none'
                    onDone()
                }
            }, '<')
    }, [onDone])

    return (
        <div className="ih-preloader" ref={ref}>
            {/* Mevcut projeden logo path'ini kullan */}
            <img
                className="ih-preloader__logo"
                src="/logo-white.svg"
                alt="visionA"
                width={160}
            />
        </div>
    )
}

// --- HERO NAVİGASYON (Koyu modda özel versiyon) ---
function IHNavbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`ih-navbar ${scrolled ? 'ih-navbar--scrolled' : ''}`}>
            <div className="ih-navbar__inner">
                <a href="/" className="ih-navbar__logo">
                    {/* Beyaz logo versiyonu — public klasöründeki mevcut dosyayı kullan */}
                    <img src="/logo-white.svg" alt="visionA" height={32} />
                </a>

                {/* Sahne nokta göstergesi */}
                <div className="ih-dot-nav" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            className={`ih-dot ${n === 1 ? 'ih-dot--active' : ''}`}
                            aria-label={`Sahne ${n}`}
                            onClick={() => {
                                const container = document.getElementById('ih-container')
                                if (!container) return
                                const targetY = container.offsetTop + (container.offsetHeight * (n - 1) / 5)
                                window.scrollTo({ top: targetY, behavior: 'smooth' })
                            }}
                        />
                    ))}
                </div>

                <a href="https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="ih-navbar__cta">Teklif Al →</a>
            </div>
        </nav>
    )
}
