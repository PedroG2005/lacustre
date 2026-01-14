"use client"; // Necessário para 'new Date()'
import Image from 'next/image';
import type { HeaderData } from '@/lib/api';
import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  data: HeaderData;
}

export default function Footer({ data }: FooterProps) {
  const { title, siteLogoUrl } = data.generalSettings;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>

        {/* --- ITEM 1: LOGO (Esquerda) --- */}
        <div className={styles.logoWrapper}>
          <a href="#" className={styles.logoLink}>
            {siteLogoUrl ? (
              <Image
                src={siteLogoUrl}
                alt={title || 'Logo da Lacustre'}
                className={styles.logoImage}
                width={150} // Mantido
                height={50} // Mantido
                priority
                unoptimized
              />
            ) : (
              <span className={styles.logoText}>{title}</span>
            )}
          </a>
        </div>

        {/* --- ITEM 2: COPYRIGHT (Centro) --- */}
        <div className={styles.copyrightWrapper}>
          <p className={styles.copyright}>
            Copyright © {currentYear} {title}
          </p>
        </div>

        {/* --- ITEM 3: REDES SOCIAIS (Direita) --- */}
        <div className={styles.socialList}>
          <a href="https://www.instagram.com/lacustrehalloficial" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaInstagram size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaFacebook size={24} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaLinkedin size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}