import { getShopStatus } from '@/services/shop/get-shop-status.service'
import Content from './_components/Content'

const ManagerHome = async () => {
  const shopStatus = await getShopStatus()
  return <Content shopStatus={shopStatus.data?.is_open ?? false} />
}
export default ManagerHome
