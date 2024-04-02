'use client'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const NextUiProvider = ({ children }: Props) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
}

export default NextUiProvider
