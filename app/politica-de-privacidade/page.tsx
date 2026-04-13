import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { getHeaderData, getPageData } from "@/lib/api";
import styles from "./Politica.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidade | Lacustre",
  description: "Conheça nossas práticas de privacidade e proteção de dados em conformidade com a LGPD.",
};

export default async function PoliticaDePrivacidade() {
  const headerData = await getHeaderData();
  const contatoData = await getPageData('121');

  return (
    <>
      <Header data={headerData} />

      <main className={styles.container}>
        <div className={styles.header}>
          <BackButton />
          <h1 className={styles.title}>Política de Privacidade</h1>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Objetivo</h2>
            <p>
              Esta Política de Privacidade tem o objetivo de informar como a Lacustre, na qualidade de Controladora de Dados, coleta, armazena, utiliza e protege os dados pessoais de seus usuários e clientes, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Dados Coletados e Finalidade</h2>
            <p>
              Coletamos informações estritamente necessárias para a prestação de nossos serviços e para a melhoria da experiência do usuário, incluindo:
            </p>
            <ul>
              <li><strong>Dados de Identificação:</strong> Nome completo, e-mail e telefone, fornecidos voluntariamente via formulários de contato ou reserva.</li>
              <li><strong>Dados de Navegação:</strong> Cookies e endereços IP, utilizados para análise de desempenho do site e segurança.</li>
            </ul>
            <p>
              A finalidade principal do tratamento é o atendimento a solicitações, a execução de contratos (reservas) e o envio de comunicações institucionais, sempre amparados por bases legais como o legítimo interesse ou o consentimento.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Direitos dos Titulares de Dados</h2>
            <p>
              Nos termos da LGPD, você possui os seguintes direitos em relação aos seus dados:
            </p>
            <ul>
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos dados e correção de informações incompletas ou inexatas;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
              <li>Revogação do consentimento a qualquer momento.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Compartilhamento e Segurança</h2>
            <p>
              Não comercializamos dados pessoais. O compartilhamento ocorre apenas com prestadores de serviços de tecnologia essenciais (como hospedagem e serviços de e-mail), que estão contratualmente obrigados a manter a confidencialidade e segurança das informações.
            </p>
            <p>
              Adotamos medidas de segurança técnicas (criptografia, firewalls) e administrativas para prevenir incidentes de segurança e acessos não autorizados.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Retenção de Dados</h2>
            <p>
              Manteremos seus dados pessoais apenas pelo período necessário para cumprir as finalidades descritas, para o cumprimento de obrigações legais ou judiciais, ou enquanto houver consentimento válido.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Canal de Contato (DPO)</h2>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta Política, você pode entrar em contato com nosso encarregado de proteção de dados através do e-mail: <strong><a href="mailto:site@lacustre.com.br" className="underline">site@lacustre.com.br</a></strong> ou pelos canais indicados em nosso rodapé.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Atualizações</h2>
            <p>
              Esta política foi atualizada pela última vez em Abril de 2026. Reservamo-nos o direito de alterá-la periodicamente para refletir mudanças legislativas ou em nossas operações.
            </p>
          </section>
        </div>
      </main>

      <Footer
        data={headerData}
        contactEmail={contatoData.contactEmail}
        contactPhone={contatoData.contactPhone}
      />
    </>
  );
}
