'use client';

import styles from './Process.module.css';

const steps = [
    {
        number: '01',
        icon: '🔍',
        title: 'Keşif',
        desc: 'İhtiyaç analizi ve marka brief çalışması yapıyoruz.',
        duration: '24 saat',
    },
    {
        number: '02',
        icon: '🎯',
        title: 'Strateji',
        desc: 'Marka sesi ve içerik planı oluşturuyoruz.',
        duration: '48 saat',
    },
    {
        number: '03',
        icon: '🚀',
        title: 'Üretim',
        desc: 'AI destekli içerik ve görsel üretimi başlıyor.',
        duration: 'Sürekli',
    },
    {
        number: '04',
        icon: '📈',
        title: 'Optimizasyon',
        desc: 'Analitik ile sürekli iyileştirme sağlıyoruz.',
        duration: 'Aylık',
    },
];

export default function Process() {
    return (
        <section className={`section ${styles.process}`}>
            <div className="container">
                <div className="section-header">
                    <span className="badge">Nasıl Çalışıyoruz?</span>
                    <h2>Basit, Hızlı,<br /><span className="gradient-text">Etkili</span></h2>
                </div>

                <div className={styles.timeline}>
                    <div className={styles.line}>
                        <div className={styles.lineFill}></div>
                    </div>

                    <div className={styles.steps}>
                        {steps.map((step, i) => (
                            <div key={i} className={styles.step}>
                                <div className={styles.stepDot}>
                                    <span className={styles.stepNumber}>{step.number}</span>
                                </div>
                                <div className={styles.stepIcon}>{step.icon}</div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                                <span className={styles.stepDuration}>{step.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
