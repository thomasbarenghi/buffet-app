'use client'
import { useRouter } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/react'

interface Props {
  children: React.ReactNode
}

const NextUiProvider = ({ children }: Props) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
}

export default NextUiProvider
