'use client';

import { useState } from 'react';
import styles from './fiyatlandirma.module.css';

const plans = [
    {
        name: 'Starter',
        price: { monthly: '₺5.900', yearly: '₺4.720' },
        desc: 'Sosyal medyaya ilk adım',
        features: ['1 Platform yönetimi', '15 İçerik/ay', 'Temel raporlama', 'E-posta desteği'],
        cta: 'Başla →',
        popular: false,
    },
    {
        name: 'Growth',
        price: { monthly: '₺12.900', yearly: '₺10.320' },
        desc: 'Büyüyen markalar için',
        features: ['3 Platform yönetimi', '45 İçerik/ay', 'AI reklam kreatifleri', 'Haftalık rapor', 'Strateji danışmanlığı'],
        cta: 'Başla →',
        popular: true,
    },
    {
        name: 'Scale',
        price: { monthly: '₺24.900', yearly: '₺19.920' },
        desc: 'Ölçeklenen operasyonlar',
        features: ['5 Platform yönetimi', '90 İçerik/ay', 'Reklam yönetimi dahil', 'Analitik suite', 'Öncelikli destek', 'Dedicated account manager'],
        cta: 'Başla →',
        popular: false,
    },
    {
        name: 'Enterprise',
        price: { monthly: 'Özel', yearly: 'Özel' },
        desc: 'Kurumsal çözümler',
        features: ['Sınırsız platform', 'Sınırsız içerik', 'Dedicated ekip', 'Özel SLA', '7/24 destek', 'Custom entegrasyonlar'],
        cta: 'İletişim →',
        popular: false,
    },
];

const faqs = [
    { q: 'Paket değiştirebilir miyim?', a: 'Evet, istediğiniz zaman paketinizi yükseltebilir veya düşürebilirsiniz. Değişiklik bir sonraki fatura döneminde geçerli olur.' },
    { q: 'Sözleşme süresi nedir?', a: 'Aylık planlarımızda sözleşme yoktur. Yıllık planlarda 12 aylık taahhüt karşılığında %20 indirim sunuyoruz.' },
    { q: 'İçerikleri onaylamam gerekiyor mu?', a: 'İlk dönemde tüm içerikler onayınıza sunulur. Süreç ilerledikçe, güven oluştuğunda onay akışını esnek hale getiririz.' },
    { q: 'Kaç günde teslimat yapılıyor?', a: 'İlk içerik teslimatı briefing sonrası maksimum 48 saat içinde yapılır. Düzenli yönetim sürecinde takvime göre hareket edilir.' },
    { q: 'Hangi platformları yönetiyorsunuz?', a: 'Instagram, TikTok, LinkedIn, X (Twitter) ve Pinterest dahil tüm büyük sosyal medya platformlarını yönetiyoruz.' },
    { q: 'İptal politikası nedir?', a: 'Aylık planlarda 30 gün önceden bildirim ile iptal edebilirsiniz. Yıllık planlarda erken iptal koşulları sözleşmede belirtilir.' },
];

export default function FiyatlandirmaPage() {
    const [yearly, setYearly] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <span className="badge badge--dark">Fiyatlandırma</span>
                    <h1>Markanıza Uygun<br /><span className="gradient-text">Planı Seçin</span></h1>
                    <p className={styles.heroDesc}>Tüm planlar 14 günlük deneme süresiyle başlar.</p>

                    {/* Toggle */}
                    <div className={styles.toggle}>
                        <span className={!yearly ? styles.toggleActive : ''}>Aylık</span>
                        <button className={styles.toggleSwitch} onClick={() => setYearly(!yearly)} aria-label="Periyod değiştir">
                            <div className={`${styles.toggleKnob} ${yearly ? styles.toggleKnobRight : ''}`}></div>
                        </button>
                        <span className={yearly ? styles.toggleActive : ''}>
                            Yıllık <span className={styles.discount}>%20 İndirim</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className={styles.plansSection}>
                <div className="container">
                    <div className={styles.plansGrid}>
                        {plans.map((plan, i) => (
                            <div key={i} className={`${styles.planCard} ${plan.popular ? styles.planPopular : ''}`}>
                                {plan.popular && <span className={styles.popularBadge}>⭐ Popüler</span>}
                                <h3>{plan.name}</h3>
                                <p className={styles.planDesc}>{plan.desc}</p>
                                <div className={styles.price}>
                                    <span className={styles.priceAmount}>{yearly ? plan.price.yearly : plan.price.monthly}</span>
                                    {plan.price.monthly !== 'Özel' && <span className={styles.pricePeriod}>/ay</span>}
                                </div>
                                <ul className={styles.planFeatures}>
                                    {plan.features.map(f => (
                                        <li key={f}>
                                            <span className={styles.checkIcon}>✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/iletisim" className={plan.popular ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', textAlign: 'center', marginTop: 'auto' }}>
                                    {plan.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.faqSection}>
                <div className="container">
                    <div className="section-header">
                        <h2>Sık Sorulan<br /><span className="gradient-text">Sorular</span></h2>
                    </div>
                    <div className={styles.faqList}>
                        {faqs.map((faq, i) => (
                            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span>{faq.q}</span>
                                    <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
