import styles from './CTASection.module.css';

export default function CTASection() {
    return (
        <section className={styles.cta}>
            <div className={styles.bgEffect}></div>
            <div className={styles.bgEffect2}></div>
            <div className={`container ${styles.inner}`}>
                <span className="badge badge--dark">Hazır Mısınız?</span>
                <h2 className={styles.title}>
                    Markanızı Büyütmeye<br />
                    <span className="gradient-text">Bugün Başlayın</span>
                </h2>
                <p className={styles.subtitle}>
                    Ücretsiz keşif görüşmemizle sosyal medya stratejinizi birlikte planlayalım.
                </p>
                <div className={styles.buttons}>
                    <a href="/iletisim" className="btn-primary" style={{ padding: '18px 40px', fontSize: '16px' }}>
                        Ücretsiz Teklif Alın →
                    </a>
                    <a href="/projeler" className="btn-outline btn--dark">
                        Projelerimizi İnceleyin
                    </a>
                </div>
            </div>
        </section>
    );
}
