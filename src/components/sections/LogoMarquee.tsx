'use client';

import styles from './LogoMarquee.module.css';

const logos = [
    'TechCorp', 'MarkaX', 'Dijital+', 'SosyalAI', 'BrandHub',
    'CloudOne', 'MediaFlow', 'DataPro', 'CreativeAI', 'GrowthLab',
];

export default function LogoMarquee() {
    return (
        <section className={styles.marquee}>
            <div className={styles.wrapper}>
                <div className={styles.track}>
                    {[...logos, ...logos].map((logo, i) => (
                        <div key={i} className={styles.logoItem}>
                            <span className={styles.logoText}>{logo}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
