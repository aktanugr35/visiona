import type { Metadata } from 'next';
import styles from './projeler.module.css';

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'visionA ile gerçekleştirdiğimiz başarılı sosyal medya ve AI projelerimizi inceleyin.',
};

const categories = ['Tümü', 'AI Kreatifleri', 'Sosyal Medya', 'Strateji', 'Marka'];

const projects = [
    { title: 'Marka X Sosyal Medya Yönetimi', category: 'Sosyal Medya', stat: '+280% Etkileşim', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { title: 'TechStart AI Reklam Kampanyası', category: 'AI Kreatifleri', stat: '3x ROAS', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { title: 'GrowthLab Büyüme Stratejisi', category: 'Strateji', stat: '+150K Takipçi', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { title: 'FashionBrand Marka Kimliği', category: 'Marka', stat: '%95 Tanınırlık', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { title: 'StartupHub İçerik Üretimi', category: 'AI Kreatifleri', stat: '500+ İçerik/Ay', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { title: 'FinTech Sosyal Medya', category: 'Sosyal Medya', stat: '+200% Büyüme', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
];

export default function ProjelerPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <span className="badge badge--dark">Portföy</span>
                    <h1>Başarı<br /><span className="gradient-text">Hikayeleri</span></h1>
                    <p className={styles.heroDesc}>Son dönemde markaların dijital dönüşümünde rol aldığımız projeler.</p>
                </div>
            </section>

            <section className={styles.projectsSection}>
                <div className="container">
                    <div className={styles.filters}>
                        {categories.map(cat => (
                            <button key={cat} className={`${styles.filterBtn} ${cat === 'Tümü' ? styles.filterActive : ''}`}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {projects.map((project, i) => (
                            <div key={i} className={styles.card}>
                                <div className={styles.cardImage} style={{ background: project.gradient }}>
                                    <div className={styles.cardOverlay}>
                                        <span className={styles.category}>{project.category}</span>
                                        <h3>{project.title}</h3>
                                        <span className={styles.stat}>{project.stat}</span>
                                        <span className={styles.cardCta}>Detayları Gör →</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
