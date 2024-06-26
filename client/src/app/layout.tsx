import './globals.css'
import dynamic from 'next/dynamic'
import { Outfit } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Toaster } from 'sonner'
const NextUiProvider = dynamic(async () => await import('@/context/providers/nextui.provider'))
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

const RootLayout = ({ children }: Props) => (
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
