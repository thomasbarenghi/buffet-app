import { type RegisterOptions, type ValidationRule } from 'react-hook-form'

export const required: ValidationRule<boolean> = { value: true, message: 'Este campo es requerido' }

export type UserValidations = 'firstName' | 'lastName' | 'email' | 'password' | 'dni'

export const userValidations: Record<UserValidations, RegisterOptions> = {
  firstName: {
    required,
    minLength: {
      value: 3,
      message: 'Debe tener al menos 3 caracteres'
    },
    maxLength: {
      value: 25,
      message: 'Debe tener máximo 25 caracteres'
    }
  },
  lastName: {
    required,
    minLength: {
      value: 3,
      message: 'Debe tener al menos 3 caracteres'
    },
    maxLength: {
      value: 25,
      message: 'Debe tener máximo 25 caracteres'
    }
  },
  email: {
    required,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido'
    }
  },
  password: {
    required,
    minLength: {
      value: 6,
      message: 'Debe tener al menos 6 caracteres'
    },
    maxLength: {
      value: 25,
      message: 'Debe tener máximo 25 caracteres'
    }
  },
  dni: {
    required,
    minLength: {
      value: 6,
      message: 'Debe tener al menos 6 números'
    },
    maxLength: {
      value: 9,
      message: 'No debe tener mas de 8 números'
    },
    valueAsNumber: true
  }
}

export type ProductValidations = 'title' | 'description' | 'price' | 'thumbnail'

export const productValidations: Record<ProductValidations, RegisterOptions> = {
  title: {
    required,
    maxLength: {
      value: 50,
      message: 'Máximo 50 carácteres'
    }
  },
  description: {
    required,
    maxLength: {
      value: 400,
      message: 'Máximo 400 carácteres'
    }
  },
  price: {
    required,
    min: {
      value: 10,
      message: 'Debe valer al menos $10'
    },
    valueAsNumber: true
  },
  thumbnail: {
    required
  }
}
