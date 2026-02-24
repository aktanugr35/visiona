'use client';

import styles from './iletisim.module.css';

export default function IletisimPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Mesajınız alındı! En geç 24 saat içinde dönüş yapacağız. 🎉');
    };

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <span className="badge badge--dark">İletişim</span>
                    <h1>Birlikte<br /><span className="gradient-text">Konuşalım</span></h1>
                    <p className={styles.heroDesc}>Markanızın sosyal medya potansiyelini keşfetmek için bize ulaşın.</p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Form */}
                        <div className={styles.formWrap}>
                            <h2>Bize Yazın</h2>
                            <p className={styles.formDesc}>En geç 24 saat içinde dönüş yapacağız.</p>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Adınız *</label>
                                        <input type="text" id="name" name="name" placeholder="Adınız Soyadınız" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Şirket</label>
                                        <input type="text" id="company" name="company" placeholder="Şirket Adı" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">E-posta *</label>
                                    <input type="email" id="email" name="email" placeholder="ornek@sirket.com" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">İlgilendiğiniz Hizmet</label>
                                    <select id="service" name="service">
                                        <option value="">Seçiniz</option>
                                        <option value="ai-icerik">AI İçerik Üretimi</option>
                                        <option value="sosyal-medya">Sosyal Medya Yönetimi</option>
                                        <option value="reklam">AI Reklam Kreatifleri</option>
                                        <option value="strateji">Strateji & Analitik</option>
                                        <option value="enterprise">Kurumsal Paket</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="budget">Aylık Bütçe Aralığı</label>
                                    <select id="budget" name="budget">
                                        <option value="">Seçiniz</option>
                                        <option value="5k-10k">₺5.000 - ₺10.000</option>
                                        <option value="10k-25k">₺10.000 - ₺25.000</option>
                                        <option value="25k-50k">₺25.000 - ₺50.000</option>
                                        <option value="50k+">₺50.000+</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Mesajınız *</label>
                                    <textarea id="message" name="message" rows={5} placeholder="Projeniz hakkında kısaca bilgi verin..." required></textarea>
                                </div>

                                <button type="submit" className="btn-primary btn--full">
                                    Gönder →
                                </button>

                                <p className={styles.privacy}>
                                    Gönder butonuna tıklayarak{' '}
                                    <a href="/gizlilik-politikasi">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
                                </p>
                            </form>
                        </div>

                        {/* Info */}
                        <div className={styles.infoWrap}>
                            <div className={styles.infoCard}>
                                <h3>📧 E-posta</h3>
                                <a href="mailto:hello@visiona.ai">hello@visiona.ai</a>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>📱 Telefon</h3>
                                <a href="tel:+905321234567">+90 532 123 45 67</a>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>📍 Adres</h3>
                                <p>İstanbul, Türkiye</p>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>🕐 Çalışma Saatleri</h3>
                                <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
