import Form from './_components/Form'
import { type Metadata } from 'next'
import AuthMask from '../_components/AuthMask'

export const metadata: Metadata = {
  title: 'Registro | Buffet'
}

const RegisterPage = () => (
  <AuthMask title='¿Que estabas esperando?' description='Mejorá tu forma de comer' mode='register'>
    <Form />
  </AuthMask>
)

export default RegisterPage
