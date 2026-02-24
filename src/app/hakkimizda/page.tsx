import type { Metadata } from 'next';
import styles from './hakkimizda.module.css';

export const metadata: Metadata = {
    title: 'Hakkımızda',
    description: 'visionA ekibini, misyonumuzu ve değerlerimizi tanıyın. AI ile sosyal medyayı dönüştürüyoruz.',
};

const values = [
    { icon: '🚀', title: 'İnovasyon', desc: 'En son AI teknolojilerini kullanarak sürekli yenilik yapıyoruz.' },
    { icon: '🎯', title: 'Sonuç Odaklılık', desc: 'Her stratejimiz ölçülebilir sonuçlara dayanır.' },
    { icon: '🤝', title: 'Şeffaflık', desc: 'Müşterilerimizle açık ve dürüst iletişim kuruyoruz.' },
    { icon: '💡', title: 'Yaratıcılık', desc: 'AI gücünü insan yaratıcılığıyla birleştiriyoruz.' },
];

const team = [
    { name: 'Uğur Aktan', role: 'Founder & CEO', initial: 'U' },
    { name: 'Ayşe Kara', role: 'Creative Director', initial: 'A' },
    { name: 'Mehmet Demir', role: 'AI Lead', initial: 'M' },
    { name: 'Zeynep Yıldız', role: 'Strategy Manager', initial: 'Z' },
];

export default function HakkimizdaPage() {
    return (
        <div className={styles.page}>
            {/* Manifesto */}
            <section className={styles.manifesto}>
                <div className={styles.manifestoGlow}></div>
                <div className="container">
                    <blockquote className={styles.quote}>
                        &ldquo;İçerik üretmek artık herkesin elinde.<br />
                        Etki yaratmak ise hâlâ bir sanat.&rdquo;
                    </blockquote>
                </div>
            </section>

            {/* Story */}
            <section className={styles.story}>
                <div className="container">
                    <div className={styles.storyGrid}>
                        <div>
                            <span className="badge">Hikayemiz</span>
                            <h2>Merhaba,<br />biz <span className="gradient-text">visionA</span>.</h2>
                            <p>visionA, sosyal medyanın gücüne inanan ve AI teknolojilerini bu alanda en etkin şekilde kullanmayı hedefleyen bir ajans olarak kuruldu. Amacımız, markaların dijital dünyada gerçek bir etki yaratmasını sağlamak.</p>
                            <p>Geleneksel ajansların sınırlamalarını AI ile aşarak, daha hızlı, daha özgün ve daha ölçülebilir sonuçlar sunuyoruz.</p>
                        </div>
                        <div className={styles.storyVisual}>
                            <div className={styles.storyCard} style={{ background: 'var(--gradient-primary)' }}>
                                <span className={styles.storyEmoji}>🚀</span>
                                <span className={styles.storyYear}>2024</span>
                                <span className={styles.storyLabel}>Kuruluş</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission / Vision */}
            <section className={styles.missionSection}>
                <div className="container">
                    <div className={styles.missionGrid}>
                        <div className={styles.missionCard}>
                            <h3>🎯 Misyonumuz</h3>
                            <p>AI teknolojilerini kullanarak markaların sosyal medyada sürdürülebilir büyüme elde etmesini sağlamak. Her marka için özel, veri destekli stratejiler geliştiriyoruz.</p>
                        </div>
                        <div className={styles.missionCard}>
                            <h3>🔭 Vizyonumuz</h3>
                            <p>Türkiye ve bölgede AI destekli sosyal medya yönetiminin öncüsü olmak. Teknolojiyi insan yaratıcılığıyla birleştirerek sektörü dönüştürüyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge">Değerlerimiz</span>
                        <h2>Bizi Biz<br /><span className="gradient-text">Yapan Değerler</span></h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((v, i) => (
                            <div key={i} className={styles.valueCard}>
                                <span className={styles.valueIcon}>{v.icon}</span>
                                <h4>{v.title}</h4>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className={styles.teamSection}>
                <div className="container">
                    <div className="section-header">
                        <span className="badge">Ekibimiz</span>
                        <h2>Arkasındaki<br /><span className="gradient-text">İnsanlar</span></h2>
                    </div>
                    <div className={styles.teamGrid}>
                        {team.map((member, i) => (
                            <div key={i} className={styles.teamCard}>
                                <div className={styles.teamAvatar}>
                                    {member.initial}
                                </div>
                                <h4>{member.name}</h4>
                                <span className={styles.teamRole}>{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
