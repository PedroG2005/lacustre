import type { PageData, WpBlock } from '../../lib/api'; // MUDANÇA: Importar WpBlock
import styles from './About.module.css';

interface AboutProps {
  data: PageData; // O componente recebe os dados da página "Sobre"
}

// MUDANÇA: Adicionar a interface para os atributos do parágrafo
interface ParagraphAttributes {
  content: string;
}

export default function About({ data }: AboutProps) {
  const title = data.title;
  // MUDANÇA: Usar data.blocks em vez de data.content
  const blocks = data.blocks;

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
      <div className={styles.mainTextWrapper}>
        {/* MUDANÇA: 'blocks' agora está definido */}
        {blocks &&
          blocks.map((block: WpBlock, index: number) => {
            // 2. Renderizamos apenas parágrafos
            if (block.name === "core/paragraph") {
              const attrs = block.attributes as unknown as ParagraphAttributes;
              return (
                <p
                  key={index}
                  // 3. Aplicamos o estilo .mainText a cada parágrafo
                  className={styles.mainText}
                  dangerouslySetInnerHTML={{ __html: attrs.content }}
                />
              );
            }
            return null;
          })}
      </div>  

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