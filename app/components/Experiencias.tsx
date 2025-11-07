import Image from 'next/image';
import type { PageData, ExperienciaNode } from '../../lib/api'; 
import styles from './Experiencias.module.css';

// O componente agora recebe DUAS props:
interface ExperienciasProps {
  pageData: PageData; // Dados da página (Título/Subtexto)
  experiencias: ExperienciaNode[]; // A lista de itens do CPT
}

export default function Experiencias({ pageData, experiencias }: ExperienciasProps) {
  // Usamos os dados da página (Início, Sobre, etc.)
  const title = pageData.title;
  const subtext = pageData.content; 

  return (
    <section 
      id="experiencias" // ID para a rolagem do menu
      className={styles.expSection}
    >
      {/* --- Header da Seção (vindo da Página) --- */}
      <div className={styles.header}>
        {title && (
          <h2 
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }} 
          />
        )}
        {subtext && (
          <div 
            className={styles.subtext}
            dangerouslySetInnerHTML={{ __html: subtext }} 
          />
        )}
      </div>

      {/* --- Grid de 4 Colunas (vindo do CPT) --- */}
      <div className={styles.gridWrapper}>
        
        {/* Mapeamos a prop 'experiencias' em vez do array 'experiences' */}
        {experiencias.map((exp) => {
          const imageUrl = exp.featuredImage?.node?.sourceUrl;
          const imageAlt = exp.featuredImage?.node?.altText;

          return (
            <div key={exp.id} className={styles.card}>
              
              {/* O Bloco Quadrado da Imagem */}
              <div className={styles.imageWrapper}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt || exp.title}
                    fill // 'fill' faz a imagem preencher o wrapper quadrado
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                ) : (
                  <span>{exp.title}</span> // Placeholder se não houver imagem
                )}
              </div>

              {/* O Texto abaixo */}
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              {/* CORREÇÃO: Usamos o 'excerpt' (Resumo) para o texto */}
              {exp.excerpt && (
                <div 
                  className={styles.cardText}
                  dangerouslySetInnerHTML={{ __html: exp.excerpt }}
                />
              )}
            </div>
          );
        })}
        
        {/* --- CORREÇÃO --- */}
        {/* O BOTÃO FOI MOVIDO DE DENTRO DO GRID... */}
        {/* --- FIM DA CORREÇÃO --- */}

      </div>

      {/* --- CORREÇÃO --- */}
      {/* ...PARA FORA DO GRID. */}
      <a 
        href="#contato" 
        className={styles.button}
      >
        Fale Conosco
      </a>
      {/* --- FIM DA CORREÇÃO --- */}

    </section>
  );
}