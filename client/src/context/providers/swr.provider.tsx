'use client'
import { type ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { fetcher } from '@/services/fetcher.service'
import { localStorageProvider } from './localStorage.provider'

interface Props {
  children: ReactNode
}

const SWRProvider = ({ children }: Props) => (
  <SWRConfig value={{ provider: localStorageProvider, fetcher, revalidateOnFocus: true, errorRetryCount: 1 }}>
    {children}
  </SWRConfig>
)

export default SWRProvider
