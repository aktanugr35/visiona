import type { Metadata } from 'next';
import styles from './blog.module.css';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'AI trendleri, sosyal medya stratejileri ve vaka analizleri. visionA blog ile güncel kalın.',
};

const posts = [
    {
        title: 'AI ile Sosyal Medya İçerik Üretiminin Geleceği',
        excerpt: 'Yapay zeka destekli içerik üretimi nasıl evrim geçiriyor ve markalar bu dönüşüme nasıl ayak uyduruyor?',
        category: 'AI Trendleri',
        readTime: '8 dk',
        date: '15 Şubat 2025',
        gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    {
        title: 'Instagram Reels Stratejisi: 2025 Rehberi',
        excerpt: 'Reels formatıyla organik erişiminizi katlamak için bilmeniz gereken tüm stratejiler.',
        category: 'Sosyal Medya',
        readTime: '12 dk',
        date: '10 Şubat 2025',
        gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    },
    {
        title: 'ROI Artışı Sağlayan 5 Reklam Kreatifi Tekniği',
        excerpt: 'A/B test edilmiş kreatiflerin dönüşüm oranlarınızı nasıl artırabileceğini keşfedin.',
        category: 'Vaka Analizi',
        readTime: '6 dk',
        date: '5 Şubat 2025',
        gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    },
    {
        title: 'Sosyal Medyada Marka Sesi Oluşturma',
        excerpt: 'Markanızın dijital dünyada tutarlı ve tanınır bir sese sahip olması için adım adım rehber.',
        category: 'Strateji',
        readTime: '10 dk',
        date: '28 Ocak 2025',
        gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    },
    {
        title: 'TikTok vs Instagram: Hangi Platform Sizin İçin?',
        excerpt: 'İki platformun karşılaştırmalı analizi ve marka stratejinize uygun olanını seçmenin yolları.',
        category: 'Sosyal Medya',
        readTime: '7 dk',
        date: '20 Ocak 2025',
        gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    },
    {
        title: 'AI ile Rakip Analizi: Veriye Dayalı Strateji',
        excerpt: 'Yapay zeka araçlarıyla rakiplerinizin sosyal medya performansını nasıl analiz edebilirsiniz?',
        category: 'AI Trendleri',
        readTime: '9 dk',
        date: '12 Ocak 2025',
        gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    },
];

export default function BlogPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <span className="badge badge--dark">Blog</span>
                    <h1>İçgörüler &<br /><span className="gradient-text">Trendler</span></h1>
                    <p className={styles.heroDesc}>AI, sosyal medya stratejileri ve dijital pazarlama dünyasından güncel içerikler.</p>
                </div>
            </section>

            <section className={styles.postsSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {posts.map((post, i) => (
                            <article key={i} className={styles.card}>
                                <div className={styles.cardImage} style={{ background: post.gradient }}>
                                    <span className={styles.cardCategory}>{post.category}</span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <div className={styles.cardMeta}>
                                        <span>{post.date}</span>
                                        <span>·</span>
                                        <span>{post.readTime} okuma</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
