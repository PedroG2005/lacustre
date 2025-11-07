// --- MUDANÇA 1: Componente de Cliente ---
// Precisamos de interatividade (cliques), então usamos "use client"
"use client";

import Image from 'next/image';
import type { PageData, WpBlock } from '../../lib/api'; 
import styles from './Galeria.module.css';

// --- MUDANÇA 2: Imports para a Galeria ---
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";

// (As interfaces CoreImageAttributes e GalleryImage continuam iguais)
interface CoreImageAttributes {
  id?: number;
  url?: string;
  alt?: string;
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface GaleriaProps {
  pageData: PageData; 
}

// (As funções findGalleryBlock e getImagesFromGalleryBlock continuam iguais)
function findGalleryBlock(blocks: WpBlock[]): WpBlock | null {
  if (!blocks) return null;
  for (const block of blocks) {
    if (block.name === 'core/gallery') {
      return block;
    }
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      const innerGallery = findGalleryBlock(block.innerBlocks);
      if (innerGallery) return innerGallery;
    }
  }
  return null;
}

function getImagesFromGalleryBlock(block: WpBlock): GalleryImage[] {
  try {
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      return block.innerBlocks.map(innerBlock => {
        const imgAttrs = innerBlock.attributes as CoreImageAttributes; 
        return {
          id: imgAttrs.id?.toString() || Math.random().toString(),
          url: imgAttrs.url || '',
          alt: imgAttrs.alt || '',
        };
      });
    }
    return [];
  } catch (e) {
    console.error("Erro ao parsear atributos do bloco de galeria:", e);
    return [];
  }
}


export default function Galeria({ pageData }: GaleriaProps) {
  const title = pageData.title;

  // --- MUDANÇA 3: Adiciona Estado ---
  // Controla qual imagem está aberta. -1 = fechado.
  const [index, setIndex] = useState(-1);

  // Lógica de parse (do seu arquivo original, está correta)
  const blocks: WpBlock[] = typeof pageData.blocks === 'string' 
    ? (JSON.parse(pageData.blocks) as WpBlock[])
    : Array.isArray(pageData.blocks) 
      ? pageData.blocks 
      : [];
  const galleryBlock = findGalleryBlock(blocks);
  const galleryItems = galleryBlock ? getImagesFromGalleryBlock(galleryBlock) : [];

  // --- MUDANÇA 4: Formata os slides ---
  // A biblioteca Lightbox espera um array de objetos { src, alt }
  const slides = galleryItems.map(item => ({
    src: item.url,
    alt: item.alt || 'Item da Galeria Lacustre'
  }));

  return (
    <section 
      id="galeria" 
      className={styles.gallerySection}
    >
      <div className={styles.header}>
        {title && (
          <h2 
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }} 
          />
        )}
      </div>

      <div className={styles.gridWrapper}>
        
        {/* --- MUDANÇA 5: O Loop do Grid --- */}
        {galleryItems.map((item, i) => { // Adicionamos 'i' (o índice)
          if (!item.url) return null; 
          return (
            // Agora cada item é um botão clicável
            <button
              key={item.id}
              className={styles.galleryButton} // Usa o estilo de botão invisível
              onClick={() => setIndex(i)} // Ao clicar, define o índice
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.url}
                  alt={item.alt || 'Item da Galeria Lacustre'}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            </button>
          );
        })}
      </div>

      {pageData.galleryButtonText && pageData.galleryButtonUrl && (
        <a 
          href={pageData.galleryButtonUrl}
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.button}
        >
          {pageData.galleryButtonText}
        </a>
      )}

      {/* --- MUDANÇA 6: O Componente Lightbox --- */}
      {/* Ele fica invisível até que 'index' seja >= 0 */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
      />
      
    </section>
  );
}