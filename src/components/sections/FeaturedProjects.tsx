import styles from './FeaturedProjects.module.css';

const projects = [
    {
        title: 'Marka X Sosyal Medya',
        category: 'Sosyal Medya Yönetimi',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        stat: '+280% Etkileşim',
    },
    {
        title: 'TechStart AI Kampanya',
        category: 'AI Reklam Kreatifleri',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        stat: '3x ROAS',
    },
    {
        title: 'GrowthLab İçerik Stratejisi',
        category: 'Strateji & Analitik',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        stat: '+150K Takipçi',
    },
];

export default function FeaturedProjects() {
    return (
        <section className={`section section--dark ${styles.projects}`}>
            <div className={styles.bgGlow}></div>
            <div className="container">
                <div className="section-header">
                    <span className="badge badge--dark">Projelerimiz</span>
                    <h2>Öne Çıkan<br /><span className="gradient-text">Projeler</span></h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Son dönemde gerçekleştirdiğimiz başarılı projelerden bazıları.</p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, i) => (
                        <a href="/projeler" key={i} className={styles.card}>
                            <div className={styles.cardImage} style={{ background: project.gradient }}>
                                <div className={styles.cardOverlay}>
                                    <span className={styles.cardCategory}>{project.category}</span>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <span className={styles.cardStat}>{project.stat}</span>
                                    <span className={styles.cardCta}>Görüntüle →</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <a href="/projeler" className="btn-outline btn--dark">
                        Tüm Projeleri Gör →
                    </a>
                </div>
            </div>
        </section>
    );
}
