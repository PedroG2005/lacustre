import type { PageData } from '../../lib/api'; // Reutiliza a interface PageData
import styles from './About.module.css';

interface AboutProps {
  data: PageData; // O componente recebe os dados da página "Sobre"
}

export default function About({ data }: AboutProps) {
  const title = data.title;
  const content = data.content;

  return (
    <section 
      id="sobre" // ID para a rolagem do menu
      className={styles.aboutSection}
    >
      {/* Título (Vindo do Título do WP) */}
      {title && (
        <h2 
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }} 
        />
      )}

      {/* Texto Principal (Vindo do Conteúdo do WP) */}
      {content && (
        <div 
          className={styles.mainText}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      )}

      {/* --- Mini-blocos (Hardcoded) --- */}
      <div className={styles.blocksWrapper}>
        
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Missão</h3>
          <p className={styles.blockText}>
            Transformar celebrações em experiências memoráveis.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Visão</h3>
          <p className={styles.blockText}>
            Ser referência nacional em eventos e gastronomia de alto padrão.
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Valores</h3>
          <p className={styles.blockText}>
            Excelência, exclusividade e arte em cada detalhe.
          </p>
        </div>
      </div>

      {/* --- INÍCIO DA MUDANÇA --- */}
      {/* Botão Call-to-Action (Hardcoded) */}
      <a 
        href="#contato" 
        className={styles.button}
      >
        Fale Conosco
      </a>
      {/* --- FIM DA MUDANÇA --- */}

    </section>
  );
}