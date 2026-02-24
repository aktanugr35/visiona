'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/fiyatlandirma', label: 'Fiyatlandırma' },
  { href: '/blog', label: 'Blog' },
];

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

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className={styles.logoIcon}>v</span>
          <span className={styles.logoText}>vision<span className={styles.logoAccent}>A</span></span>
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <Link href="/iletisim" className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px' }}>
            Teklif Al →
          </Link>
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
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className="btn-primary"
            style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            Teklif Al →
          </Link>
        </div>
      </div>
    </nav>
  );
}
