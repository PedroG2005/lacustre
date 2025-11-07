import Image from "next/image";
// 1. IMPORTAÇÕES ATUALIZADAS
import type { PageData, WpBlock } from "../../lib/api";
import styles from "./Gastronomia.module.css";

interface GastronomiaProps {
  data: PageData;
}

// 2. INTERFACE PARA OS ATRIBUTOS DO PARÁGRAFO
interface ParagraphAttributes {
  content: string;
}

export default function Gastronomia({ data }: GastronomiaProps) {
  const title = data.title;
  // 3. USAR 'data.blocks' EM VEZ DE 'data.content'
  const blocks = data.blocks;
  const chefImageUrl = data.featuredImage?.node?.sourceUrl;

  return (
    <section id="gastronomia" className={styles.gastroSection}>
      <div className={styles.wrapper}>
        {/* --- COLUNA 1: TEXTO (Sem o bloco do chef) --- */}
        <div className={styles.textWrapper}>
          {title && (
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          {/* --- INÍCIO DA MUDANÇA --- */}
          {/* 4. Mapeamos os blocos de parágrafo */}
          {blocks &&
            blocks.map((block: WpBlock, index: number) => {
              // Renderizamos apenas os blocos que são parágrafos
              if (block.name === "core/paragraph") {
                // Usamos "as unknown as" para forçar a tipagem
                const attrs = block.attributes as unknown as ParagraphAttributes;

                return (
                  <p
                    key={index}
                    // Usamos a classe .mainText que já existe
                    className={styles.mainText}
                    dangerouslySetInnerHTML={{ __html: attrs.content }}
                  />
                );
              }
              return null; // Ignora outros blocos
            })}
          {/* --- FIM DA MUDANÇA --- */}

          <a href="#experiencias" className={styles.button}>
            Conheça Nossas Experiências
          </a>
        </div>

        {/* --- COLUNA 2: FOTO DO CHEF EM DESTAQUE (Substitui a galeria) --- */}
        <div className={styles.chefWrapper}>
          {chefImageUrl && (
            <Image
              src={chefImageUrl}
              alt="Chef Rafa Dantas"
              className={styles.chefImage}
              width={200}
              height={200}
              unoptimized
            />
          )}

          {/* Nome do Chef (Hardcoded) */}
          <h3 className={styles.chefName}>Rafa Dantas</h3>

          <p className={styles.chefQuote}>
            “Cozinhar é emocionar e na Lacustre, cada ingrediente conta uma
            história.”
          </p>
        </div>
      </div>
    </section>
  );
}