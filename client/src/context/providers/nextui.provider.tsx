'use client'
import { type FunctionComponent } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const NextUiProvider: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
}

export default NextUiProvider
