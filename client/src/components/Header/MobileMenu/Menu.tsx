'use client'
import { usePathname } from 'next/navigation'
import { menu } from '@/utils/constants'
import { type RawUserMeta, RoleEnum } from '@/interfaces'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { type Dispatch, type SetStateAction } from 'react'
import Link from 'next/link'

interface Props {
  profile: RawUserMeta
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Menu = ({ profile, setIsOpen }: Props) => {
  const pathname = usePathname()
  const role = profile?.role ?? RoleEnum.Customer

  const handleClose = (): void => {
    document.body.style.overflow = ''
    setIsOpen(false)
  }

  return createPortal(
    <div className='fixed bottom-0 left-0 top-0 z-50 grid w-screen lg:grid-cols-[auto,_max(25%,_400px)]'>
      <div
        className='absolute left-0 top-0 z-0 hidden h-full w-full bg-[#00000079]  lg:flex '
        onClick={handleClose}
      ></div>
      <div className='hidden lg:flex'></div>
      <motion.div
        initial={{ opacity: 0, x: '-100vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className='z-[1] flex h-full w-full flex-col items-end justify-start gap-2 overflow-hidden bg-white px-5 py-8 lg:pb-10'
      >
        <div className='flex w-full items-center justify-end'>
          <div className='cursor-pointer p-2' onClick={handleClose}>
            <Image src='/icons/cross.svg' alt='cross' width={18} height={18} />
          </div>
        </div>
        <div className='flex w-full flex-col gap-5 pt-14'>
          {menu[role].map((element, index) => (
            <div key={index}>
              <Link
                className={`w-full text-2xl ${pathname === element.href ? 'font-semibold text-primary' : 'font-light'}`}
                href={element.href}
              >
                {element.title}
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </div>,
    document.body
  )
}

export default Menu
