// /Lacustre/lacustre/app/components/Hero.tsx

// --- INÍCIO DA CORREÇÃO ---
// Mudamos o caminho do import de '@/lib/api' para o caminho relativo
import type { PageData } from '../../lib/api'; 
// --- FIM DA CORREÇÃO ---

import styles from './Hero.module.css';

interface HeroProps {
  data: PageData; // O componente recebe os dados da página "Início"
}

export default function Hero({ data }: HeroProps) {
  // Puxamos os dados para variáveis locais
  const headline = data.title;
  const imageUrl = data.featuredImage?.node?.sourceUrl;

  return (
    <section 
      id="inicio" // ID para a rolagem do menu
      className={styles.hero}
      style={{
        // Define a imagem de fundo dinamicamente
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
      }}
    >
      <div className={styles.overlay} /> {/* Overlay escuro */}

      <div className={styles.content}>
        
        {/* Título Principal (Vindo do "Resumo") */}
        {headline && (
          <h1 
            className={styles.headline}
            dangerouslySetInnerHTML={{ __html: headline }} 
          />
        )}

        {/* Botões */}
        <div className={styles.buttonWrapper}>
          <a href="#experiencias" className={styles.button}>
            Conheça nossas experiências
          </a>
          <a href="#contato" className={styles.buttonSecondary}>
            Agende sua visita
          </a>
        </div>

      </div>
    </section>
  );
}