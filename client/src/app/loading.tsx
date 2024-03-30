import { CircularProgress } from '@nextui-org/react'

const Loading = () => (
  <section className='relative h-[60vh] w-full'>
    <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center'>
      <CircularProgress color='primary' aria-label='Loading...' />
    </div>
  </section>
)

export default Loading
