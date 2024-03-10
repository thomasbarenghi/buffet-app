import { type FunctionComponent } from 'react'
import OnboardingProvider from '@/context/providers/onboarding.provider'

interface Props {
  children: React.ReactNode
}

const GeneralLayout: FunctionComponent<Props> = ({ children }: { children: React.ReactNode }) => (
  <OnboardingProvider>{children}</OnboardingProvider>
)

export default GeneralLayout
