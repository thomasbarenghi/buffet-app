'use client'
import { SWRConfig } from 'swr'
import { fetcher } from '@/services/fetcher.service'
import { localStorageProvider } from './localStorage.provider'
import { type ReactNode, type FunctionComponent } from 'react'

interface Props {
  children: ReactNode
}

const SWRProvider: FunctionComponent<Props> = ({ children }) => (
  <SWRConfig value={{ provider: localStorageProvider, fetcher, revalidateOnFocus: true, errorRetryCount: 1 }}>
    {children}
  </SWRConfig>
)

export default SWRProvider
