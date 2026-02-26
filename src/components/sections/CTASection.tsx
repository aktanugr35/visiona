import styles from './CTASection.module.css';

const WHATSAPP_URL = 'https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum.';

export default function CTASection() {
    return (
        <section id="iletisim" className={`section section--dark ${styles.cta}`}>
            <div className={styles.glowOrb}></div>
            <div className="container">
                <div className={styles.card}>
                    <span className="badge badge--dark">İletişim</span>
                    <h2>Projenizi<br /><span className="gradient-text">Konuşalım</span></h2>
                    <p>Markanızın dijital varlığını güçlendirmek için hemen bizimle iletişime geçin.</p>

                    <div className={styles.contactGrid}>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                            <span className={styles.contactIcon}>📱</span>
                            <span className={styles.contactLabel}>WhatsApp</span>
                            <span className={styles.contactValue}>0543 679 96 36</span>
                        </a>
                        <a href="mailto:uguraktan@visiona.tech" className={styles.contactCard}>
                            <span className={styles.contactIcon}>✉️</span>
                            <span className={styles.contactLabel}>E-posta</span>
                            <span className={styles.contactValue}>uguraktan@visiona.tech</span>
                        </a>
                    </div>

                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '20px 48px', fontSize: '17px', marginTop: '16px' }}>
                        WhatsApp ile Teklif Al →
                    </a>
                </div>
            </div>
        </section>
    );
}
