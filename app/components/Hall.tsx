import Image from 'next/image';
// 1. Importamos a interface WpBlock que já existe na sua API
import type { PageData, WpBlock } from '../../lib/api'; 
import styles from './Hall.module.css';

interface HallProps {
  data: PageData; // O componente recebe os dados da página "Hall"
}

// 2. Interface para os atributos de um bloco de Parágrafo
interface ParagraphAttributes {
  content: string;
  // (pode ter outros como 'align', 'textColor', etc.)
}

export default function Hall({ data }: HallProps) {
  const title = data.title;
  // 3. Certifique-se que 'data.blocks' seja 'WpBlock[]' na interface 'PageData' em lib/api
  const blocks = data.blocks;
  const imageUrl = data.featuredImage?.node?.sourceUrl;

  return (
    <section 
      id="hall" // ID para a rolagem do menu
      className={styles.hallSection}
    >
      <div className={styles.wrapper}>

        {/* --- COLUNA 1: IMAGEM (Sem mudanças) --- */}
        <div className={styles.imageWrapper}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title || 'Lacustre Hall'}
              className={styles.image}
              width={600}
              height={450}
              unoptimized
            />
          )}
        </div>

        {/* --- COLUNA 2: TEXTO --- */}
        <div className={styles.textWrapper}>
          {/* Título (Vindo do Título do WP) */}
          {title && (
            <h2 
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }} 
            />
          )}

          {/* --- INÍCIO DA MUDANÇA --- */}
          {/* 4. Mapeamos os blocos de parágrafo */}
          <div className={styles.mainTextWrapper}>
            {blocks && blocks.map((block: WpBlock, index: number) => {
              
              // Renderizamos apenas os blocos que são parágrafos
              if (block.name === 'core/paragraph') {
                
                // ========================================================
                // CORREÇÃO DO ERRO 2: Usamos "as unknown as"
                // ========================================================
                const attrs = block.attributes as unknown as ParagraphAttributes;
                
                return (
                  <p 
                    key={index} 
                    className={styles.paragraph}
                    dangerouslySetInnerHTML={{ __html: attrs.content }} 
                  />
                );
              }
              return null; // Ignora outros blocos (ex: imagens, etc.)
            })}
          </div>
          {/* --- FIM DA MUDANÇA --- */}


          {/* Destaques (Grid Hardcoded) */}
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightItem}>Espaço climatizado e versátil</div>
            <div className={styles.highlightItem}>Iluminação e sonorização premium</div>
            <div className={styles.highlightItem}>Área externa com vista deslumbrante</div>
            <div className={styles.highlightItem}>Equipe técnica e operacional dedicada</div>
          </div>

          {/* Botão */}
          <a href="#contato" className={styles.button}>
            Agende uma visita
          </a>
        </div>
      </div>
    </section>
  );
}