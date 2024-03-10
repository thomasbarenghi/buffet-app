import { type RegisterOptions, type ValidationRule } from 'react-hook-form'

export const required: ValidationRule<boolean> = { value: true, message: 'Este campo es requerido' }

export const emailValidations: RegisterOptions = {
  required,
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido'
  }
}

export const passwordValidations: RegisterOptions = {
  required,
  minLength: {
    value: 6,
    message: 'Debe tener al menos 6 caracteres'
  },
  maxLength: {
    value: 25,
    message: 'Debe tener máximo 25 caracteres'
  }
}

export const nameValidations: Record<string, RegisterOptions> = {
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
  }
}

export const birthdateValidations: RegisterOptions = {
  required
}

export const firstNameValidations: RegisterOptions = {
  required
}

export const lastNameValidations: RegisterOptions = {
  required
}

export const addressValidations: RegisterOptions = {
  required
}

export type ProductValidations = 'name' | 'description' | 'price' | 'thumbnail'

export const productValidations: Record<ProductValidations, RegisterOptions> = {
  name: {
    required
  },
  description: {
    required
  },
  price: {
    required
  },
  thumbnail: {
    required
  }
}

export type ShopValidations = 'name' | 'description' | 'address' | 'phone' | 'thumbnail'

export const shopValidations: Record<ShopValidations, RegisterOptions> = {
  name: {
    required
  },
  description: {
    required
  },
  address: {
    required
  },
  phone: {
    required
  },
  thumbnail: {
    required
  }
}
