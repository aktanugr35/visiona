'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Count-up animation
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count') || '0');
            const duration = 2000;
            const start = performance.now();

            const animate = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target).toString();
                if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        });

        // Animate-in elements on load
        const animateEls = document.querySelectorAll('.animate-in');
        animateEls.forEach(el => {
            setTimeout(() => {
                el.classList.add('visible');
            }, parseInt((el as HTMLElement).dataset.delay || '0'));
        });
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.meshGradient}></div>
                <div className={styles.gridPattern}></div>
                <div className={styles.orb} style={{ width: 500, height: 500, top: -150, right: -100, animationDelay: '0s', opacity: 0.15 }}></div>
                <div className={styles.orb} style={{ width: 350, height: 350, bottom: 0, left: '8%', animationDelay: '-3s', opacity: 0.1 }}></div>
                <div className={styles.orb} style={{ width: 200, height: 200, top: '50%', left: '50%', animationDelay: '-5s', opacity: 0.08 }}></div>
            </div>

            <div className={`container ${styles.inner}`}>
                <div className={styles.content}>
                    <div className={`badge animate-in`} data-delay="0">
                        <span className="badge__dot"></span>
                        Social Media AI Agency
                    </div>

                    <h1 className={`${styles.title} animate-in`} data-delay="100">
                        Markanızı<br />
                        <span className="gradient-text">Geleceğe</span><br />
                        Taşıyoruz.
                    </h1>

                    <p className={`${styles.subtitle} animate-in`} data-delay="200">
                        AI&apos;nın gücüyle sosyal medyada gerçek etki yaratıyoruz.<br />
                        İçerik, strateji ve analitik — hepsi bir arada.
                    </p>

                    <div className={`${styles.cta} animate-in`} data-delay="300">
                        <a href="https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="btn-primary">Hemen Başlayın →</a>
                        <a href="#instagram" className="btn-outline">Çalışmalarımız</a>
                    </div>

                    <div className={`${styles.stats} animate-in`} data-delay="400" ref={statsRef}>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>
                                <span data-count="150">0</span>
                                <span className={styles.statSuffix}>+</span>
                            </div>
                            <span className={styles.statLabel}>Başarılı Proje</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>
                                <span data-count="48">0</span>
                                <span className={styles.statSuffix}>s</span>
                            </div>
                            <span className={styles.statLabel}>Teslimat Süresi</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>
                                <span className={styles.statPrefix}>%</span>
                                <span data-count="340">0</span>
                            </div>
                            <span className={styles.statLabel}>Ortalama ROI Artışı</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.visual} animate-in`} data-delay="200">
                    <div className={`${styles.scrollCol} ${styles.scrollDown}`}>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <div className={styles.cardMock}>📱 Instagram Reels</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            <div className={styles.cardMock}>🎨 Brand Design</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            <div className={styles.cardMock}>📊 Analytics</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            <div className={styles.cardMock}>🤖 AI Content</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                            <div className={styles.cardMock}>🎯 Ad Creative</div>
                        </div>
                        {/* Duplicate for loop */}
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <div className={styles.cardMock}>📱 Instagram Reels</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            <div className={styles.cardMock}>🎨 Brand Design</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            <div className={styles.cardMock}>📊 Analytics</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            <div className={styles.cardMock}>🤖 AI Content</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                            <div className={styles.cardMock}>🎯 Ad Creative</div>
                        </div>
                    </div>
                    <div className={`${styles.scrollCol} ${styles.scrollUp}`}>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
                            <div className={styles.cardMock}>📈 Growth Strategy</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                            <div className={styles.cardMock}>✨ Social Posts</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }}>
                            <div className={styles.cardMock}>🎬 Video Content</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)' }}>
                            <div className={styles.cardMock}>💡 Campaign</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)' }}>
                            <div className={styles.cardMock}>🔍 SEO & SEM</div>
                        </div>
                        {/* Duplicate for loop */}
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
                            <div className={styles.cardMock}>📈 Growth Strategy</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                            <div className={styles.cardMock}>✨ Social Posts</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }}>
                            <div className={styles.cardMock}>🎬 Video Content</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)' }}>
                            <div className={styles.cardMock}>💡 Campaign</div>
                        </div>
                        <div className={styles.scrollCard} style={{ background: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)' }}>
                            <div className={styles.cardMock}>🔍 SEO & SEM</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
