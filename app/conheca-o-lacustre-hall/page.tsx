import Script from "next/script";
import FormContact from "./FormContact";
import { getPageData } from "../../lib/api";
import Image from "next/image";

export default async function LacustreHallBrandingPage() {
  const pageData = await getPageData('206');
  const title = pageData.title;
  const blocks = pageData.blocks;
  const imageUrl = pageData.featuredImage?.node?.sourceUrl;

  return (
    <div className="min-h-screen relative font-sans text-zinc-900 bg-[#f8f5f0] overflow-hidden flex flex-col justify-center">
      {/* Script do reCAPTCHA */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Script src="https://www.google.com/recaptcha/api.js" async defer />
      )}

      {/* DETALHES DECORATIVOS DA IMAGEM (Folhas nos cantos) */}
      <div className="absolute top-0 right-0 opacity-80 pointer-events-none z-0 w-48 h-48 md:w-64 md:h-64">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#2c3e2c]">
          <path d="M180,0 C170,30 140,50 120,60 C140,40 160,20 180,0 Z" fill="currentColor"/>
          <path d="M200,20 C180,50 150,70 130,80 C160,70 180,50 200,20 Z" fill="#b08b57"/>
          <path d="M190,40 C170,80 140,100 110,110 C140,90 170,60 190,40 Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 opacity-80 pointer-events-none z-0 w-48 h-48 md:w-64 md:h-64 transform rotate-180">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#b08b57]">
          <path d="M180,0 C170,30 140,50 120,60 C140,40 160,20 180,0 Z" fill="currentColor"/>
          <path d="M200,20 C180,50 150,70 130,80 C160,70 180,50 200,20 Z" fill="#2c3e2c"/>
        </svg>
      </div>

      {/* TEXTURA SUTIL TIPO LINHO / PAPEL */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

      {/* CONTAINER CENTRALIZADO DA TELA */}
      <main 
        className="relative z-10 w-full flex-1 flex items-center justify-center"
        style={{ padding: '20px', paddingBottom: '60px' }}
      >
        
        {/* CAIXA PRINCIPAL DA PÁGINA (Card Flutuante Grande) */}
        <div className="w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-14 lg:px-20 flex flex-col md:flex-row items-center md:items-center justify-between gap-12 lg:gap-20">
          
          {/* LADO ESQUERDO: A Imagem de Capa Gigante e Arredondada (A grande âncora visual) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
             <div className="relative w-full max-w-[480px] h-[450px] md:h-[550px] lg:h-[max(600px,calc(100vh-200px))] max-h-[680px] rounded-[3rem] overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Eventos Lacustre"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8decc]"></div>
                )}
             </div>
          </div>

          {/* LADO DIREITO: Título e Parágrafos Vindos do Gutenberg */}
          <div className="w-full md:w-1/2 flex flex-col justify-center max-w-[500px]">
             
             {/* Título Principal Dinâmico */}
             <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {title && (
                 <h1 
                   style={{ margin: 0 }} 
                   className="text-[36px] md:text-[42px] lg:text-[48px] font-serif text-[#162116] leading-[1.15] tracking-tight drop-shadow-sm font-medium pr-10"
                   dangerouslySetInnerHTML={{ __html: title }}
                 />
               )}

               {/* Parágrafos dinâmicos vindos do WP */}
               {blocks && Array.isArray(blocks) && blocks.length > 0 && (
                 <div className="text-[#3c4a3c] text-[15.5px] font-medium leading-[1.7] pr-4 space-y-4">
                   {blocks.map((block: any, index: number) => {
                     if (block.name === 'core/paragraph') {
                       return (
                         <p 
                           key={index} 
                           style={{ margin: 0 }}
                           dangerouslySetInnerHTML={{ __html: block.attributes.content }}
                         />
                       );
                     }
                     return null;
                   })}
                 </div>
               )}
             </div>

             {/* Formulário Renderizado */}
             <FormContact />
             
          </div>

        </div>
      </main>

      {/* FOOTER INFERIOR ESTRITO IGUAL NA REF */}
      <footer className="w-full bg-transparent text-[#27351d] text-center py-4 text-[11px] font-semibold tracking-wide z-10 relative mt-auto opacity-70">
        &copy; {new Date().getFullYear()} Lacustre Hall. Todos os direitos reservados.
      </footer>
    </div>
  );
}
