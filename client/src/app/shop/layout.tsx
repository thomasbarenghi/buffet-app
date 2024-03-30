import { Footer, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
