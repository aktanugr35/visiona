'use client';

import styles from './WhyVisionA.module.css';

const comparisons = [
    { traditional: 'Haftalar süren içerik üretimi', visiona: '48 saat içinde teslimat' },
    { traditional: 'Tek tip içerik şablonları', visiona: 'Markanıza özel, AI destekli özgünlük' },
    { traditional: 'Belirsiz sonuçlar', visiona: 'Şeffaf raporlama ve ölçülebilir ROI' },
    { traditional: 'Sabit, yüksek ücretler', visiona: 'Ölçeklenebilir paket fiyatlar' },
];

const differentiators = [
    { icon: '⚡', title: 'Hız', desc: '48 saat teslimat garantisi', stat: '48s' },
    { icon: '🎯', title: 'Özgünlük', desc: 'Her marka için farklı içerik dili', stat: '%100' },
    { icon: '📊', title: 'Şeffaflık', desc: 'Gerçek zamanlı dashboard erişimi', stat: '7/24' },
    { icon: '🔄', title: 'Esneklik', desc: 'Paket yok, esnek planlar', stat: '∞' },
];

export default function WhyVisionA() {
    return (
        <section className={`section ${styles.why}`}>
            <div className="container">
                <div className="section-header">
                    <span className="badge">Neden visionA?</span>
                    <h2>Farkımız<br /><span className="gradient-text">Ortada</span></h2>
                </div>

                {/* Comparison Table */}
                <div className={styles.comparison}>
                    <div className={styles.compHeader}>
                        <div className={styles.compHeaderLeft}>Geleneksel Ajans</div>
                        <div className={styles.compHeaderRight}>visionA ✓</div>
                    </div>
                    {comparisons.map((item, i) => (
                        <div key={i} className={styles.compRow}>
                            <div className={styles.compLeft}>{item.traditional}</div>
                            <div className={styles.compRight}>{item.visiona}</div>
                        </div>
                    ))}
                </div>

                {/* Differentiators */}
                <div className={styles.diffGrid}>
                    {differentiators.map((item, i) => (
                        <div key={i} className={styles.diffCard}>
                            <span className={styles.diffStat}>{item.stat}</span>
                            <span className={styles.diffIcon}>{item.icon}</span>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
