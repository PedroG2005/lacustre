import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Esta linha ativa a exportação estática que gera a pasta 'out'. */
  output: 'export',

  /* Força a criação de pastas com index.html dentro (ex: conheca-o-lacustre-hall/index.html) */
  trailingSlash: true,

  /* No cPanel (servidor estático), o Next.js não consegue processar 
     otimização de imagens em tempo real. Por isso, definimos como 'unoptimized'.
  */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.lacustre.com.br', // <-- SUBSTITUA pelo domínio real do seu WordPress no cPanel
        pathname: '/wp-content/uploads/**',
      },
      {
        // Mantivemos o localhost caso ainda precise testar localmente
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  /* Opcional: Se o seu projeto estiver numa subpasta no cPanel 
     (ex: meusite.com.br/projeto), adicione a linha abaixo:
     basePath: '/projeto',
  */
};

export default nextConfig;