# visionA — Website Tasarım & Geliştirme Planı
### Social Media AI Agency · A'dan Z'ye Kapsamlı Kılavuz

---

## İÇİNDEKİLER

1. [Marka Kimliği & Tasarım Sistemi](#1-marka-kimliği--tasarım-sistemi)
2. [Site Mimarisi & Sayfa Yapısı](#2-site-mimarisi--sayfa-yapısı)
3. [Hero Bölümü](#3-hero-bölümü)
4. [Hizmetler Bölümü](#4-hizmetler-bölümü)
5. [Neden visionA?](#5-neden-visiona)
6. [Portföy / Projeler](#6-portföy--projeler)
7. [Süreç Bölümü](#7-süreç-bölümü)
8. [Fiyatlandırma](#8-fiyatlandırma)
9. [Testimonial & Sosyal Kanıt](#9-testimonial--sosyal-kanıt)
10. [Blog / İçgörüler](#10-blog--içgörüler)
11. [Hakkımızda Sayfası](#11-hakkımızda-sayfası)
12. [İletişim Sayfası](#12-iletişim-sayfası)
13. [Navigasyon & Footer](#13-navigasyon--footer)
14. [Animasyon & Mikro-Etkileşim Planı](#14-animasyon--mikro-etkileşim-planı)
15. [Responsive & Mobil Tasarım](#15-responsive--mobil-tasarım)
16. [Teknik Stack & Altyapı](#16-teknik-stack--altyapı)
17. [SEO & Performans](#17-seo--performans)
18. [İçerik Yazarlığı Kılavuzu](#18-içerik-yazarlığı-kılavuzu)
19. [Görseller & Medya](#19-görseller--medya)
20. [Lansman Kontrol Listesi](#20-lansman-kontrol-listesi)

---

## 1. Marka Kimliği & Tasarım Sistemi

### 1.1 Renk Paleti

| İsim | HEX | Kullanım |
|------|-----|----------|
| **visionBlue (Primary)** | `#2020FF` | Logo, CTA butonlar, vurgular |
| **visionBlue Dark** | `#0A0AE0` | Hover state, koyu arka planlar |
| **visionBlue Light** | `#4444FF` | Gradient başlangıcı |
| **Electric Blue** | `#0040FF` | İkincil vurgu, animasyonlar |
| **Off-White** | `#F5F5F0` | Ana arkaplan (logodaki krem tonu) |
| **True White** | `#FFFFFF` | Kartlar, overlay |
| **Near Black** | `#0A0A12` | Koyu section arka planları |
| **Deep Navy** | `#050520` | Dark mode bölümler |
| **Muted Blue** | `#E8E8FF` | Açık vurgu arka planları |
| **Gray 400** | `#9090A0` | Yardımcı metin |

**Gradient Formülleri:**
```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #2020FF 0%, #0040FF 50%, #4444FF 100%);

/* Glow Effect */
--gradient-glow: radial-gradient(ellipse at center, rgba(32,32,255,0.3) 0%, transparent 70%);

/* Hero Mesh */
--gradient-mesh: 
  radial-gradient(at 20% 30%, rgba(32,32,255,0.15) 0px, transparent 50%),
  radial-gradient(at 80% 70%, rgba(0,64,255,0.12) 0px, transparent 50%),
  radial-gradient(at 50% 50%, rgba(68,68,255,0.08) 0px, transparent 70%);
```

### 1.2 Tipografi

**Display Font:** `Clash Display` (Google Fonts / Fontshare)
- Heading 1: 80–120px, Weight 700, Letter-spacing: -0.03em
- Heading 2: 56–72px, Weight 600, Letter-spacing: -0.02em
- Heading 3: 36–48px, Weight 600

**Body Font:** `DM Sans` (Google Fonts)
- Body Large: 18–20px, Weight 400
- Body Regular: 16px, Weight 400
- Caption: 13–14px, Weight 500, Uppercase, Letter-spacing: 0.08em

**Monospace (Teknik Detaylar):** `JetBrains Mono`
- Fiyat, sayılar, kod blokları: 14–16px

```css
/* CSS Variables */
--font-display: 'Clash Display', sans-serif;
--font-body: 'DM Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-hero: clamp(64px, 8vw, 120px);
--text-h2: clamp(40px, 5vw, 72px);
--text-h3: clamp(28px, 3.5vw, 48px);
--text-body: clamp(15px, 1.2vw, 18px);
```

### 1.3 Spacing & Grid

```css
/* 8px base grid */
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-6: 48px;
--space-8: 64px;
--space-12: 96px;
--space-16: 128px;
--space-24: 192px;

/* Container */
--container-max: 1440px;
--container-padding: clamp(24px, 5vw, 80px);

/* Grid */
--grid-cols: 12;
--grid-gap: 24px;
```

### 1.4 Bileşen Stilleri

```css
/* Butonlar */
.btn-primary {
  background: var(--color-blue);
  color: white;
  padding: 16px 32px;
  border-radius: 100px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(32,32,255,0.4);
}

.btn-outline {
  border: 1.5px solid var(--color-blue);
  color: var(--color-blue);
  background: transparent;
  padding: 14px 30px;
  border-radius: 100px;
}

/* Kartlar */
.card {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(32,32,255,0.08);
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
}
.card:hover {
  border-color: rgba(32,32,255,0.2);
  box-shadow: 0 8px 40px rgba(32,32,255,0.1);
}

/* Badge / Tag */
.badge {
  background: rgba(32,32,255,0.08);
  color: #2020FF;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Glow Efekti */
.glow {
  box-shadow: 0 0 60px rgba(32,32,255,0.25), 0 0 120px rgba(32,32,255,0.1);
}

/* Glassmorphism */
.glass {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
}
```

### 1.5 Logo Kullanımı

- **Ana Logo:** Mavi versiyon (`#2020FF`) — açık arka planlarda
- **Beyaz Logo:** Koyu/karanlık bölümlerde
- **Minimum Boyut:** 120px genişlik (web), 40px (mobil nav)
- **Koruma Alanı:** Logo genişliğinin %20'si her taraftan boşluk
- **Yasak:** Logo üzerine efekt, rotasyon veya renk değişikliği yapılmamalı

---

## 2. Site Mimarisi & Sayfa Yapısı

```
visionA Website
│
├── / (Ana Sayfa)
│   ├── Hero
│   ├── Ticker / Logo Marquee
│   ├── Hizmetler (Özet)
│   ├── Neden visionA?
│   ├── Öne Çıkan Projeler
│   ├── Süreç
│   ├── Testimonials
│   └── CTA Section
│
├── /hizmetler
│   ├── AI İçerik Üretimi
│   ├── Sosyal Medya Yönetimi
│   ├── AI Reklam Kreatifleri
│   ├── Strateji & Analitik
│   └── Marka Kimliği
│
├── /projeler
│   ├── Proje Listesi (Filtrelenebilir)
│   └── /projeler/[slug] (Proje Detay)
│
├── /hakkimizda
│   ├── Manifesto
│   ├── Ekip
│   └── Değerler
│
├── /blog
│   ├── Blog Listesi
│   └── /blog/[slug] (Yazı Detay)
│
├── /fiyatlandirma
│
├── /iletisim
│
├── /gizlilik-politikasi
└── /kullanim-kosullari
```

### URL Yapısı & SEO Slug Kuralları
- Küçük harf, tire (-) ile ayır
- Türkçe karakter kullanma (URL'de): `hakkimizda`, `iletisim`
- Canonical URL: `https://visiona.ai/`

---

## 3. Hero Bölümü

### 3.1 Yapı

```
┌──────────────────────────────────────────────┐
│  NAV                                          │
├──────────────────────────────────────────────┤
│                                               │
│   [BADGE] Social Media AI Agency             │
│                                               │
│   Markanızı                                  │
│   Geleceğe                                   │
│   Taşıyoruz.                                 │
│                                               │
│   AI'nın gücüyle sosyal medyada              │
│   gerçek etki yaratıyoruz.                   │
│                                               │
│   [Hemen Başlayın →]  [Portföyü Gör]        │
│                                               │
│   ────────────────────────────────────       │
│   150+      48h       %340                   │
│   Proje    Teslimat   ROI Artışı            │
│                                               │
└──────────────────────────────────────────────┘
```

### 3.2 Görsel Tasarım Detayları

**Arkaplan:**
- Off-white (`#F5F5F0`) ana renk
- Mesh gradient: sağ üst ve sol alt köşelerde mavi glow efektleri
- Animasyonlu floating shapes: yarı şeffaf mavi daireler, yavaş float animasyonu
- Subtle grid pattern (SVG): çok hafif ızgara, mavi noktalı

**Başlık Animasyonu:**
- Her kelime yukarıdan kaydırmalı giriş (stagger: 80ms)
- "Geleceğe" kelimesi gradient mavi
- Cursor blink efekti (typing animation isteğe bağlı)

**CTA Butonlar:**
- Primary: Dolu mavi, hover'da glow + yukarı kayma
- Secondary: Outline, hover'da mavi fill

**İstatistikler:**
- Sayı sayacı animasyonu (count-up) — scroll tetiklemeli değil, sayfa yüklenince
- Altında ince çizgi separator

**Sağ Taraf (Desktop):**
- visionA'nın en iyi işinden oluşan dikey scroll eden görsel kart kolonu (holala tarzı)
- 2 kolon, biri aşağı scroll eder, diğeri yukarı — smooth loop

### 3.3 HTML Yapısı (Skeleton)

```html
<section class="hero">
  <div class="hero__bg">
    <div class="hero__mesh-gradient"></div>
    <div class="hero__grid-pattern"></div>
    <div class="hero__float-orbs">
      <div class="orb orb--1"></div>
      <div class="orb orb--2"></div>
      <div class="orb orb--3"></div>
    </div>
  </div>
  
  <div class="container hero__inner">
    <div class="hero__content">
      <div class="badge animate-in" data-delay="0">
        <span class="badge__dot"></span>
        Social Media AI Agency
      </div>
      
      <h1 class="hero__title animate-in" data-delay="100">
        Markanızı<br>
        <span class="gradient-text">Geleceğe</span><br>
        Taşıyoruz.
      </h1>
      
      <p class="hero__subtitle animate-in" data-delay="200">
        AI'nın gücüyle sosyal medyada gerçek etki yaratıyoruz.<br>
        İçerik, strateji ve analitik — hepsi bir arada.
      </p>
      
      <div class="hero__cta animate-in" data-delay="300">
        <a href="/iletisim" class="btn-primary">Hemen Başlayın →</a>
        <a href="/projeler" class="btn-outline">Portföyü Gör</a>
      </div>
      
      <div class="hero__stats animate-in" data-delay="400">
        <div class="stat">
          <span class="stat__number" data-count="150">0</span>
          <span class="stat__suffix">+</span>
          <span class="stat__label">Başarılı Proje</span>
        </div>
        <div class="stat__divider"></div>
        <div class="stat">
          <span class="stat__number" data-count="48">0</span>
          <span class="stat__suffix">s</span>
          <span class="stat__label">Teslimat Süresi</span>
        </div>
        <div class="stat__divider"></div>
        <div class="stat">
          <span class="stat__prefix">%</span>
          <span class="stat__number" data-count="340">0</span>
          <span class="stat__label">Ortalama ROI Artışı</span>
        </div>
      </div>
    </div>
    
    <div class="hero__visual animate-in" data-delay="200">
      <div class="visual-scroll-col visual-scroll-col--down">
        <!-- 5-6 proje görseli -->
      </div>
      <div class="visual-scroll-col visual-scroll-col--up">
        <!-- 5-6 proje görseli -->
      </div>
    </div>
  </div>
</section>
```

---

## 4. Hizmetler Bölümü

### 4.1 Sunum Formatı

**Seçenek A — Tab/Accordion Sistemi (Önerilen):**
Sol tarafta hizmet listesi, sağ tarafta aktif hizmetin detayı + görsel. Hover/click'te smooth geçiş.

**Seçenek B — Card Grid:**
3+2 layout, hover'da kart genişler ve detay gösterir.

### 4.2 Hizmet İçerikleri

#### 🤖 AI İçerik Üretimi
- **Başlık:** Sınırsız. Özgün. AI Destekli.
- **Açıklama:** Markanızın sesini yansıtan, her platformun dinamiğine uygun içerikler üretiyoruz. Reels, story, carousel, statik post — tüm formatlar, tutarlı kimlikle.
- **Özellikler:** Günlük içerik üretimi, çoklu format, marka kılavuzuna uyum, A/B test görselleri
- **İkon Konsepti:** Parlayan çubuk + metin balonu

#### 📊 Sosyal Medya Yönetimi
- **Başlık:** Hesaplarınız Sürekli Aktif, Siz Değil.
- **Açıklama:** Planlama, yayınlama, yorumlara yanıt — tüm sosyal medya operasyonunuzu yönetiyoruz. Gerçek zamanlı dashboard ile her şeyi takip edin.
- **Özellikler:** Instagram, TikTok, LinkedIn, X, Pinterest yönetimi; yorum moderasyonu; içerik takvimi
- **İkon Konsepti:** Takvim + kalkan

#### 🎨 AI Reklam Kreatifleri
- **Başlık:** Dönüşüm Odaklı Görseller, Saniyeler İçinde.
- **Açıklama:** Meta, Google ve TikTok reklamları için test edilmiş, yüksek dönüşümlü kreatifleri AI ile hızla üretiyoruz.
- **Özellikler:** Her boyut ve format, A/B test kreatifleri, marka uyumlu, hızlı iterasyon
- **İkon Konsepti:** Hedef + yıldırım

#### 📈 Strateji & Analitik
- **Başlık:** Veriye Dayalı. Sonuç Odaklı.
- **Açıklama:** Rakip analizi, trend takibi, performans raporlaması ve büyüme stratejisi — karar almanızı hızlandıran içgörüler sunuyoruz.
- **Özellikler:** Aylık raporlama, rakip benchmark, içerik analizi, büyüme roadmap
- **İkon Konsepti:** Çizgi grafik + büyüteç

#### ✨ Marka Kimliği & AI Konsept
- **Başlık:** AI ile Güçlendirilmiş Marka Sesi.
- **Açıklama:** Markanızın sosyal medyadaki sesini, tonunu ve görsel dilini tanımlıyoruz. AI araçlarıyla tutarlı bir kimlik oluşturuyoruz.
- **Özellikler:** Brand voice guide, visual language, tone of voice, içerik stratejisi
- **İkon Konsepti:** Elmas + kalem

### 4.3 Hizmet Kartı HTML

```html
<section class="services" id="hizmetler">
  <div class="container">
    <div class="section-header">
      <span class="badge">Hizmetlerimiz</span>
      <h2>Her İhtiyacınız İçin<br><span class="gradient-text">AI Gücü</span></h2>
      <p>Sosyal medyanın tüm boyutlarını tek çatı altında yönetiyoruz.</p>
    </div>
    
    <div class="services__layout">
      <div class="services__tabs">
        <button class="service-tab active" data-tab="ai-icerik">
          <span class="tab-icon">🤖</span>
          AI İçerik Üretimi
        </button>
        <!-- diğer tablar -->
      </div>
      
      <div class="services__panels">
        <div class="service-panel active" id="ai-icerik">
          <div class="panel__content">
            <h3>Sınırsız. Özgün. AI Destekli.</h3>
            <p>...</p>
            <ul class="feature-list">
              <li><span class="check">✓</span> Günlük içerik üretimi</li>
              <!-- ... -->
            </ul>
            <a href="/hizmetler/ai-icerik" class="btn-primary">Detayları Gör →</a>
          </div>
          <div class="panel__visual">
            <!-- Hizmet görseli / animasyonu -->
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 5. Neden visionA?

### 5.1 Konsept: "Karşılaştırma Bölümü"

Geleneksel ajans vs. visionA karşılaştırması — sade, ikna edici.

```
┌─────────────────────┬─────────────────────┐
│   Geleneksel Ajans  │     visionA ✓       │
├─────────────────────┼─────────────────────┤
│ Haftalar süren      │ 48 saat içinde      │
│ içerik üretimi      │ teslimat            │
├─────────────────────┼─────────────────────┤
│ Tek tip içerik      │ Markanıza özel,     │
│ şablonları          │ AI destekli özgünlük│
├─────────────────────┼─────────────────────┤
│ Belirsiz sonuçlar   │ Şeffaf raporlama    │
│                     │ ve ölçülebilir ROI  │
├─────────────────────┼─────────────────────┤
│ Sabit, yüksek ücret │ Ölçeklenebilir      │
│                     │ paket fiyatlar      │
└─────────────────────┴─────────────────────┘
```

### 5.2 Differentiator Kartları (Alternatif Format)

Büyük sayılar/ikonlarla 4'lü grid:

```
[⚡ Hız]          [🎯 Özgünlük]      [📊 Şeffaflık]    [🔄 Esneklik]
48s Teslimat     Her Marka Farklı   Gerçek Zamanlı    Paket Yok,
Garantisi        İçerik Dili        Dashboard         Esnek Plan
```

### 5.3 Animasyonlu Sayaç Bölümü

Koyu arkaplan (#0A0A12) üzerinde mavi vurgulu büyük istatistikler:

```
150+          48s          %98           5★
Başarılı    Maks.        Müşteri        Ortalama
Proje       Teslimat     Memnuniyeti    Puan
```

---

## 6. Portföy / Projeler

### 6.1 Ana Sayfada Öne Çıkan Projeler

- 3 proje, büyük formatlı kartlar
- Hover'da marka rengi overlay + proje başlığı + "Görüntüle" butonu
- Koyu arkaplan section (dark section)

### 6.2 Proje Listesi Sayfası

**Filtre Sistemi:**
```
Tümü | AI Kreatifleri | Sosyal Medya | Strateji | Marka
```

**Grid Layout:**
- Desktop: Masonry grid (3 kolon, farklı yükseklikler)
- Tablet: 2 kolon
- Mobil: 1 kolon

**Proje Kartı:**
```html
<article class="project-card">
  <div class="project-card__image">
    <img src="..." alt="[Marka] Projesi">
    <div class="project-card__overlay">
      <span class="overlay__category">AI İçerik</span>
      <h3 class="overlay__title">Marka Adı</h3>
      <a href="/projeler/marka-adi" class="overlay__cta">
        Görüntüle <span>→</span>
      </a>
    </div>
  </div>
</article>
```

**Hover Animasyonu:**
- Görsel hafifçe zoom (scale 1.05)
- Overlay fade-in
- Başlık yukarıdan kayar

### 6.3 Proje Detay Sayfası

```
/projeler/[marka-adi]

├── Proje Hero (fullscreen görsel veya video)
├── Proje Bilgileri (Marka, Sektör, Hizmet, Süre)
├── Challenge & Çözüm
├── Sonuçlar (İstatistikler)
├── Görsel Galeri (slider)
├── Client Quote
└── Sonraki Proje CTA
```

---

## 7. Süreç Bölümü

### 7.1 4 Adımlı Süreç

**Sunum:** Yatay timeline (desktop) → dikey accordion (mobil)

```
1. KEŞİF          2. STRATEJİ       3. ÜRETİM         4. OPTİMİZASYON
━━━━━━━━━━        ━━━━━━━━━━━       ━━━━━━━━━━        ━━━━━━━━━━━━━━━
İhtiyaç           Marka sesi,       AI destekli       Analitik ile
analizi ve        içerik planı      içerik ve         sürekli
marka brief       oluşturma         görsel üretimi    iyileştirme

[24 saat]         [48 saat]         [Sürekli]         [Aylık]
```

**Scroll Animasyonu:** Her adım, scroll pozisyonuna göre sırayla aktif hale gelir. Aktif adım mavi çizgiyle bağlanır.

### 7.2 HTML Yapısı

```html
<section class="process">
  <div class="container">
    <div class="section-header">
      <span class="badge">Nasıl Çalışıyoruz?</span>
      <h2>Basit, Hızlı,<br><span class="gradient-text">Etkili</span></h2>
    </div>
    
    <div class="process__timeline">
      <div class="process__line">
        <div class="process__line-fill" id="processLineFill"></div>
      </div>
      
      <div class="process__steps">
        <div class="process__step" data-step="1">
          <div class="step__number">01</div>
          <div class="step__icon">🔍</div>
          <h3 class="step__title">Keşif</h3>
          <p class="step__desc">...</p>
          <span class="step__duration">24 saat</span>
        </div>
        <!-- ... -->
      </div>
    </div>
  </div>
</section>
```

---

## 8. Fiyatlandırma

### 8.1 Paket Yapısı

```
┌──────────────┬──────────────────┬──────────────────┬──────────────────┐
│   STARTER    │    GROWTH        │   SCALE          │   ENTERPRISE     │
│              │   ⭐ POPÜLER     │                  │                  │
├──────────────┼──────────────────┼──────────────────┼──────────────────┤
│ ₺X.XXX/ay   │ ₺X.XXX/ay       │ ₺X.XXX/ay        │ Teklif Alın      │
├──────────────┼──────────────────┼──────────────────┼──────────────────┤
│ 1 Platform   │ 3 Platform       │ 5 Platform       │ Sınırsız         │
│ 15 İçerik/ay │ 45 İçerik/ay    │ 90 İçerik/ay     │ Platform         │
│ Temel        │ AI Kreatifleri   │ + Reklam Yönetimi│ Dedicated        │
│ Raporlama    │ Haftalık Rapor   │ Analitik Suite   │ Ekip             │
│              │ Strateji Danışma │ Öncelikli Destek │ Özel SLA         │
│ [Başla →]   │ [Başla →]        │ [Başla →]        │ [İletişim →]     │
└──────────────┴──────────────────┴──────────────────┴──────────────────┘
```

**Toggle:** Aylık / Yıllık (Yıllık'ta %20 indirim)

### 8.2 Para Birimi Seçeneği
- TRY varsayılan
- Dolar/Euro seçeneği (uluslararası müşteri için)

### 8.3 Sık Sorulan Sorular (Fiyatlandırma altında)

En az 6 soru/cevap, accordion formatında:
1. Paket değiştirebilir miyim?
2. Sözleşme süresi nedir?
3. İçerikleri onaylamam gerekiyor mu?
4. Kaç günde teslimat yapılıyor?
5. Hangi platformları yönetiyorsunuz?
6. İptal politikası nedir?

---

## 9. Testimonial & Sosyal Kanıt

### 9.1 Logo Marquee (Müşteri Logoları)

Hero sonrasında: sonsuz döngü, soldan sağa kayan müşteri logoları. Monokrom (beyaz veya gri) — hover'da renkli.

```css
.marquee {
  animation: marquee 25s linear infinite;
  display: flex;
  gap: 64px;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee:hover { animation-play-state: paused; }
```

### 9.2 Testimonial Slider

**Format:** Büyük alıntı metni + müşteri fotoğrafı + isim/unvan/şirket + yıldız puanı

**Navigasyon:** Prev/Next okları + nokta indikatörü

**Animasyon:** Fade + hafif slide (horizontal)

```html
<blockquote class="testimonial">
  <p class="testimonial__text">
    "visionA ile çalışmaya başladıktan sonra Instagram hesabımızın 
    etkileşimi 3 ayda %280 arttı. AI destekli içeriklerin kalitesi 
    bizi gerçekten şaşırttı."
  </p>
  <footer class="testimonial__author">
    <img src="..." alt="Ahmet Yılmaz">
    <div>
      <strong>Ahmet Yılmaz</strong>
      <span>CMO · Marka X</span>
    </div>
    <div class="stars">★★★★★</div>
  </footer>
</blockquote>
```

### 9.3 Medyada Biz (İsteğe Bağlı)

Eğer medyada yer alındıysa: Yayın logolarını ve alıntıyı göster.

---

## 10. Blog / İçgörüler

### 10.1 Blog Listesi

**Grid:** 3 kolon (desktop), 2 (tablet), 1 (mobil)

**Kart Bileşenleri:**
- Kapak görseli
- Kategori badge
- Başlık (maks. 2 satır)
- Özet (maks. 3 satır)
- Okuma süresi + tarih
- Yazar avatarı

**Kategoriler:** AI Trendleri | Sosyal Medya Stratejisi | Vaka Analizi | Ürün Güncellemeleri

### 10.2 Blog Yazısı Sayfası

```
├── Fullwidth kapak görseli
├── Başlık + Meta (tarih, okuma süresi, yazar)
├── İçindekiler (floating sidebar - desktop)
├── Makale içeriği (690px max-width, serif/body font)
├── Görseller, kod blokları, quote box
├── Paylaşım butonları (floating left - desktop)
├── Yazar kartı
└── İlgili Yazılar (3 kart)
```

---

## 11. Hakkımızda Sayfası

### 11.1 Sayfa Yapısı

**Manifesto Section:**
Koyu arkaplan, büyük font, ilham verici metin:
> "İçerik üretmek artık herkesin elinde. Etki yaratmak ise hâlâ bir sanat."

**Hikayemiz:**
visionA'nın kuruluş hikayesi — kısa, özgün, samimi paragraflar.

**Misyonumuz / Vizyonumuz:**
2 kolon, net ifade.

**Değerlerimiz:**
4-6 değer, ikon + başlık + kısa açıklama formatında.

**Ekibimiz:**
```html
<div class="team-grid">
  <div class="team-card">
    <div class="team-card__photo">
      <img src="..." alt="Ad Soyad">
      <div class="team-card__social">
        <a href="linkedin">in</a>
        <a href="twitter">x</a>
      </div>
    </div>
    <h3>Ad Soyad</h3>
    <span>Co-Founder & CEO</span>
  </div>
</div>
```

**Sayılarla visionA:**
Koyu bölüm, animasyonlu sayaçlar.

---

## 12. İletişim Sayfası

### 12.1 Layout

**2 Kolon:**
- Sol: Form
- Sağ: İletişim bilgileri + harita (isteğe bağlı) + çalışma saatleri

### 12.2 İletişim Formu

```html
<form class="contact-form" id="contactForm">
  <div class="form-row">
    <div class="form-group">
      <label for="name">Adınız *</label>
      <input type="text" id="name" name="name" placeholder="Adınız Soyadınız" required>
    </div>
    <div class="form-group">
      <label for="company">Şirket</label>
      <input type="text" id="company" name="company" placeholder="Şirket Adı">
    </div>
  </div>
  
  <div class="form-group">
    <label for="email">E-posta *</label>
    <input type="email" id="email" name="email" placeholder="ornek@sirket.com" required>
  </div>
  
  <div class="form-group">
    <label for="service">İlgilendiğiniz Hizmet</label>
    <select id="service" name="service">
      <option value="">Seçiniz</option>
      <option value="ai-icerik">AI İçerik Üretimi</option>
      <option value="sosyal-medya">Sosyal Medya Yönetimi</option>
      <option value="reklam">AI Reklam Kreatifleri</option>
      <option value="strateji">Strateji & Analitik</option>
      <option value="enterprise">Kurumsal Paket</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="budget">Aylık Bütçe Aralığı</label>
    <select id="budget" name="budget">
      <option value="">Seçiniz</option>
      <option value="5k-10k">₺5.000 - ₺10.000</option>
      <option value="10k-25k">₺10.000 - ₺25.000</option>
      <option value="25k-50k">₺25.000 - ₺50.000</option>
      <option value="50k+">₺50.000+</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="message">Mesajınız *</label>
    <textarea id="message" name="message" rows="5" 
      placeholder="Projeniz hakkında kısaca bilgi verin..." required></textarea>
  </div>
  
  <button type="submit" class="btn-primary btn--full">
    Gönder →
  </button>
  
  <p class="form__privacy">
    Gönder butonuna tıklayarak 
    <a href="/gizlilik-politikasi">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
  </p>
</form>
```

### 12.3 Başarı Durumu

Form gönderildikten sonra: Konfeti animasyonu + teşekkür mesajı + ortalama yanıt süresi bilgisi.

---

## 13. Navigasyon & Footer

### 13.1 Navigasyon

**Desktop Navbar:**
```
Logo     | Hizmetler  Projeler  Hakkımızda  Blog  |  TR/EN  [Teklif Al →]
```

**Behavior:**
- Başlangıçta şeffaf (`background: transparent`)
- Scroll ≥ 80px: `background: rgba(245,245,240,0.9)` + `backdrop-filter: blur(20px)` + `box-shadow`
- Aktif sayfa linki: mavi alt çizgi

**Mobil Hamburger Menü:**
- Sağ üstte hamburger ikon
- Açılınca: fullscreen overlay, koyu arkaplan
- Menü linkleri büyük font, sırayla fade-in
- Kapatma: X ikonu veya swipe-up

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: background 0.3s, box-shadow 0.3s;
  padding: 20px 0;
}
.navbar.scrolled {
  background: rgba(245,245,240,0.92);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  padding: 14px 0;
}
```

### 13.2 Footer

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  visionA Logo          Hizmetler   Şirket    Yasal      │
│  Tagline               AI İçerik   Hakkımızda Gizlilik  │
│                        Sosyal M.   Blog      Kullanım   │
│  [Instagram] [X]       Reklamlar   Kariyer   Cookie     │
│  [LinkedIn]            Strateji    İletişim             │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2025 visionA. Tüm hakları saklıdır.   TR · 🇹🇷      │
└─────────────────────────────────────────────────────────┘
```

**Footer Arkaplanı:** Koyu navy (`#050520`) + mavi gradient glow

**Newsletter (isteğe bağlı):**
Footer üstünde ayrı section: "AI trendleri ve sosyal medya stratejileri inbox'ınızda" + e-posta input

---

## 14. Animasyon & Mikro-Etkileşim Planı

### 14.1 Sayfa Geçişleri

```javascript
// GSAP ile sayfa geçişi
// Çıkış: içerik yukarı kayar + fade out
// Giriş: mavi overlay önce açılır, içerik alttan gelir

const pageTransition = {
  exit: { y: -60, opacity: 0, duration: 0.4 },
  enter: { 
    overlay: { scaleY: [0, 1, 0], duration: 0.8 },
    content: { y: [40, 0], opacity: [0, 1], duration: 0.6, delay: 0.3 }
  }
}
```

### 14.2 Scroll Animasyonları

**IntersectionObserver ile Tetiklenenler:**
```javascript
const observerConfig = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// Her section başlığı: yukarıdan kayarak gelir
// Kartlar: stagger ile sıralı giriş (100ms aralıkla)
// Sayaçlar: count-up animasyonu
// Görseller: scale(0.95) → scale(1) + fade
```

**Animasyon Sınıfları:**
```css
.animate-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger için data-delay attribute */
[data-delay="100"] { transition-delay: 0.1s; }
[data-delay="200"] { transition-delay: 0.2s; }
[data-delay="300"] { transition-delay: 0.3s; }
```

### 14.3 Hover Efektleri

```css
/* Buton hover: glow + yukarı kayma */
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(32,32,255,0.35);
}

/* Kart hover: border + shadow */
.card:hover {
  border-color: rgba(32,32,255,0.25);
  box-shadow: 0 12px 48px rgba(32,32,255,0.12);
  transform: translateY(-4px);
}

/* Link hover: mavi alt çizgi animasyonu */
.nav-link::after {
  content: '';
  width: 0;
  height: 2px;
  background: #2020FF;
  transition: width 0.25s ease;
}
.nav-link:hover::after { width: 100%; }
```

### 14.4 Özel Cursor (Desktop)

```javascript
// Özel cursor: küçük mavi nokta
// Hover state: daire büyür + içerik "Görüntüle" yazar
const cursor = {
  default: { size: 12, borderRadius: '50%', bg: '#2020FF' },
  hover: { size: 80, borderRadius: '50%', bg: 'rgba(32,32,255,0.1)', 
           border: '1.5px solid #2020FF', text: true },
  click: { scale: 0.85 }
}
```

### 14.5 Floating Orb Animasyonları

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: float 8s ease-in-out infinite;
}
.orb--1 {
  width: 400px; height: 400px;
  background: rgba(32,32,255,0.12);
  top: -100px; right: -100px;
  animation-delay: 0s;
}
.orb--2 {
  width: 300px; height: 300px;
  background: rgba(0,64,255,0.08);
  bottom: 50px; left: 10%;
  animation-delay: -3s;
}
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  33% { transform: translateY(-30px) translateX(15px); }
  66% { transform: translateY(20px) translateX(-10px); }
}
```

### 14.6 Marquee (Logo Şeridi)

```css
.marquee-wrapper { overflow: hidden; }
.marquee-track {
  display: flex;
  gap: 80px;
  animation: marqueeScroll 30s linear infinite;
  width: max-content;
}
.marquee-track:hover { animation-play-state: paused; }
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### 14.7 Hero Görsel Kolonu (Vertical Scroll)

```javascript
// GSAP ile iki kolon, ters yönde sürekli scroll
gsap.to('.col-down', {
  y: '-100%',
  duration: 20,
  ease: 'none',
  repeat: -1
});
gsap.to('.col-up', {
  y: '0%',
  from: { y: '-50%' },
  duration: 18,
  ease: 'none',
  repeat: -1
});
```

---

## 15. Responsive & Mobil Tasarım

### 15.1 Breakpoint Sistemi

```css
/* Mobile First */
--bp-sm: 480px;   /* Büyük telefon */
--bp-md: 768px;   /* Tablet */
--bp-lg: 1024px;  /* Küçük laptop */
--bp-xl: 1280px;  /* Laptop */
--bp-2xl: 1440px; /* Büyük ekran */

@media (min-width: 768px) { /* tablet styles */ }
@media (min-width: 1024px) { /* desktop styles */ }
```

### 15.2 Mobil Özel Kurallar

| Element | Desktop | Mobil |
|---------|---------|-------|
| Hero başlık | 80-100px | clamp(40px, 10vw, 64px) |
| Grid | 3-4 kolon | 1 kolon |
| Hero görsel kolonu | Göster | Gizle |
| Özel cursor | Aktif | Devre dışı |
| Floating orbs | Göster | Sadece 1 adet, küçük |
| Sticky nav | Şeffaf → solid | Her zaman solid |
| Testimonials | 3'lü slider | Tek görünüm, swipe |
| Process timeline | Yatay | Dikey |

### 15.3 Touch Optimizasyonu

```css
/* Minimum touch target */
.btn, .nav-link, .card { min-height: 44px; min-width: 44px; }

/* Swipe için */
.slider { -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; }
.slide { scroll-snap-align: start; }

/* Hover efektleri devre dışı (touch'ta) */
@media (hover: none) {
  .card:hover { transform: none; box-shadow: none; }
}
```

---

## 16. Teknik Stack & Altyapı

### 16.1 Önerilen Stack

**Seçenek A — Next.js (Önerilen)**
```
Framework:   Next.js 15 (App Router)
Dil:         TypeScript
Styling:     Tailwind CSS + CSS Modules (özel animasyonlar için)
Animasyon:   GSAP + Framer Motion
CMS:         Sanity.io veya Contentful (blog, projeler)
Form:        React Hook Form + Zod validation
E-posta:     Resend veya SendGrid
Deploy:      Vercel
Analytics:   Vercel Analytics + Google Analytics 4
```

**Seçenek B — Webflow (No-Code)**
```
Platform:    Webflow
CMS:         Webflow CMS
Animasyon:   Webflow Interactions + Lottie entegrasyonu
E-posta:     Mailchimp entegrasyonu
```

**Seçenek C — Astro (Hız Odaklı)**
```
Framework:   Astro 4
UI:          React islands (interaktif componentler için)
Styling:     Tailwind CSS
Deploy:      Netlify / Vercel
```

### 16.2 Proje Klasör Yapısı (Next.js)

```
visiona-website/
├── app/
│   ├── layout.tsx          # Root layout, nav, footer
│   ├── page.tsx            # Ana sayfa
│   ├── hizmetler/
│   │   └── page.tsx
│   ├── projeler/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── hakkimizda/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── fiyatlandirma/page.tsx
│   └── iletisim/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── Pricing.tsx
│   │   └── Testimonials.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── AnimatedCounter.tsx
├── lib/
│   ├── sanity.ts
│   └── utils.ts
├── styles/
│   ├── globals.css
│   └── variables.css
└── public/
    ├── fonts/
    └── images/
```

### 16.3 Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://visiona.ai
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SANITY_PROJECT_ID=...
SANITY_DATASET=production
RESEND_API_KEY=...
NEXT_PUBLIC_RECAPTCHA_KEY=...
```

---

## 17. SEO & Performans

### 17.1 Meta Tags Şablonu

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://visiona.ai'),
  title: {
    default: 'visionA — Sosyal Medya AI Ajansı',
    template: '%s | visionA'
  },
  description: 'AI destekli içerik üretimi ve sosyal medya yönetimiyle markanızı büyütün. visionA ile 48 saatte teslimat garantisi.',
  keywords: ['sosyal medya ajansı', 'AI içerik', 'yapay zeka', 'sosyal medya yönetimi', 'Instagram yönetimi', 'dijital ajans'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://visiona.ai',
    siteName: 'visionA',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visionaai',
    creator: '@visionaai'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
}
```

### 17.2 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "visionA",
  "description": "Sosyal Medya AI Ajansı",
  "url": "https://visiona.ai",
  "logo": "https://visiona.ai/logo.png",
  "serviceType": "Social Media Marketing",
  "areaServed": "TR",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sosyal Medya Hizmetleri",
    "itemListElement": [
      { "@type": "Offer", "name": "AI İçerik Üretimi" },
      { "@type": "Offer", "name": "Sosyal Medya Yönetimi" }
    ]
  }
}
```

### 17.3 Performans Hedefleri

| Metrik | Hedef |
|--------|-------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Core Web Vitals | Tümü Yeşil |
| Lighthouse Score | 90+ (tüm kategoriler) |
| Page Size | < 500KB (ilk yükleme, sıkıştırılmış) |

### 17.4 Optimizasyon Teknikleri

- **Görseller:** Next.js `<Image>` componenti, WebP format, lazy loading
- **Fontlar:** `next/font` ile local hosting, `font-display: swap`
- **Animasyonlar:** CSS-only tercih, GSAP sadece gerektiğinde
- **JS Bundle:** Code splitting (route bazlı), dynamic import
- **Cache:** Vercel Edge Cache, statik sayfalarda `revalidate: 3600`
- **Preload:** Hero görseli, kritik fontlar

---

## 18. İçerik Yazarlığı Kılavuzu

### 18.1 Marka Sesi (Tone of Voice)

**Karakterimiz:**
- **Güvenilir ama sıkıcı değil** — Uzmanlığımızı pompasız, net bir dille aktarırız
- **Modern ve erişilebilir** — Jargon minimum, açıklama maksimum
- **İddialı ama mütevazı** — Sonuçlardan bahsederiz, böbürlenme olmadan
- **Müşteri odaklı** — "Biz" değil, "Siz" dili

**Kaçınılacaklar:**
- Aşırı teknik terimler
- "Dünya lideri", "en iyi" gibi kanıtlanamaz ifadeler
- Pasif cümle yapısı
- Klişe ajans dili ("360 derece çözümler" vb.)

### 18.2 Başlık Formülleri

```
HERO:
[Hedef/Sonuç] + [Nasıl/Araç]
"Markanızı Geleceğe Taşıyoruz." ✓

SERVİS:
[Fayda] + [Detay]
"Sınırsız. Özgün. AI Destekli." ✓

CTA:
Eylem Fiili + Yönlendirici
"Ücretsiz Teklif Alın →" ✓
"Portföyü Keşfedin →" ✓
```

### 18.3 Mikro-Kopya

```
// Buton metinleri
"Hemen Başlayın →"
"Ücretsiz Teklif Al"
"Portföyü Gör"
"Bize Ulaşın"
"Detayları İncele →"

// Form placeholder'ları
"ornek@sirket.com"
"Markanızın sosyal medya hedeflerini paylaşın..."

// Başarı mesajları
"Mesajınız alındı! En geç 24 saat içinde dönüş yapacağız. 🎉"

// Error mesajları
"Bu alan zorunludur."
"Geçerli bir e-posta adresi girin."
```

### 18.4 SEO İçerik Stratejisi

**Hedef Anahtar Kelimeler:**
- Ana: "sosyal medya ajansı", "AI içerik ajansı"
- Uzun kuyruk: "yapay zeka destekli içerik üretimi", "instagram yönetim ajansı istanbul"
- Blog için: "sosyal medya trendleri 2025", "AI ile içerik üretimi nasıl yapılır"

**Blog Yazı Takvimi (Aylık):**
- 2 uzun form içerik (2000+ kelime) — SEO odaklı
- 2 kısa içerik (800-1200 kelime) — Trend odaklı
- 1 vaka analizi (client hikayesi)

---

## 19. Görseller & Medya

### 19.1 Görsel Dili

**Stil:**
- Temiz, modern, yüksek kontrast
- Mavi tonları dominant
- Soyut gradientler ve geometrik formlar
- Gerçekçi ekran mockup'ları (sosyal medya içerikleri)
- Minimalist arka planlar

**Kaçınılacaklar:**
- Stok fotoğraf klişeleri (el sıkışan adamlar vb.)
- Çok renkli, kalabalık görseller
- Düşük çözünürlüklü görseller

### 19.2 Görsel Boyut Rehberi

| Kullanım | Boyut | Format |
|----------|-------|--------|
| OG Image | 1200×630 | PNG/JPG |
| Hero görsel | 1440×900 (max) | WebP |
| Proje kartı | 800×600 | WebP |
| Team fotoğrafı | 400×400 (kare) | WebP |
| Blog kapak | 1200×675 | WebP |
| Logo (SVG) | Vektör | SVG |
| Favicon | 32×32, 180×180 | PNG/ICO |

### 19.3 Video Kullanımı

- Hero bölümünde: 15-20s döngü video (ses kapalı, otomatik oynat)
- Format: MP4 (H.264) + WebM fallback
- Maksimum dosya boyutu: 8MB
- Önce poster görsel yükle, video arka planda yükle

### 19.4 Animasyonlu İçerik

- Lottie animasyonları: Servis ikonları için (30-60 frame, 3-5KB)
- CSS animasyonları: Arka plan efektleri
- GSAP: Sayfa geçişleri ve scroll efektleri

---

## 20. Lansman Kontrol Listesi

### 20.1 Geliştirme Öncesi

- [ ] Alan adı satın alma (`visiona.ai` veya `visiona.com.tr`)
- [ ] Hosting / deploy platformu seçimi (Vercel önerilir)
- [ ] Tasarım sistemi onayı (renkler, fontlar, spacing)
- [ ] İçerik taslakları hazır
- [ ] En az 5 portföy projesi görseli hazır
- [ ] Ekip fotoğrafları hazır
- [ ] Logo dosyaları (SVG, PNG, beyaz versiyon)

### 20.2 Geliştirme Aşaması

- [ ] Tasarım sistemi & CSS değişkenleri kurulumu
- [ ] Temel bileşenler (Button, Card, Badge, Input)
- [ ] Layout bileşenleri (Navbar, Footer)
- [ ] Ana sayfa tüm bölümleri
- [ ] Hizmetler, Projeler, Hakkımızda, İletişim sayfaları
- [ ] Blog altyapısı (CMS entegrasyonu)
- [ ] Form backend bağlantısı
- [ ] Scroll animasyonları
- [ ] Responsive düzenlemeler
- [ ] Dark bölüm stilleri

### 20.3 Test Aşaması

**Fonksiyonel:**
- [ ] Tüm linklerin çalışması
- [ ] Form gönderimi ve e-posta alınması
- [ ] Blog CMS'ten doğru veri çekimi
- [ ] Proje filtreleme sistemi

**Tarayıcı Uyumluluğu:**
- [ ] Chrome (son 2 versiyon)
- [ ] Safari (son 2 versiyon)
- [ ] Firefox (son 2 versiyon)
- [ ] Edge (son 2 versiyon)
- [ ] Safari iOS
- [ ] Chrome Android

**Performans:**
- [ ] Lighthouse tüm skorlar 90+
- [ ] Core Web Vitals tümü geçti
- [ ] Görseller optimize edildi (WebP, doğru boyut)
- [ ] JS bundle boyutu < 300KB (gzip)

**SEO:**
- [ ] Tüm sayfalarda meta title/description
- [ ] OG image (her sayfa için)
- [ ] robots.txt oluşturuldu
- [ ] sitemap.xml oluşturuldu ve Google'a gönderildi
- [ ] Structured data (JSON-LD) eklendi
- [ ] Canonical URL'ler doğru
- [ ] 404 sayfası özelleştirildi

**Erişilebilirlik:**
- [ ] Alt text tüm görsellerde
- [ ] Klavye navigasyonu çalışıyor
- [ ] ARIA etiketleri eklendi
- [ ] Renk kontrast oranları WCAG AA uyumlu
- [ ] Focus visible state'ler

### 20.4 Lansman Sonrası

- [ ] Google Analytics 4 kurulumu ve test
- [ ] Google Search Console'a domain eklendi
- [ ] Hotjar veya Microsoft Clarity kurulumu (kullanıcı davranışı)
- [ ] Uptime monitoring (UptimeRobot veya Better Uptime)
- [ ] SSL sertifikası aktif ve otomatik yenileme
- [ ] Sosyal medya hesaplarında site URL güncellendi
- [ ] Google Business Profile güncellendi

### 20.5 İlk 30 Günde Yapılacaklar

- [ ] Blog'a ilk 3 yazı yayınlandı
- [ ] SEO performansı takibi başladı
- [ ] A/B test: CTA buton metni
- [ ] İlk 100 ziyaretçi analizi
- [ ] Heatmap analizi sonuçlarına göre UX düzeltmeleri
- [ ] Google Ads hesabı bağlandı (gerekirse)

---

## EK A — Renk Değişkeni Tam Listesi

```css
:root {
  /* Ana Renkler */
  --color-blue: #2020FF;
  --color-blue-dark: #0A0AE0;
  --color-blue-light: #4444FF;
  --color-electric: #0040FF;
  
  /* Arka Planlar */
  --color-bg: #F5F5F0;
  --color-bg-dark: #0A0A12;
  --color-bg-navy: #050520;
  --color-white: #FFFFFF;
  
  /* Metin */
  --color-text: #0A0A12;
  --color-text-secondary: #6060708;
  --color-text-muted: #9090A0;
  --color-text-white: #FFFFFF;
  
  /* Kenarlar */
  --color-border: rgba(32,32,255,0.1);
  --color-border-dark: rgba(255,255,255,0.1);
  
  /* Gradientler */
  --gradient-blue: linear-gradient(135deg, #2020FF, #0040FF);
  --gradient-glow: radial-gradient(ellipse, rgba(32,32,255,0.3), transparent 70%);
}
```

## EK B — Animasyon Timing Referansı

```css
/* Easing fonksiyonları */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Süre sabitleri */
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
--duration-slower: 700ms;
```

## EK C — Teknoloji Entegrasyonları

| Araç | Kullanım | Öncelik |
|------|----------|---------|
| Google Analytics 4 | Trafik & davranış analizi | Zorunlu |
| Google Search Console | SEO izleme | Zorunlu |
| Hotjar | Heatmap & session replay | Önerilir |
| Mailchimp / Brevo | E-posta pazarlama | Önerilir |
| Calendly | Randevu alma (iletişim sayfası) | Opsiyonel |
| WhatsApp Business | Canlı chat widget | Opsiyonel |
| Crisp / Intercom | Müşteri destek chat | Opsiyonel |

---

*Bu belge, visionA web sitesi projesinin tüm teknik, tasarım ve içerik gereksinimlerini kapsamaktadır. Geliştirme sürecinde referans doküman olarak kullanılmalıdır.*

**Son Güncelleme:** Şubat 2025  
**Hazırlayan:** visionA Proje Ekibi
