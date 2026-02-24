'use client';

import { useState } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        text: 'visionA ile çalışmaya başladıktan sonra Instagram hesabımızın etkileşimi 3 ayda %280 arttı. AI destekli içeriklerin kalitesi bizi gerçekten şaşırttı.',
        name: 'Ahmet Yılmaz',
        role: 'CMO · Marka X',
        stars: 5,
    },
    {
        text: 'Sosyal medya yönetimimizi tamamen visionA\'ya devrettik. Hem zaman kazandık hem de performansımız katlandı. 48 saat teslimat sözlerini gerçekten tutuyorlar.',
        name: 'Elif Demir',
        role: 'Kurucu · TechStart',
        stars: 5,
    },
    {
        text: 'AI reklam kreatifleri sayesinde reklam maliyetlerimiz %40 düştü, dönüşümler ise 3 katına çıktı. Kesinlikle tavsiye ediyorum.',
        name: 'Can Kaya',
        role: 'Pazarlama Müdürü · GrowthLab',
        stars: 5,
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);

    const next = () => setActive((active + 1) % testimonials.length);
    const prev = () => setActive((active - 1 + testimonials.length) % testimonials.length);

    return (
        <section className={`section ${styles.testimonials}`}>
            <div className="container">
                <div className="section-header">
                    <span className="badge">Müşterilerimiz Ne Diyor?</span>
                    <h2>Güvenilir<br /><span className="gradient-text">Sonuçlar</span></h2>
                </div>

                <div className={styles.slider}>
                    {testimonials.map((item, i) => (
                        <blockquote
                            key={i}
                            className={`${styles.quote} ${i === active ? styles.quoteActive : ''}`}
                        >
                            <div className={styles.stars}>
                                {'★'.repeat(item.stars)}
                            </div>
                            <p className={styles.quoteText}>&ldquo;{item.text}&rdquo;</p>
                            <footer className={styles.author}>
                                <div className={styles.authorAvatar}>
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <strong>{item.name}</strong>
                                    <span>{item.role}</span>
                                </div>
                            </footer>
                        </blockquote>
                    ))}

                    <div className={styles.nav}>
                        <button className={styles.navBtn} onClick={prev} aria-label="Önceki">
                            ←
                        </button>
                        <div className={styles.dots}>
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`Yorum ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className={styles.navBtn} onClick={next} aria-label="Sonraki">
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
