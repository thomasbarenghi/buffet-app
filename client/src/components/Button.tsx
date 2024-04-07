'use client'
import Link from 'next/link'
import { type ComponentProps } from 'react'
import { Button as ButtonUI } from '@nextui-org/react'

interface CustomProps {
  children?: React.ReactNode
  title?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top' | undefined
}

type DefaultProps = ComponentProps<typeof ButtonUI>
type ExtendedProps = DefaultProps & CustomProps

const Button = ({ ...props }: ExtendedProps) => (
  <ButtonUI
    {...props}
    as={props?.href?.length ? Link : 'button'}
    color={props.color ?? 'primary'}
    variant={props.variant ?? 'solid'}
    size={props.size ?? 'lg'}
    radius={props.radius ?? 'full'}
    className={`!text-sm font-semibold ${props.className ?? ''} `}
    onPress={props.onPress}
  >
    {props.children}
    {props.title}
  </ButtonUI>
)

export default Button
