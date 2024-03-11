const ProductOrderItemPlaceholder = () => (
  <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4'>
    <div className='flex flex-col gap-1'>
      <div className='flex w-full items-center justify-between'>
        <div className='h-[20px] w-[170px] rounded-full bg-gray-100' />
        <div className='h-[15px] w-[40px] rounded-full bg-gray-100' />
      </div>
      <div className='h-[15px] w-[120px] rounded-full bg-gray-100' />
    </div>
    <div className='flex w-full flex-row items-center gap-3'>
      <div className='relative aspect-square h-auto w-full max-w-[90px]'>
        <div className='absolute left-0 top-0 h-full w-full rounded-2xl bg-gray-100 object-cover' />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <div className='h-[15px] w-[150px] rounded-full bg-gray-100' />
          <div className='h-[15px] w-[200px] rounded-full bg-gray-100' />
        </div>
        <div className='h-[15px] w-[45px] rounded-full bg-gray-100' />
      </div>
    </div>
  </div>
)
export default ProductOrderItemPlaceholder
