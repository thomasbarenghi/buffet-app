import { type Metadata } from 'next'
import Form from './_components/Form'
import AuthMask from '../_components/AuthMask'

export const metadata: Metadata = {
  title: 'Ingresar | Buffet UNAHUR'
}

const LoginPage = () => (
  <AuthMask title='¿Que vamos a comer hoy?' description='Ingresa a tu cuenta' mode='login'>
    <Form />
  </AuthMask>
)

export default LoginPage
