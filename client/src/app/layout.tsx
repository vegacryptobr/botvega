import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VegaChat',
  description: 'Conheça o VegaChat, o seu assistente virtual que vai te ajudar a entender o Real Digital(Drex)! Deixe o VegaChat guiá-lo por uma jornada informativa e empolgante sobre esta inovação do Banco Central do Brasil. Descubra o que é, como funciona e o impacto no cenário financeiro. Deixe-nos ser a sua fonte confiável de informações. Venha explorar o mundo do Drex com o VegaChat hoje mesmo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}