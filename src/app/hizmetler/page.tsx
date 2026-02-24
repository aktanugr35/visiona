import type { Metadata } from 'next';
import styles from './hizmetler.module.css';

export const metadata: Metadata = {
    title: 'Hizmetler',
    description: 'AI destekli içerik üretimi, sosyal medya yönetimi, reklam kreatifleri ve strateji hizmetlerimizi keşfedin.',
};

const services = [
    {
        icon: '🤖',
        title: 'AI İçerik Üretimi',
        headline: 'Sınırsız. Özgün. AI Destekli.',
        description: 'Markanızın sesini yansıtan, her platformun dinamiğine uygun içerikler üretiyoruz. Reels, story, carousel, statik post — tüm formatlar, tutarlı kimlikle.',
        features: ['Günlük içerik üretimi', 'Çoklu format desteği (Reels, Story, Carousel)', 'Marka kılavuzuna tam uyum', 'A/B test görselleri', 'Tüm platformlara özel optimizasyon'],
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        icon: '📊',
        title: 'Sosyal Medya Yönetimi',
        headline: 'Hesaplarınız Sürekli Aktif, Siz Değil.',
        description: 'Planlama, yayınlama, yorumlara yanıt — tüm sosyal medya operasyonunuzu yönetiyoruz. Gerçek zamanlı dashboard ile her şeyi takip edin.',
        features: ['Instagram, TikTok, LinkedIn, X, Pinterest yönetimi', 'Yorum moderasyonu', 'İçerik takvimi planlama', 'Gerçek zamanlı performans dashboard', 'Topluluk yönetimi'],
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        icon: '🎨',
        title: 'AI Reklam Kreatifleri',
        headline: 'Dönüşüm Odaklı Görseller, Saniyeler İçinde.',
        description: 'Meta, Google ve TikTok reklamları için test edilmiş, yüksek dönüşümlü kreatifleri AI ile hızla üretiyoruz.',
        features: ['Her boyut ve format desteği', 'A/B test kreatifleri', 'Marka uyumlu tasarım', 'Hızlı iterasyon döngüleri', 'Performans bazlı optimizasyon'],
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
        icon: '📈',
        title: 'Strateji & Analitik',
        headline: 'Veriye Dayalı. Sonuç Odaklı.',
        description: 'Rakip analizi, trend takibi, performans raporlaması ve büyüme stratejisi — karar almanızı hızlandıran içgörüler sunuyoruz.',
        features: ['Detaylı aylık raporlama', 'Rakip benchmark analizi', 'İçerik performans analizi', 'Büyüme roadmap hazırlama', 'Trend tahminleme'],
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
        icon: '✨',
        title: 'Marka Kimliği & AI Konsept',
        headline: 'AI ile Güçlendirilmiş Marka Sesi.',
        description: 'Markanızın sosyal medyadaki sesini, tonunu ve görsel dilini tanımlıyoruz. AI araçlarıyla tutarlı bir kimlik oluşturuyoruz.',
        features: ['Brand voice guide oluşturma', 'Görsel dil rehberi', 'Tone of voice tanımlama', 'İçerik stratejisi', 'Sosyal medya kimlik kiti'],
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
];

export default function HizmetlerPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <span className="badge badge--dark">Hizmetlerimiz</span>
                    <h1>Her İhtiyacınız İçin<br /><span className="gradient-text">AI Gücü</span></h1>
                    <p className={styles.heroDesc}>
                        Sosyal medyanın tüm boyutlarını tek çatı altında, AI destekli çözümlerle yönetiyoruz.
                    </p>
                </div>
            </section>

            {/* Services */}
            {services.map((service, i) => (
                <section key={i} className={`${styles.serviceSection} ${i % 2 === 1 ? styles.alt : ''}`}>
                    <div className={`container ${styles.serviceInner}`}>
                        <div className={styles.serviceContent}>
                            <span className={styles.serviceIcon}>{service.icon}</span>
                            <h2>{service.title}</h2>
                            <h3 className={styles.serviceHeadline}>{service.headline}</h3>
                            <p>{service.description}</p>
                            <ul className={styles.featureList}>
                                {service.features.map(f => (
                                    <li key={f}>
                                        <span className={styles.check}>✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a href="/iletisim" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                                Bu Hizmeti Talep Et →
                            </a>
                        </div>
                        <div className={styles.serviceVisual}>
                            <div className={styles.visualCard} style={{ background: service.gradient }}>
                                <span className={styles.visualEmoji}>{service.icon}</span>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
