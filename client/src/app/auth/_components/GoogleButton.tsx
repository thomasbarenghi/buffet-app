import Image from 'next/image'
import { Button } from '@/components'

interface Props {
  fn: () => void
}

const GoogleButton = ({ fn }: Props) => (
  <Button
    variant='bordered'
    onClick={fn}
    size='lg'
    color='default'
    radius='lg'
    title='Continuar con Google'
    startContent={<Image src='/icons/google.svg' alt='google logo' width={20} height={20} />}
  />
)

export default GoogleButton
