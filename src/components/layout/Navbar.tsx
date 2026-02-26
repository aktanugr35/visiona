'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const WHATSAPP_URL = 'https://wa.me/905436799636?text=Merhaba%2C%20teklif%20almak%20istiyorum.';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className={styles.logoIcon}>v</span>
          <span className={styles.logoText}>vision<span className={styles.logoAccent}>A</span></span>
        </Link>

        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('hizmetler')} className={styles.navLink}>Hizmetler</button>
          <button onClick={() => scrollToSection('instagram')} className={styles.navLink}>Çalışmalar</button>
          <button onClick={() => scrollToSection('iletisim')} className={styles.navLink}>İletişim</button>
        </div>

        <div className={styles.navActions}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px' }}>
            Teklif Al →
          </a>
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menüyü aç/kapat"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <button className={styles.mobileLink} onClick={() => scrollToSection('hizmetler')}>Hizmetler</button>
          <button className={styles.mobileLink} onClick={() => scrollToSection('instagram')}>Çalışmalar</button>
          <button className={styles.mobileLink} onClick={() => scrollToSection('iletisim')}>İletişim</button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: '24px', width: '100%', textAlign: 'center', display: 'block' }}
            onClick={() => setMobileOpen(false)}
          >
            Teklif Al →
          </a>
        </div>
      </div>
    </nav>
  );
}
