// 1. Imports corrigidos
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Hall from "./components/Hall";
import Corporativo from "./components/Corporativo";
import Gastronomia from "./components/Gastronomia";
import Experiencias from "./components/Experiencias";
import Galeria from "./components/Galeria";
import Contato from "./components/Contato";
import Footer from "./components/Footer";

import {
  getHeaderData,
  getPageData,
  getExperienciasData

} from "../lib/api";

export default async function Home() {

  // 2. Buscamos TODOS os dados
  const headerData = await getHeaderData();
  const heroData = await getPageData('40'); // ID "Início"
  const aboutData = await getPageData('46'); // ID "Sobre"
  const hallData = await getPageData('48'); // ID "Hall"
  const corporativoData = await getPageData('178'); // ID "Corporativo"
  const gastroData = await getPageData('51'); // ID "Gastronomia"
  const expPageData = await getPageData('60'); // ID da Página "Experiências"
  const experienciasData = await getExperienciasData(); // Dados do CPT de "Experiências"
  const contatoData = await getPageData('121');
  const galeriaPageData = await getPageData('103'); // ID da Página "Galeria"



  return (
    <>
      <Header data={headerData} />
      <Hero data={heroData} />
      <About data={aboutData} />
      <Hall data={hallData} />
      <Corporativo data={corporativoData} />
      <Gastronomia data={gastroData} />
      <Experiencias pageData={expPageData} experiencias={experienciasData} />
      <Galeria pageData={galeriaPageData} />
      <Contato pageData={contatoData} />
      <Footer
        data={headerData}
        contactEmail={contatoData.contactEmail}
        contactPhone={contatoData.contactPhone}
      />

    </>
  );
}