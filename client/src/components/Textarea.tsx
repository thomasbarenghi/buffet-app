'use client'
import { type ComponentProps } from 'react'
import { Textarea as TextareaUI } from '@nextui-org/react'
import { type RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface CustomProps {
  name: string
  className?: string
  handleChange?: (e: string) => void
  errorMessage?: string
  hookForm?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
    validations?: RegisterOptions
  }
  rows?: number
}

type DefaultProps = ComponentProps<typeof TextareaUI>
type ExtendedProps = DefaultProps & CustomProps

const Textarea = ({ ...props }: ExtendedProps) => {
  const HookForm = props.hookForm?.register(props.name, props.hookForm?.validations)
  return (
    <TextareaUI
      {...HookForm}
      {...props}
      labelPlacement='inside'
      radius={props.radius ?? 'lg'}
      classNames={{
        inputWrapper:
          '!bg-white !text-black shadow-none border px-3 py-2 text-start hover:!bg-gray-100 focus:!bg-white',
        label: 'text-sm font-light leading-[155%]  gap-1 font-normal !text-black',
        errorMessage: 'text-sm font-light leading-[155%] text-red-800',
        input: '!text-black placeholder:!text-gray-400 placeholder:font-light !p-0'
      }}
      onChange={async (e: React.ChangeEvent<HTMLInputElement>) => await HookForm?.onChange(e)}
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      onValueChange={(value: string) => props.handleChange && props?.handleChange(value)}
    />
  )
}

export default Textarea
