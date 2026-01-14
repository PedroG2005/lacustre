const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchAPI<T>(
  query: string,
  { variables }: { variables?: Record<string, unknown> } = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL não está definido no .env.local');
  }
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error('Erro ao buscar API do WordPress:', json.errors);
    throw new Error('Falha ao buscar dados da API.');
  }
  return json.data;
}

// --- Dados do Header ---
export interface MenuItem {
  id: string;
  label: string;
  path: string;
}

export interface HeaderData {
  generalSettings: {
    title: string;
    siteLogoUrl: string | null;
  };
  menuItems: {
    nodes: MenuItem[];
  };
}

interface GetHeaderDataResponse {
  generalSettings: {
    title: string;
    siteLogoUrl: string | null;
  };
  menu: {
    menuItems: {
      nodes: MenuItem[];
    };
  };
}

export async function getHeaderData(): Promise<HeaderData> {
  const data = await fetchAPI<GetHeaderDataResponse>(
    `
      query GetHeaderData {
        generalSettings {
          title
          siteLogoUrl
        }
        menu(id: "Menu Principal", idType: NAME) {
          menuItems {
            nodes {
              id
              label
              path
            }
          }
        }
      }
      `
  );

  return {
    generalSettings: data.generalSettings,
    menuItems: data.menu.menuItems,
  };
}

// --- Dados de Página Genérica (Hero, Sobre, etc.) ---

// Esta interface WpBlock será usada no Galeria.tsx
export interface WpBlock {
  name: string;
  attributes: Record<string, unknown>; // Mudamos 'any' para 'unknown'
  innerBlocks: WpBlock[];
}

export interface PageData {
  title: string;
  content: string | null;
  featuredImage: {
    node: {
      sourceUrl: string;
    } | null;
  } | null;
  galleryButtonText: string | null;
  galleryButtonUrl: string | null;
  blocks: WpBlock[];

  // --- NOVOS CAMPOS DE CONTATO ---
  contactPhone: string | null;
  contactEmail: string | null;
  contactWebsite: string | null;
  contactInstagramHandle: string | null;
  contactInstagramUrl: string | null;
  googleMapsUrl: string | null;
}

interface GetPageDataResponse {
  page: PageData;
}

export async function getPageData(id: string): Promise<PageData> {
  const data = await fetchAPI<GetPageDataResponse>(
    `
    query GetPageByID($id: ID!) {
      page(id: $id, idType: DATABASE_ID) { 
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        galleryButtonText
        galleryButtonUrl
        
        # Pedimos 'blocks' como uma string, sem sub-seleção
        blocks 

        # --- NOVOS CAMPOS DE CONTATO ---
        contactPhone
        contactEmail
        contactInstagramHandle
        contactInstagramUrl
        googleMapsUrl
      }
    }
    `,
    {
      variables: { id: id },
    }
  );

  return data.page;
}

// --- DADOS DAS EXPERIÊNCIAS (CPT) ---
export interface ExperienciaNode {
  id: string;
  title: string;
  excerpt: string | null;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string | null;
    } | null;
  } | null;
}

interface GetExperienciasDataResponse {
  experiencias: {
    nodes: ExperienciaNode[];
  };
}

export async function getExperienciasData(): Promise<ExperienciaNode[]> {
  const data = await fetchAPI<GetExperienciasDataResponse>(
    `
    query GetExperiencias {
      experiencias(first: 4, where: { orderby: { field: DATE, order: ASC } }) {
        nodes {
          id
          title
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    `
  );

  return data.experiencias.nodes;
}