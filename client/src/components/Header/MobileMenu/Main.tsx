'use client'
import dynamic from 'next/dynamic'
import { type RawUserMeta } from '@/interfaces'
import { useState } from 'react'
import Image from 'next/image'
const Menu = dynamic(async () => await import('./Menu'))

interface Props {
  profile: RawUserMeta
}

const MobileMenu = ({ profile }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = async (): Promise<void> => {
    document.body.style.overflow = ''
    setIsOpen(true)
  }

  return (
    <>
      <div className='cursor-pointer sm:hidden' onClick={handleOpen}>
        <Image src='/icons/menu.svg' alt='cart' className='min-w-[24px]' width={24} height={24} />
      </div>
      {isOpen && <Menu setIsOpen={setIsOpen} profile={profile} />}
    </>
  )
}

export default MobileMenu
