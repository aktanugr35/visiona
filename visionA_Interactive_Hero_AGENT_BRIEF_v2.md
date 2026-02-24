# visionA — İnteraktif Hero Ekleme Brief'i
## Mevcut Siteye Entegrasyon · AI Agent Talimatı

> **BAĞLAM:** Site `visionA_Website_Plan.md` belgesine göre kurulmuş durumda.
> CSS değişkenleri, fontlar, spacing ve component'ler tanımlı ve aktif.
> Bu brief **sadece `app/page.tsx` içindeki mevcut hero section'ını** değiştirir.
> Başka hiçbir sayfaya, component'e veya global CSS'e dokunma.

---

## GÖREV: NE YAPILACAK?

Mevcut `<HeroSection>` component'ini kaldır. Yerine **scroll-driven, 5 sahneli, Three.js canvas arkaplan ve özel cursor içeren interaktif bir açılış deneyimi** yaz.

Kullanıcı siteye girdiğinde:
1. Preloader (logo animasyonu)
2. 5 scroll sahnesi — tam ekran, sinematik (scrub animasyonlu)
3. Kullanıcı son sahneyi geçince → sitenin geri kalanı (`#F5F5F0` arkaplan, mevcut navbar, tickerdan itibaren) normal devam eder

**Kritik kural:** Sitenin geri kalanındaki hiçbir section değişmez. Sadece hero bölümü güncellenir.

---

## MEVCUT DOSYA YAPISI

Agent şu yapıyı görecek — **kalın** olanlar değiştirilebilir/oluşturulacak, diğerlerine dokunma:

```
app/
├── page.tsx                      ← BURADA hero değiştirilecek
├── layout.tsx                    ← DOKUNMA
globals.css                       ← DOKUNMA (sadece .hero-canvas eklenebilir)
components/
├── sections/
│   ├── HeroSection.tsx           ← BU SİLİNECEK / YERİNE InteractiveHero GELECEK
│   ├── ServicesSection.tsx       ← DOKUNMA
│   ├── PortfolioSection.tsx      ← DOKUNMA
│   └── ...diğer sectionlar      ← DOKUNMA
├── layout/
│   ├── Navbar.tsx                ← DOKUNMA
│   └── Footer.tsx                ← DOKUNMA
├── ui/
│   ├── Button.tsx                ← DOKUNMA (mevcut stilleri kullan)
│   └── Badge.tsx                 ← DOKUNMA (mevcut stilleri kullan)
│
← YENİ OLUŞTURULACAK DOSYALAR:
components/
└── hero/
    ├── InteractiveHero.tsx       ← Ana wrapper component
    ├── HeroCanvas.tsx            ← Three.js canvas (parçacıklar)
    ├── HeroScenes.tsx            ← 5 sahnenin HTML/JSX içeriği
    └── HeroCustomCursor.tsx      ← Özel cursor
styles/
└── interactive-hero.css          ← Sadece hero'ya ait stiller
```

---

## PAKET KURULUMU

Önce bu paketlerin kurulu olup olmadığını `package.json`'dan kontrol et.
Eksik olanları kur:

```bash
npm install gsap @gsap/react lenis three
npm install --save-dev @types/three
```

`ScrollTrigger` GSAP'in içinde gelir, ayrı kurulum gerekmez.

---

## BÖLÜM 1: `app/page.tsx` DEĞİŞİKLİĞİ

`page.tsx` dosyasını bul. Mevcut yapı şuna benziyordur:

```tsx
// MEVCUT page.tsx — bu şekilde görünüyor olabilir
import HeroSection from '@/components/sections/HeroSection'
import TickerSection from '@/components/sections/TickerSection'
import ServicesSection from '@/components/sections/ServicesSection'
// ...

export default function Home() {
  return (
    <>
      <HeroSection />         {/* ← BU SATIRI DEĞİŞTİR */}
      <TickerSection />
      <ServicesSection />
      {/* ... geri kalan sectionlar */}
    </>
  )
}
```

Bunu şu hale getir:

```tsx
// GÜNCELLENMİŞ page.tsx
import InteractiveHero from '@/components/hero/InteractiveHero'
import TickerSection from '@/components/sections/TickerSection'
import ServicesSection from '@/components/sections/ServicesSection'
// ... diğer importlar aynı kalır

export default function Home() {
  return (
    <>
      <InteractiveHero />     {/* ← YENİ */}
      <TickerSection />       {/* ← DEĞİŞMEDİ */}
      <ServicesSection />     {/* ← DEĞİŞMEDİ */}
      {/* ... geri kalanlar DEĞİŞMEDİ */}
    </>
  )
}
```

**Dikkat:** `HeroSection` importu ve component'i artık kullanılmıyor ama dosyayı silme — sadece import etme.

---

## BÖLÜM 2: `InteractiveHero.tsx` — ANA WRAPPER

```tsx
// components/hero/InteractiveHero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
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

  // --- PRELOADER BİTİNCE SCROLL AÇ ---
  useEffect(() => {
    if (preloaderDone) {
      document.body.style.overflow = 'auto'
      initScrollScenes()
    }
  }, [preloaderDone])

  // --- 5 SAHNE GSAP SCROLL TRIGGER KURULUMU ---
  const initScrollScenes = () => {
    const container = containerRef.current
    if (!container) return

    // Sahne geçiş fonksiyonu — scroll progress'e göre sahne show/hide
    const scenes = container.querySelectorAll<HTMLElement>('.ih-scene')

    // Sahne 1 → 2 geçişi (scroll 0–20%)
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '20% top',
        scrub: 1.5,
      }
    })
    .to('#ih-scene-1 .ih-badge', { y: -40, opacity: 0, duration: 0.4 })
    .to('#ih-scene-1 .ih-title', { y: -80, opacity: 0, duration: 0.6, stagger: 0.1 }, '<0.1')
    .to('#ih-scene-1 .ih-subtitle', { y: -50, opacity: 0, duration: 0.4 }, '<0.2')
    .to('#ih-scene-1 .ih-cta-group', { y: -40, opacity: 0, duration: 0.3 }, '<0.1')
    .to('#ih-scene-1 .ih-stats', { y: -30, opacity: 0, duration: 0.3 }, '<0.1')
    .to('#ih-scene-1', { opacity: 0, duration: 0.3 }, '-=0.2')
    .fromTo('#ih-scene-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')

    // Sahne 2 → 3 geçişi (scroll 20–40%)
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: '20% top',
        end: '40% top',
        scrub: 1.5,
      }
    })
    .to('#ih-scene-2 .ih-service-item', { x: 60, opacity: 0, duration: 0.5, stagger: 0.08 })
    .to('#ih-scene-2', { opacity: 0, duration: 0.3 }, '-=0.3')
    .fromTo('#ih-scene-3', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

    // Sahne 3 manifesto satırları — scrub ile kelime kelime belirir
    ScrollTrigger.create({
      trigger: container,
      start: '40% top',
      end: '60% top',
      scrub: 1.2,
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
        scrub: 1,
      }
    })
    .to('#ih-scene-3', { opacity: 0, duration: 0.4 })
    .fromTo('#ih-scene-4', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.2')

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
        scrub: 1,
      }
    })
    .to('#ih-scene-4', { opacity: 0, duration: 0.4 })
    .fromTo('#ih-scene-5', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

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

    return () => ScrollTrigger.killAll()
  }

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
// Mevcut Navbar component'ini kullanmak yerine, hero süresi için ayrı basit navbar
// Çünkü mevcut navbar açık arka plana göre stillendirilmiş olabilir
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
          {[1,2,3,4,5].map((n) => (
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

        <a href="/iletisim" className="ih-navbar__cta">Teklif Al →</a>
      </div>
    </nav>
  )
}
```

---

## BÖLÜM 3: `HeroScenes.tsx` — 5 SAHNENİN İÇERİĞİ

```tsx
// components/hero/HeroScenes.tsx

export default function HeroScenes() {
  return (
    <>
      {/* ═══════════════════════════════════════
          SAHNE 1 — Hero (varsayılan görünüm)
          Tüm scroll başlamadan gösterilen ilk içerik
      ═══════════════════════════════════════ */}
      <section className="ih-scene" id="ih-scene-1">
        <div className="ih-scene__inner">

          {/* Badge — mevcut site badge stiline uygun ama dark mod için */}
          <div className="ih-badge">
            <span className="ih-badge__dot" />
            Social Media AI Agency
          </div>

          {/* Başlık — --font-display değişkeni kullan */}
          <h1 className="ih-title">
            <span className="ih-title__line">Markanızı</span>
            <span className="ih-title__line ih-title__line--accent">Geleceğe</span>
            <span className="ih-title__line">Taşıyoruz.</span>
          </h1>

          {/* Alt başlık — --font-body, --text-body kullan */}
          <p className="ih-subtitle">
            AI'nın gücüyle sosyal medyada gerçek etki yaratıyoruz.<br />
            İçerik, strateji ve analitik — hepsi bir arada.
          </p>

          {/* CTA Butonlar
              ÖNEMLI: Mevcut btn-primary ve btn-outline class'larını KULLANMA.
              Zira mevcut butonlar --color-blue (#2020FF) arkaplan üzerine değil,
              açık (#F5F5F0) arka plan için tasarlanmış.
              Bu hero bölümüne özel dark-mod buton stilleri aşağıda tanımlandı. */}
          <div className="ih-cta-group">
            <a href="/iletisim" className="ih-btn-primary">
              Hemen Başlayın →
            </a>
            <a href="/projeler" className="ih-btn-outline">
              Portföyü Gör
            </a>
          </div>

          {/* İstatistikler — --font-mono kullan */}
          <div className="ih-stats">
            <div className="ih-stat">
              <span className="ih-stat__number">150<span className="ih-stat__suffix">+</span></span>
              <span className="ih-stat__label">Başarılı Proje</span>
            </div>
            <div className="ih-stat__divider" />
            <div className="ih-stat">
              <span className="ih-stat__number">48<span className="ih-stat__suffix">s</span></span>
              <span className="ih-stat__label">Maks. Teslimat</span>
            </div>
            <div className="ih-stat__divider" />
            <div className="ih-stat">
              <span className="ih-stat__number"><span className="ih-stat__prefix">%</span>340</span>
              <span className="ih-stat__label">Ortalama ROI</span>
            </div>
          </div>

          {/* Scroll ipucu */}
          <div className="ih-scroll-hint">
            <div className="ih-scroll-hint__line" />
            <span>Scroll</span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SAHNE 2 — Hizmetler Teaserı
          Kullanıcı scroll etmeye başlayınca görünür
      ═══════════════════════════════════════ */}
      <section className="ih-scene" id="ih-scene-2" style={{ opacity: 0 }}>
        <div className="ih-scene__inner">
          <span className="ih-section-label">Ne Yapıyoruz?</span>

          <div className="ih-services-list">
            {[
              { num: '01', name: 'AI İçerik Üretimi' },
              { num: '02', name: 'Sosyal Medya Yönetimi' },
              { num: '03', name: 'AI Reklam Kreatifleri' },
              { num: '04', name: 'Strateji & Analitik' },
            ].map((s) => (
              <div className="ih-service-item" key={s.num}>
                <span className="ih-service-item__num">{s.num}</span>
                <span className="ih-service-item__name">{s.name}</span>
                <div className="ih-service-item__bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SAHNE 3 — Manifesto
          Satırlar scrub ile sırayla belirir
      ═══════════════════════════════════════ */}
      <section className="ih-scene" id="ih-scene-3" style={{ opacity: 0 }}>
        <div className="ih-scene__inner ih-scene__inner--center">
          <p className="ih-manifesto">
            <span className="ih-manifesto-line" style={{ opacity: 0 }}>
              İçerik üretmek artık
            </span>
            <span className="ih-manifesto-line ih-manifesto-line--accent" style={{ opacity: 0 }}>
              herkesin elinde.
            </span>
            <span className="ih-manifesto-line" style={{ opacity: 0 }}>
              Etki yaratmak ise
            </span>
            <span className="ih-manifesto-line ih-manifesto-line--accent" style={{ opacity: 0 }}>
              hâlâ bir sanat.
            </span>
            <span className="ih-manifesto-line ih-manifesto-line--muted" style={{ opacity: 0 }}>
              Biz bu sanatı AI ile birleştiriyoruz.
            </span>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SAHNE 4 — Sayılar (count-up)
      ═══════════════════════════════════════ */}
      <section className="ih-scene" id="ih-scene-4" style={{ opacity: 0 }}>
        <div className="ih-scene__inner ih-scene__inner--center">
          <span className="ih-section-label">Rakamlarla visionA</span>

          <div className="ih-stats-grid">
            {[
              { count: 150, suffix: '+', label: 'Başarılı Proje' },
              { count: 48, suffix: 's', label: 'Maks. Teslimat' },
              { count: 340, prefix: '%', label: 'Ortalama ROI' },
              { count: 98, suffix: '%', label: 'Müşteri Memnuniyeti' },
            ].map((s, i) => (
              <div className="ih-stat-block" key={i}>
                <div className="ih-stat-block__number">
                  {s.prefix && <span className="ih-stat-block__prefix">{s.prefix}</span>}
                  <span data-count={s.count}>0</span>
                  {s.suffix && <span className="ih-stat-block__suffix">{s.suffix}</span>}
                </div>
                <p className="ih-stat-block__label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SAHNE 5 — Final CTA
          Son sahne — kullanıcı siteye geçmeye hazır
      ═══════════════════════════════════════ */}
      <section className="ih-scene" id="ih-scene-5" style={{ opacity: 0 }}>
        <div className="ih-scene__inner ih-scene__inner--center">
          <p className="ih-cta-eyebrow">Hazır mısınız?</p>
          <h2 className="ih-cta-title">
            Markanızı birlikte<br />
            <span className="ih-gradient-text">büyütelim.</span>
          </h2>
          <p className="ih-cta-sub">
            İlk görüşme ücretsiz. 48 saat içinde dönüş garantisi.
          </p>
          <a href="/iletisim" className="ih-btn-primary ih-btn-primary--xl">
            Ücretsiz Teklif Al →
          </a>

          {/* Sosyal kanıt */}
          <div className="ih-social-proof">
            <div className="ih-avatars">
              {['A','B','C','D'].map((l, i) => (
                <div key={i} className="ih-avatar">{l}</div>
              ))}
            </div>
            <p><strong>150+ marka</strong> bize güveniyor</p>
          </div>
        </div>
      </section>
    </>
  )
}
```

---

## BÖLÜM 4: `HeroCanvas.tsx` — THREE.JS CANVAS

```tsx
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
      positions[i * 3]     = (Math.random() - 0.5) * 20
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
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
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
        pos[i * 3]     += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y
        if (Math.abs(pos[i * 3])     > 10) velocities[i].x *= -1
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
        // Canvas sadece hero section görünürken aktif
        // Kullanıcı hero'yu geçince JS ile visibility: hidden yapılır (aşağıda CSS)
      }}
      id="ih-canvas"
    />
  )
}
```

---

## BÖLÜM 5: `HeroCustomCursor.tsx`

```tsx
// components/hero/HeroCustomCursor.tsx
'use client'

import { useEffect, useRef } from 'react'

export default function HeroCustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
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
        dotRef.current.style.top  = `${dotY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top  = `${ringY}px`
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
      <div className="ih-cursor__dot"  ref={dotRef}  />
      <div className="ih-cursor__ring" ref={ringRef} />
    </div>
  )
}
```

---

## BÖLÜM 6: `interactive-hero.css` — TÜM STILLER

> **Kural:** Bu dosyada mevcut site CSS değişkenlerini (`--color-blue`, `--font-display` vb.) kullan.
> Global stilleri override etme. Tüm class isimlerinde `ih-` prefix'i zorunlu.

```css
/* styles/interactive-hero.css */

/* =============================================
   TEMEL DURUM — hero aktifken body ayarları
   ============================================= */

/* Sistem cursor'unu sadece hero canvas üzerinde gizle */
.ih-scroll-container * { cursor: none; }
@media (hover: none) { .ih-scroll-container * { cursor: auto; } }

/* =============================================
   PRELOADER
   ============================================= */
.ih-preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--color-bg-navy, #050520);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ih-preloader__logo {
  width: 160px;
  /* opacity ve scale GSAP tarafından yönetilir */
}

/* =============================================
   SCROLL CONTAINER — 500vh
   ============================================= */
.ih-scroll-container {
  height: 500vh;
  position: relative;
  /* Canvas arkaplan üstünde, site içeriği altında */
  z-index: 2;
}

.ih-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  /* Arkaplan: canvas'tan gelen koyu renk görünsün diye şeffaf */
  background: transparent;
}

/* Canvas: sadece hero scroll bölgesinde görünür */
#ih-canvas {
  /* JS ile kontrol — scroll container'ın dışına çıkınca gizle */
}

/* =============================================
   CANVAS ARKAPLAN — CSS katmanı
   Canvas zaten var ama üzerine mesh gradient ekle
   ============================================= */
.ih-sticky::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    var(--color-bg-navy, #050520),
    radial-gradient(ellipse at 15% 20%, rgba(32,32,255,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 80%, rgba(0,40,200,0.10) 0%, transparent 50%);
  /* Not: canvas üstte olduğu için bu gerçekte görünmez ama canvas opacity azalırsa görünür */
  z-index: -1;
}

/* Koyu arka planı explicit olarak canvas altına koy */
.ih-scroll-container::before {
  content: '';
  position: sticky;
  top: 0;
  display: block;
  height: 100vh;
  background: var(--color-bg-navy, #050520);
  z-index: 1;
  pointer-events: none;
}

/* =============================================
   SAHNELER — ORTAK
   ============================================= */
.ih-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* opacity GSAP tarafından yönetilir */
}

/* İlk sahne başlangıçta görünür */
#ih-scene-1 { opacity: 1; }

.ih-scene__inner {
  width: 100%;
  max-width: var(--container-max, 1440px);
  padding: 0 var(--container-padding, clamp(24px, 5vw, 80px));
}

.ih-scene__inner--center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* =============================================
   SAHNE 1 — HERO İÇERİĞİ
   ============================================= */

/* Badge — sitenin .badge stilinden türetildi ama dark mod */
.ih-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1, 8px);
  background: rgba(32, 32, 255, 0.12);
  border: 1px solid rgba(32, 32, 255, 0.25);
  border-radius: 100px;
  padding: 8px 20px;
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(140, 140, 255, 0.9);
  margin-bottom: var(--space-4, 32px);
  width: fit-content;
}

.ih-badge__dot {
  width: 6px;
  height: 6px;
  background: var(--color-blue, #2020FF);
  border-radius: 50%;
  animation: ih-pulse 2.2s ease-in-out infinite;
}

@keyframes ih-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(1.5); }
}

/* Hero başlık — --text-hero değişkenini kullan */
.ih-title {
  font-family: var(--font-display, 'Clash Display', sans-serif);
  font-size: var(--text-hero, clamp(64px, 8vw, 120px));
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 0 0 var(--space-3, 24px);
}

.ih-title__line { display: block; }

/* Gradient metin — --gradient-primary değişkenini kullan */
.ih-title__line--accent {
  background: var(--gradient-primary, linear-gradient(135deg, #2020FF 0%, #0040FF 50%, #4444FF 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: ih-gradientShift 4s ease-in-out infinite;
}

@keyframes ih-gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

/* aynı class'ı diğer yerlerde de kullan */
.ih-gradient-text {
  background: var(--gradient-primary, linear-gradient(135deg, #2020FF 0%, #0040FF 50%, #4444FF 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: ih-gradientShift 4s ease-in-out infinite;
}

/* Subtitle */
.ih-subtitle {
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: var(--text-body, clamp(15px, 1.2vw, 18px));
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
  max-width: 520px;
  margin: 0 0 var(--space-4, 32px);
}

/* CTA Buton Grubu */
.ih-cta-group {
  display: flex;
  align-items: center;
  gap: var(--space-2, 16px);
  flex-wrap: wrap;
  margin-bottom: var(--space-8, 64px);
}

/* Primary buton — dark mod (mevcut btn-primary'yi override ETMİYOR) */
.ih-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-blue, #2020FF);
  color: #ffffff;
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 15px;
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 100px;
  text-decoration: none;
  border: none;
  position: relative;
  overflow: hidden;
  transition: transform var(--duration-base, 250ms) var(--ease-out, cubic-bezier(0.16,1,0.3,1)),
              box-shadow var(--duration-base, 250ms) var(--ease-out, cubic-bezier(0.16,1,0.3,1));
}

.ih-btn-primary::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 35%; height: 200%;
  background: rgba(255, 255, 255, 0.12);
  transform: skewX(-20deg);
  transition: left var(--duration-slower, 700ms) ease;
}
.ih-btn-primary:hover::after { left: 120%; }
.ih-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(32, 32, 255, 0.4);
  background: var(--color-blue-light, #4444FF);
}

.ih-btn-primary--xl {
  font-size: 17px;
  padding: 20px 44px;
}

/* Outline buton — dark mod */
.ih-btn-outline {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 15px;
  font-weight: 600;
  padding: 15px 30px;
  border-radius: 100px;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  text-decoration: none;
  transition: border-color var(--duration-base, 250ms), color var(--duration-base, 250ms),
              background var(--duration-base, 250ms);
}
.ih-btn-outline:hover {
  border-color: var(--color-blue, #2020FF);
  color: #ffffff;
  background: rgba(32, 32, 255, 0.1);
}

/* İstatistikler */
.ih-stats {
  display: flex;
  align-items: center;
  gap: var(--space-6, 48px);
  padding-top: var(--space-4, 32px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.ih-stat__divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

.ih-stat__number {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 2px;
  line-height: 1;
}

.ih-stat__suffix, .ih-stat__prefix {
  font-size: 0.6em;
  color: var(--color-blue, #2020FF);
}

.ih-stat__label {
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 6px;
  letter-spacing: 0.04em;
}

/* Scroll ipucu */
.ih-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.25);
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ih-scroll-hint__line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(32,32,255,0.6), transparent);
  animation: ih-scrollLine 2s ease-in-out infinite;
}

@keyframes ih-scrollLine {
  0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
  49%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
  50%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}

/* =============================================
   SAHNE 2 — HİZMETLER
   ============================================= */
.ih-section-label {
  display: block;
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-blue, #2020FF);
  margin-bottom: var(--space-4, 32px);
}

.ih-services-list {
  width: 100%;
  max-width: 900px;
}

.ih-service-item {
  display: flex;
  align-items: center;
  gap: var(--space-3, 24px);
  padding: 28px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}

.ih-service-item__bar {
  position: absolute;
  bottom: 0; left: 0;
  height: 1px;
  width: 0;
  background: linear-gradient(90deg, var(--color-blue, #2020FF), transparent);
  transition: width 0.6s ease;
}
.ih-service-item:hover .ih-service-item__bar { width: 100%; }

.ih-service-item__num {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  color: var(--color-blue, #2020FF);
  min-width: 32px;
  flex-shrink: 0;
}

.ih-service-item__name {
  font-family: var(--font-display, 'Clash Display', sans-serif);
  font-size: clamp(28px, 4vw, 56px);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.02em;
}

/* =============================================
   SAHNE 3 — MANİFESTO
   ============================================= */
.ih-manifesto {
  font-family: var(--font-display, 'Clash Display', sans-serif);
  font-size: clamp(36px, 5.5vw, 80px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

/* opacity ve transform GSAP ile yönetilir */
.ih-manifesto-line { color: rgba(255, 255, 255, 0.15); will-change: opacity, transform; }
.ih-manifesto-line--accent { color: var(--color-blue-light, #4444FF); }
.ih-manifesto-line--muted {
  font-size: 0.52em;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
  letter-spacing: -0.01em;
}

/* =============================================
   SAHNE 4 — SAYILAR
   ============================================= */
.ih-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  max-width: 800px;
  width: 100%;
  margin-top: var(--space-4, 32px);
}

.ih-stat-block {
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(32, 32, 255, 0.08);
  transition: background var(--duration-base, 250ms);
}
.ih-stat-block:hover { background: rgba(32, 32, 255, 0.06); }

.ih-stat-block__number {
  font-family: var(--font-display, 'Clash Display', sans-serif);
  font-size: clamp(56px, 7vw, 96px);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.04em;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.ih-stat-block__suffix,
.ih-stat-block__prefix {
  font-size: 0.45em;
  color: var(--color-blue, #2020FF);
}

.ih-stat-block__label {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-align: left;
}

/* =============================================
   SAHNE 5 — SON CTA
   ============================================= */
.ih-cta-eyebrow {
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: var(--space-2, 16px);
}

.ih-cta-title {
  font-family: var(--font-display, 'Clash Display', sans-serif);
  font-size: var(--text-h2, clamp(40px, 5vw, 72px));
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: var(--space-3, 24px);
}

.ih-cta-sub {
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: var(--text-body, 17px);
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: var(--space-6, 48px);
}

.ih-social-proof {
  display: flex;
  align-items: center;
  gap: var(--space-2, 16px);
  margin-top: var(--space-6, 48px);
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 14px;
}

.ih-social-proof strong { color: rgba(255, 255, 255, 0.75); }

.ih-avatars { display: flex; }

.ih-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--color-blue, #2020FF);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: white;
  border: 2px solid var(--color-bg-navy, #050520);
  margin-left: -8px;
}
.ih-avatar:first-child { margin-left: 0; }

/* =============================================
   NAVİGASYON
   ============================================= */
.ih-navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 24px 0;
  transition: background var(--duration-slow, 400ms), padding var(--duration-base, 250ms);
}

.ih-navbar--scrolled {
  background: rgba(5, 5, 32, 0.88);
  backdrop-filter: blur(24px);
  padding: 16px 0;
  border-bottom: 1px solid rgba(32, 32, 255, 0.1);
}

.ih-navbar__inner {
  max-width: var(--container-max, 1440px);
  margin: 0 auto;
  padding: 0 var(--container-padding, clamp(24px, 5vw, 80px));
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ih-dot-nav { display: flex; align-items: center; gap: 10px; }

.ih-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: none;
  cursor: pointer;
  transition: background var(--duration-base, 250ms), transform var(--duration-base, 250ms);
  padding: 0;
}
.ih-dot--active { background: var(--color-blue, #2020FF); transform: scale(1.5); }

.ih-navbar__cta {
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 10px 22px;
  border-radius: 100px;
  transition: border-color var(--duration-base, 250ms), background var(--duration-base, 250ms),
              color var(--duration-base, 250ms);
}
.ih-navbar__cta:hover {
  border-color: var(--color-blue, #2020FF);
  background: rgba(32, 32, 255, 0.12);
  color: #ffffff;
}

/* =============================================
   ÖZEL CURSOR
   ============================================= */
.ih-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9998;
}

@media (hover: none) { .ih-cursor { display: none !important; } }

.ih-cursor__dot {
  position: absolute;
  width: 8px; height: 8px;
  background: var(--color-blue, #2020FF);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width var(--duration-base, 250ms), height var(--duration-base, 250ms);
}

.ih-cursor__ring {
  position: absolute;
  width: 40px; height: 40px;
  border: 1.5px solid rgba(32, 32, 255, 0.45);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width var(--duration-slow, 400ms) var(--ease-out, cubic-bezier(0.16,1,0.3,1)),
              height var(--duration-slow, 400ms) var(--ease-out, cubic-bezier(0.16,1,0.3,1)),
              background var(--duration-slow, 400ms);
}

.ih-cursor--hover .ih-cursor__dot  { width: 0; height: 0; }
.ih-cursor--hover .ih-cursor__ring {
  width: 72px; height: 72px;
  background: rgba(32, 32, 255, 0.07);
  border-color: rgba(32, 32, 255, 0.7);
}

/* =============================================
   GEÇİŞ — HERO KOYU → SİTE AÇIK
   ============================================= */
.ih-transition-fade {
  height: 120px;
  background: linear-gradient(
    to bottom,
    var(--color-bg-navy, #050520) 0%,
    var(--color-bg, #F5F5F0) 100%
  );
  position: relative;
  z-index: 2;
  /* Bu element canvas'ı örter ve sitenin geri kalanına yumuşak geçiş sağlar */
}

/* Canvas: hero scroll bölgesi dışında gizle */
.ih-canvas-hidden { display: none; }

/* =============================================
   RESPONSİVE
   ============================================= */
@media (max-width: 768px) {
  .ih-title { font-size: clamp(40px, 10vw, 64px); }
  .ih-cta-group { flex-direction: column; align-items: flex-start; }
  .ih-stats { gap: var(--space-4, 32px); flex-wrap: wrap; }
  .ih-stats-grid { grid-template-columns: 1fr 1fr; }
  .ih-stat-block { padding: 28px 20px; }
  .ih-stat-block__number { font-size: clamp(40px, 10vw, 64px); }
  .ih-service-item__name { font-size: clamp(22px, 6vw, 36px); }
  .ih-manifesto { font-size: clamp(28px, 7vw, 48px); }
  .ih-dot-nav { display: none; } /* Mobilde nokta nav gizle */
  .ih-scroll-hint { display: none; }
}

@media (max-width: 480px) {
  .ih-stats { flex-direction: column; gap: var(--space-2, 16px); }
  .ih-stat__divider { display: none; }
  .ih-stats-grid { grid-template-columns: 1fr; }
}

/* Hareket azaltma tercihi */
@media (prefers-reduced-motion: reduce) {
  /* Scroll container'ı normal flow'a çevir */
  .ih-scroll-container { height: auto; }
  .ih-sticky { position: relative; height: auto; overflow: visible; }
  .ih-scene { position: relative; opacity: 1 !important; height: auto; }
  #ih-scene-2, #ih-scene-3, #ih-scene-4, #ih-scene-5 {
    display: none; /* Sadece ilk sahne göster */
  }
  #ih-canvas { display: none; }
  .ih-manifesto-line { opacity: 1 !important; transform: none !important; }
  /* Animasyon sınıfları devre dışı */
  .ih-badge__dot,
  .ih-scroll-hint__line,
  .ih-title__line--accent,
  .ih-gradient-text { animation: none; }
}
```

---

## BÖLÜM 7: CANVAS GIZLEME — HERO BİTİNCE

Hero scroll bölgesinin sonuna gelindiğinde canvas gizlenmeli, aksi takdirde sitenin geri kalanının üzerinde koyu parçacıklar görünür.

`InteractiveHero.tsx` içindeki `initScrollScenes` fonksiyonuna şunu ekle:

```tsx
// Canvas'ı hero bitince gizle
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'bottom bottom',   // kullanıcı 500vh'ı geçince
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
```

---

## BÖLÜM 8: MEVCUT NAVBAR ÇAKIŞMA ÇÖZÜMÜ

Mevcut `Navbar.tsx` muhtemelen açık arkaplan için stillendirilmiştir (koyu metin, `--color-bg` arkaplan). Hero bölümünde navbar görünmeyecek ya da yanlış görünebilir.

Çözüm: `layout.tsx`'i aç, `<Navbar>` component'ine koşullu sınıf ekle:

```tsx
// layout.tsx — mevcut yapı muhtemelen şuna benziyor:
import Navbar from '@/components/layout/Navbar'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />          {/* ← bu var */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

Hero sayfasında mevcut Navbar'ı gizle, InteractiveHero kendi navbar'ını gösteriyor:

**Seçenek A (Önerilen) — Navbar'a prop ekle:**
```tsx
// Navbar.tsx içine ekle:
// Hero sayfasında Navbar kendini gizler
// InteractiveHero kendi ih-navbar'ını kullanır

// app/page.tsx'de:
// <InteractiveHero /> component'i içinde zaten IHNavbar var
// Bu yüzden layout.tsx'deki Navbar'ı hero scroll süresince gizlemek gerekir
```

**Seçenek B (En kolay) — layout.tsx'e koşul ekle:**

Eğer Navbar zaten `position: fixed` ise ve InteractiveHero'nun kendi `ih-navbar`'ı da `position: fixed, z-index: 100` ise **üst üste binerler**.

Bunu önlemek için `layout.tsx`'e şunu ekle:

```tsx
// app/layout.tsx
'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'

function ConditionalNavbar() {
  const pathname = usePathname()
  // Ana sayfada mevcut navbar'ı render etme — InteractiveHero kendi navbar'ını gösteriyor
  if (pathname === '/') return null
  return <Navbar />
}
```

---

## BÖLÜM 9: LOGO DOSYASI KONTROLÜ

Agent şunları kontrol edecek:

1. `public/logo-white.svg` mevcut mu? → Varsa kullan.
2. Sadece `public/logo.svg` varsa (mavi versiyon) → SVG'yi aç, `fill` rengini `#ffffff` yap, `logo-white.svg` olarak kaydet.
3. Hiç SVG yoksa → Önce kullanıcıya sor.

---

## BÖLÜM 10: TAMAMLANMA KRİTERLERİ

Agent şu kontrolleri yaparak tamamlandığını doğrular:

**Entegrasyon:**
- [ ] `page.tsx`'de `<HeroSection />` yerine `<InteractiveHero />` kullanılıyor
- [ ] Diğer hiçbir sayfa ve component değiştirilmedi
- [ ] `ih-` prefix'li class'lar site genelindeki CSS ile çakışmıyor
- [ ] Logo dosyası doğru path'te mevcut

**Davranış:**
- [ ] Preloader: logo görünüyor, ~1.5s sonra çıkıyor
- [ ] Three.js canvas: parçacıklar görünüyor ve mouse'a tepki veriyor
- [ ] Scroll 0 → %100: 5 sahne sırayla geçiş yapıyor
- [ ] Sayfa 500vh sonrası `TickerSection` ve devamı normal görünüyor
- [ ] Koyu hero → açık site geçişi (`ih-transition-fade`) yumuşak
- [ ] Canvas, hero bölgesi bittikten sonra görünmüyor (site içeriğinin üstünde değil)
- [ ] Nokta navigasyon scroll pozisyonuna göre aktif noktayı güncelliyor
- [ ] Nokta tıklanınca doğru sahneye scroll oluyor

**Responsive:**
- [ ] Mobilde cursor yok, sistem cursor'u görünüyor
- [ ] Mobilde parçacık sayısı 100 (300 değil)
- [ ] Tüm metin boyutları clamp ile ölçekleniyor
- [ ] Mobil layout bozulmuyor

**Performans:**
- [ ] Console'da JS hatası yok
- [ ] Canvas cleanup (unmount'ta `cancelAnimationFrame` çalışıyor)
- [ ] ScrollTrigger cleanup (unmount'ta `kill` çalışıyor)
- [ ] `prefers-reduced-motion` destekleniyor

---

## AGENT'A VERİLECEK HAZIR PROMPT

```
Bu briefi oku: visionA_Interactive_Hero_AGENT_BRIEF_v2.md

Mevcut Next.js projemde visionA_Website_Plan.md'e göre kurulmuş bir site var.
CSS değişkenleri, fontlar, spacing ve componentler tanımlı.

Görevin: Sadece hero section'ı değiştir.
app/page.tsx'deki mevcut <HeroSection />'ı kaldır.
Yerine brifte tarif edilen <InteractiveHero />'yu koy.

Kurallar:
- Diğer hiçbir sayfaya, componente veya global CSS'e dokunma
- Tüm class isimlerinde ih- prefix kullan (mevcut sınıflarla çakışma olmasın)
- Mevcut CSS değişkenlerini (--color-blue, --font-display vb.) kullan, hardcode etme
- logo-white.svg path'ini public klasöründen kontrol et, yoksa yöntem seç

Bitince hero scroll'unu test et: 5 sahne geçiyor mu, canvas görünüyor mu,
500vh sonrası site normal devam ediyor mu. Raporla.
```

---

*Bu brief mevcut visionA sitesine uyumlu olarak hazırlanmıştır.
Site plan belgesi: `visionA_Website_Plan.md` · Hero brief: bu belge*
