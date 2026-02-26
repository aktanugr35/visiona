'use client';

import { useState } from 'react';
import styles from './Services.module.css';

const services = [
    {
        id: 'ai-icerik',
        icon: '🤖',
        title: 'AI İçerik Üretimi',
        headline: 'Sınırsız. Özgün. AI Destekli.',
        description: 'Markanızın sesini yansıtan, her platformun dinamiğine uygun içerikler üretiyoruz. Reels, story, carousel, statik post — tüm formatlar, tutarlı kimlikle.',
        features: ['Günlük içerik üretimi', 'Çoklu format desteği', 'Marka kılavuzuna uyum', 'A/B test görselleri'],
        color: '#667eea',
    },
    {
        id: 'sosyal-medya',
        icon: '📊',
        title: 'Sosyal Medya Yönetimi',
        headline: 'Hesaplarınız Sürekli Aktif, Siz Değil.',
        description: 'Planlama, yayınlama, yorumlara yanıt — tüm sosyal medya operasyonunuzu yönetiyoruz. Gerçek zamanlı dashboard ile her şeyi takip edin.',
        features: ['Instagram, TikTok, LinkedIn, X yönetimi', 'Yorum moderasyonu', 'İçerik takvimi', 'Gerçek zamanlı dashboard'],
        color: '#f093fb',
    },
    {
        id: 'reklam',
        icon: '🎨',
        title: 'AI Reklam Kreatifleri',
        headline: 'Dönüşüm Odaklı Görseller, Saniyeler İçinde.',
        description: 'Meta, Google ve TikTok reklamları için test edilmiş, yüksek dönüşümlü kreatifleri AI ile hızla üretiyoruz.',
        features: ['Her boyut ve format', 'A/B test kreatifleri', 'Marka uyumlu tasarım', 'Hızlı iterasyon'],
        color: '#4facfe',
    },
    {
        id: 'strateji',
        icon: '📈',
        title: 'Strateji & Analitik',
        headline: 'Veriye Dayalı. Sonuç Odaklı.',
        description: 'Rakip analizi, trend takibi, performans raporlaması ve büyüme stratejisi — karar almanızı hızlandıran içgörüler sunuyoruz.',
        features: ['Aylık raporlama', 'Rakip benchmark', 'İçerik analizi', 'Büyüme roadmap'],
        color: '#43e97b',
    },
    {
        id: 'marka',
        icon: '✨',
        title: 'Marka Kimliği & AI Konsept',
        headline: 'AI ile Güçlendirilmiş Marka Sesi.',
        description: 'Markanızın sosyal medyadaki sesini, tonunu ve görsel dilini tanımlıyoruz. AI araçlarıyla tutarlı bir kimlik oluşturuyoruz.',
        features: ['Brand voice guide', 'Görsel dil rehberi', 'Tone of voice', 'İçerik stratejisi'],
        color: '#fa709a',
    },
];

export default function Services() {
    const [active, setActive] = useState(0);

    return (
        <section className={`section ${styles.services}`} id="hizmetler">
            <div className="container">
                <div className="section-header">
                    <span className="badge">Hizmetlerimiz</span>
                    <h2>Her İhtiyacınız İçin<br /><span className="gradient-text">AI Gücü</span></h2>
                    <p>Sosyal medyanın tüm boyutlarını tek çatı altında yönetiyoruz.</p>
                </div>

                <div className={styles.layout}>
                    <div className={styles.tabs}>
                        {services.map((service, i) => (
                            <button
                                key={service.id}
                                className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
                                onClick={() => setActive(i)}
                            >
                                <span className={styles.tabIcon}>{service.icon}</span>
                                <span className={styles.tabTitle}>{service.title}</span>
                                <span className={styles.tabArrow}>→</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.panels}>
                        {services.map((service, i) => (
                            <div
                                key={service.id}
                                className={`${styles.panel} ${i === active ? styles.panelActive : ''}`}
                            >
                                <div className={styles.panelContent}>
                                    <h3>{service.headline}</h3>
                                    <p>{service.description}</p>
                                    <ul className={styles.featureList}>
                                        {service.features.map(feature => (
                                            <li key={feature}>
                                                <span className={styles.check}>✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                                        Detayları Gör →
                                    </a>
                                </div>
                                <div className={styles.panelVisual}>
                                    <div className={styles.visualCard} style={{ background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`, borderColor: `${service.color}30` }}>
                                        <span className={styles.visualIcon}>{service.icon}</span>
                                        <span className={styles.visualTitle}>{service.title}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
