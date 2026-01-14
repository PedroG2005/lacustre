import Image from 'next/image';
import type { PageData, WpBlock } from '../../lib/api';
import styles from './Corporativo.module.css';

interface CorporativoProps {
    data: PageData;
}

interface ParagraphAttributes {
    content: string;
}

export default function Corporativo({ data }: CorporativoProps) {
    const title = data.title;
    const blocks = data.blocks;
    const imageUrl = data.featuredImage?.node?.sourceUrl;

    return (
        <section
            id="corporativo"
            className={styles.corporativoSection}
        >
            <div className={styles.wrapper}>

                {/* --- COLUNA 1: TEXTO --- */}
                <div className={styles.textWrapper}>
                    {/* Título */}
                    {title && (
                        <h2
                            className={styles.title}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}

                    {/* Parágrafos */}
                    <div className={styles.mainTextWrapper}>
                        {blocks && blocks.map((block: WpBlock, index: number) => {
                            if (block.name === 'core/paragraph') {
                                const attrs = block.attributes as unknown as ParagraphAttributes;
                                return (
                                    <p
                                        key={index}
                                        className={styles.paragraph}
                                        dangerouslySetInnerHTML={{ __html: attrs.content }}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Botão */}
                    <a href="#contato" className={styles.button}>
                        Solicite um orçamento
                    </a>
                </div>

                {/* --- COLUNA 2: IMAGEM --- */}
                <div className={styles.imageWrapper}>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={title || 'Corporativo Lacustre'}
                            className={styles.image}
                            width={600}
                            height={750}
                            unoptimized
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
