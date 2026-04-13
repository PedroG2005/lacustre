"use client";

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './BackButton.module.css';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className={styles.backButton}
      aria-label="Voltar"
    >
      <FaArrowLeft size={20} />
      <span>Voltar</span>
    </button>
  );
}
