'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { HeaderData, MenuItem } from '@/lib/api';
import styles from './Header.module.css';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const { title, siteLogoUrl } = data.generalSettings;
  const menuItems = data.menuItems.nodes;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#" className={styles.logoLink}>
          {siteLogoUrl ? (
            <Image
              src={siteLogoUrl}
              alt={title || 'Logo da Lacustre'}
              className={styles.logoImage}
              width={150}
              height={50}
              priority
              unoptimized
            />
          ) : (
            <span className={styles.logoText}>{title}</span>
          )}
        </a>

        {/* Botão do menu mobile */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Navegação */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {menuItems.map((item: MenuItem) => (
            <a
              key={item.id}
              href={item.path}
              className={
                item.path === 'https://api.whatsapp.com/send/?phone=5561999497879&text&type=phone_number&app_absent=0'
                  ? styles.contactButton
                  : styles.navLink
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)} // Fecha o menu ao clicar
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
