import Content from './_components/Content'

const ManagerHome = async () => (
  <div className='flex w-full flex-col gap-4'>
    <h1 className='text-[24px] font-medium leading-tight'>Pedidos activos</h1>
    <Content />
  </div>
)

export default ManagerHome
