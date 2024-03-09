'use client'
import { type FunctionComponent } from 'react'
import { NextUIProvider } from '@nextui-org/react'

interface Props {
  children: React.ReactNode
}

const NextUiProvider: FunctionComponent<Props> = ({ children }) => <NextUIProvider>{children}</NextUIProvider>

export default NextUiProvider
