"use client";
import Image from 'next/image';
import type { HeaderData } from '@/lib/api';
import styles from './Footer.module.css';
import { FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa';

interface FooterProps {
  data: HeaderData;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

export default function Footer({ data, contactEmail, contactPhone }: FooterProps) {
  const { title, siteLogoUrl } = data.generalSettings;
  const currentYear = new Date().getFullYear();

  const cleanPhone = contactPhone ? contactPhone.replace(/\D/g, '') : '';
  const whatsappUrl = `https://wa.me/55${cleanPhone}`;

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

          {/* WhatsApp */}
          {contactPhone && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaWhatsapp size={24} />
            </a>
          )}

          {/* Email */}
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaEnvelope size={24} />
            </a>
          )}

          {/* Instagram */}
          <a href="https://www.instagram.com/lacustrehalloficial" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaInstagram size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}