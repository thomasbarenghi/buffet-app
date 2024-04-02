'use client'
import { SWRConfig } from 'swr'
import { fetcher } from '@/services/fetcher.service'
import { localStorageProvider } from './localStorage.provider'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const SWRProvider = ({ children }: Props) => (
  <SWRConfig value={{ provider: localStorageProvider, fetcher, revalidateOnFocus: true, errorRetryCount: 1 }}>
    {children}
  </SWRConfig>
)

export default SWRProvider
