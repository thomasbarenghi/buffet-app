import { type FunctionComponent } from 'react'
import Form from './_components/Form'
import { type Metadata } from 'next'
import AuthMask from '../_components/AuthMask'

export const metadata: Metadata = {
  title: 'Ingresar | Buffet UNAHUR'
}

const LoginPage: FunctionComponent = () => (
  <AuthMask title='¿Que vamos a comer hoy?' description='Ingresa a tu cuenta' mode='login'>
    <Form />
  </AuthMask>
)

export default LoginPage
