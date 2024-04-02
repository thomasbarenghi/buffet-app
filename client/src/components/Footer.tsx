import { routes } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => (
  <footer className='resp-pad-x  flex min-h-[250px] justify-center border border-t py-10'>
    <div className='flex w-full flex-col items-start justify-center gap-3 2xl:container'>
      <div className='flex items-center gap-4'>
        <Link href={routes.customer.HOME}>
          <Image src='/icons/logo.svg' width={103} height={30} alt='logo' />
        </Link>
        <Image src='/images/unahur-logo.png' width={27} height={30} alt='logo' />
      </div>
      <span className='text-sm font-light'>
        Por alumnos de la UNAHUR, <span className='font-semibold'>para alumnos de la UNAHUR.</span>
      </span>
    </div>
  </footer>
)

export default Footer
