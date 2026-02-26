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
                        AI&apos;nın gücüyle sosyal medyada gerçek etki yaratıyoruz.<br />
                        İçerik, strateji ve analitik — hepsi bir arada.
                    </p>

                    {/* CTA Butonlar */}
                    <div className="ih-cta-group">
                        <a href="https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="ih-btn-primary">
                            Hemen Başlayın →
                        </a>
                        <a href="#instagram" className="ih-btn-outline">
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
                    <a href="https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="ih-btn-primary ih-btn-primary--xl">
                        Ücretsiz Teklif Al →
                    </a>

                    {/* Sosyal kanıt */}
                    <div className="ih-social-proof">
                        <div className="ih-avatars">
                            {['A', 'B', 'C', 'D'].map((l, i) => (
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
