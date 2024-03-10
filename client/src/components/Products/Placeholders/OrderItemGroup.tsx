import ProductOrderItemPlaceholder from './OrderItem'

const OrderItemGroup = () => (
  <>
    <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14'>
      <h1 className='text-[18px] font-light '>
        Parece que todavia no hiciste <span className='font-semibold'>ninguna orden 🥸</span>
      </h1>
    </div>
    <ProductOrderItemPlaceholder />
    <ProductOrderItemPlaceholder />
  </>
)

export default OrderItemGroup
