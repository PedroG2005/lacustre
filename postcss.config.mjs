// /Lacustre/lacustre/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adiciona a configuração de imagens
  images: {
    // Permite imagens vindas do seu contêiner WordPress
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;