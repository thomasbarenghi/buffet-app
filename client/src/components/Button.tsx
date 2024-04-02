'use client'
import { Button as ButtonUI } from '@nextui-org/react'
import Link from 'next/link'
import { type ComponentProps } from 'react'

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
    target={props.target}
    as={props?.href?.length ? Link : 'button'}
    href={props?.href ?? ''}
    color={props.color ?? 'primary'}
    variant={props.variant ?? 'solid'}
    size={props.size ?? 'lg'}
    type={props.type}
    radius={props.radius ?? 'lg'}
    fullWidth={props.fullWidth}
    isDisabled={props.isDisabled}
    isLoading={props.isLoading}
    className={`!text-sm font-semibold ${props.className ?? ''} `}
    onPress={props.onClick}
  >
    {props.startContent}
    {props.children}
    {props.title}
    {props.endContent}
  </ButtonUI>
)

export default Button
