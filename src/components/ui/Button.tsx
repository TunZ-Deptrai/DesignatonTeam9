import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'text' | 'icon'
}

export function Button({ variant = 'text', className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`moc-button moc-button--${variant} ${className}`} {...props} />
}
