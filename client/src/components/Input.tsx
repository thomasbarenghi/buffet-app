'use client'
import { type ComponentProps } from 'react'
import { Input as InputUI } from '@nextui-org/react'
import { type RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface CustomProps {
  handleChange?: (e: string) => void
  type: string
  name: string
  isDisabled?: boolean
  isClearable?: boolean
  onClear?: () => void
  errorMessage?: string
  className?: string
  hookForm?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
    validations?: RegisterOptions
  }
  max?: number
  min?: number
}

type DefaultProps = ComponentProps<typeof InputUI>
type ExtendedProps = DefaultProps & CustomProps

const Input = ({ ...props }: ExtendedProps) => {
  const HookForm = props.hookForm?.register(props.name, props.hookForm?.validations)
  return (
    <InputUI
      {...HookForm}
      {...props}
      type={props.type ?? 'text'}
      labelPlacement='inside'
      autoComplete='off'
      radius={props.radius ?? 'lg'}
      classNames={{
        inputWrapper:
          '!bg-white !text-black border shadow-none px-3 py-2 text-start hover:!bg-gray-100 focus:!bg-white',
        // label: 'text-sm font-light leading-[155%]  gap-1 font-normal !text-black',
        errorMessage: 'text-sm font-light leading-[155%] text-red-800',
        input: '!text-black placeholder:!text-gray-400 placeholder:font-light'
      }}
      // eslint-disable-next-line @typescript-eslint/return-await
      onChange={async (e: React.ChangeEvent<HTMLInputElement>) => await HookForm?.onChange(e)}
      onValueChange={(value: string) => {
        props.handleChange && props?.handleChange(value)
      }}
    />
  )
}

export default Input
