import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { type FunctionComponent } from 'react'
import NextUiProvider from '@/context/providers/nextui.provider'
import dynamic from 'next/dynamic'
import { Toaster } from 'sonner'
const SWRProvider = dynamic(async () => await import('@/context/providers/swr.provider'), {
  ssr: false
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Buffet UNAHUR'
}

export const viewport: Viewport = {
  themeColor: '#FB5607'
}

interface Props {
  children: React.ReactNode
}

const RootLayout: FunctionComponent<Props> = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body className={outfit.className}>
      <NextUiProvider>
        <SWRProvider>
          <Toaster richColors closeButton={true} position='bottom-left' />
          {children}
        </SWRProvider>
      </NextUiProvider>
    </body>
  </html>
)

export default RootLayout
