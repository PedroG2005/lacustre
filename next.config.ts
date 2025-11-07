// /Lacustre/lacustre/next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
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
}

export default config