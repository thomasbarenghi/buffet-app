import ProductOrderItemPlaceholder from './Item'

interface Props {
  title?: JSX.Element
}

const Default = () => (
  <h1 className='text-center text-[18px] font-light'>
    Parece que todavia no hiciste <span className='font-semibold'>ninguna orden 🥸</span>
  </h1>
)

const OrderItemGroup = ({ title = <Default /> }: Props) => (
  <>
    <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14'>
      {title}
    </div>
    <ProductOrderItemPlaceholder />
    <ProductOrderItemPlaceholder />
  </>
)

export default OrderItemGroup
