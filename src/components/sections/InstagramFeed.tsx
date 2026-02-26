'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './InstagramFeed.module.css';

// Gerçek @visionaoff postları — resimler public/instagram/ klasöründe
const POSTS = [
    { img: '/instagram/post1.jpg', url: 'https://www.instagram.com/visionaoff/reel/DU63j-OgjOz/', type: 'reel' as const },
    { img: '/instagram/post2.jpg', url: 'https://www.instagram.com/visionaoff/p/DU624iLgnIT/', type: 'image' as const },
    { img: '/instagram/post3.jpg', url: 'https://www.instagram.com/visionaoff/p/DU62IT1gvyN/', type: 'image' as const },
    { img: '/instagram/post4.jpg', url: 'https://www.instagram.com/visionaoff/reel/DU4Mq4hjfEm/', type: 'reel' as const },
    { img: '/instagram/post5.jpg', url: 'https://www.instagram.com/visionaoff/p/DU4MB-TAkmX/', type: 'image' as const },
    { img: '/instagram/post6.jpg', url: 'https://www.instagram.com/visionaoff/p/DU4Lw70AkMU/', type: 'image' as const },
    { img: '/instagram/post7.jpg', url: 'https://www.instagram.com/visionaoff/p/DU3kAmMgv-l/', type: 'image' as const },
    { img: '/instagram/post8.jpg', url: 'https://www.instagram.com/visionaoff/p/DU3j5m5Aqt6/', type: 'image' as const },
    { img: '/instagram/post9.jpg', url: 'https://www.instagram.com/visionaoff/p/DU3jhtWAjFq/', type: 'image' as const },
];

export default function InstagramFeed() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.idx);
                        setVisibleCards(prev => new Set(prev).add(idx));
                    }
                });
            },
            { threshold: 0.15, rootMargin: '50px' }
        );

        const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
        cards?.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="instagram" className={styles.section} ref={sectionRef}>
            <div className={styles.bgGlow}></div>
            <div className={styles.bgGlow2}></div>
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="badge badge--dark">Çalışmalarımız</span>
                    <h2>Instagram&apos;da<br /><span className="gradient-text">Biz</span></h2>
                </div>

                {/* Image-only 3×3 Grid */}
                <div className={styles.grid}>
                    {POSTS.map((post, i) => (
                        <a
                            key={i}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.card} ${visibleCards.has(i) ? styles.cardVisible : ''}`}
                            data-idx={i}
                            style={{ transitionDelay: `${(i % 3) * 100}ms` }}
                        >
                            <img
                                src={post.img}
                                alt={`@visionaoff post ${i + 1}`}
                                className={styles.cardImg}
                                loading="lazy"
                            />

                            {/* Hover overlay — sadece Instagram ikonu */}
                            <div className={styles.overlay}>
                                {post.type === 'reel' ? (
                                    <svg className={styles.overlayIcon} width="28" height="28" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                ) : (
                                    <svg className={styles.overlayIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
                                    </svg>
                                )}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Instagram Follow CTA */}
                <div className={styles.ctaRow}>
                    <a
                        href="https://instagram.com/visionaoff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.igButton}
                    >
                        <div className={styles.igIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </div>
                        <div className={styles.igText}>
                            <span className={styles.igHandle}>@visionaoff</span>
                            <span className={styles.igAction}>Instagram&apos;da Takip Et</span>
                        </div>
                        <svg className={styles.igArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
