import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VegaChat',
  description: 'VegaChat é o seu assistente virtual que te ajudar a entender o Real Digital (Drex)! Deixe o VegaChat guiá-lo por uma jornada informativa e empolgante sobre esta inovação do Banco Central do Brasil. Descubra o que é, como funciona e o impacto no cenário financeiro. Deixe-nos ser a sua fonte confiável de informações. Venha explorar o mundo do Drex com o VegaChat hoje mesmo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">

      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}