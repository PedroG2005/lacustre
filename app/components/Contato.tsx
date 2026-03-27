import type { PageData } from '../../lib/api';
import styles from './Contato.module.css';

// --- INÍCIO DA MUDANÇA ---
// Importa todos os ícones que precisamos
import { FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa';
// --- FIM DA MUDANÇA ---

interface ContatoProps {
  pageData: PageData;
}

export default function Contato({ pageData }: ContatoProps) {
  const {
    title,
    content,
    contactPhone,
    contactEmail,
    contactInstagramHandle,
    contactInstagramUrl,
    googleMapsUrl
  } = pageData;

  const cleanPhone = contactPhone ? contactPhone.replace(/\D/g, '') : '';
  const whatsappUrl = `https://wa.me/55${cleanPhone}`;

  return (
    <section
      id="contato"
      className={styles.contactSection}
    >
      <div className={styles.wrapper}>

        {/* --- COLUNA 1: INFORMAÇÕES --- */}
        <div className={styles.infoWrapper}>
          {title && (
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          {content && (
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Lista de Contatos (Dinâmica) */}
          <ul className={styles.contactList}>

            {contactPhone && (
              <li className={styles.contactItem}>
                <FaWhatsapp size={20} />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactPhone}
                </a>
              </li>
            )}

            {/* --- INÍCIO DA MUDANÇA --- */}
            {contactEmail && (
              <li className={styles.contactItem}>
                {/* Substitui ✉️ pelo ícone oficial */}
                <FaEnvelope size={20} />
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
            )}
            {/* --- FIM DA MUDANÇA --- */}

            {/* --- INÍCIO DA MUDANÇA --- */}
            {contactInstagramHandle && contactInstagramUrl && (
              <li className={styles.contactItem}>
                {/* Substitui 📱 pelo ícone oficial */}
                <FaInstagram size={20} />
                <a href={contactInstagramUrl} target="_blank" rel="noopener noreferrer">
                  {contactInstagramHandle}
                </a>
              </li>
            )}
            {/* --- FIM DA MUDANÇA --- */}

          </ul>

          {/* Botão de Orçamento (usa o link de email) */}
          {contactEmail && (
            <a href="https://api.whatsapp.com/send/?phone=5561999497879&text&type=phone_number&app_absent=0"
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer">
              Solicitar Orçamento
            </a>
          )}
        </div>

        {/* --- COLUNA 2: MAPA --- */}
        <div className={styles.mapWrapper}>
          {googleMapsUrl ? (
            <iframe
              src={googleMapsUrl}
              className={styles.mapIframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <p>Erro ao carregar o mapa.</p>
          )}
        </div>
      </div>
    </section>
  );
}