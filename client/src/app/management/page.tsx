import { type Metadata } from 'next'
import Content from './_components/Content'
import { getShopStatus } from '@/services/api-server'

export const metadata: Metadata = {
  title: 'Pedidos activos | Administracion | Buffet UNAHUR'
}

const ManagerHome = async () => {
  const shopStatus = await getShopStatus()
  return <Content shopStatus={shopStatus.data?.is_open ?? false} />
}
export default ManagerHome
