import type { InputHTMLAttributes } from 'react'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  dropdownIcon?: string
}

export function FormField({ label, id, dropdownIcon, ...props }: FormFieldProps) {
  return (
    <label className="shipping-field" htmlFor={id}>
      <span>{label}</span>
      <span className="shipping-field-container">
        <input id={id} {...props} />
        {dropdownIcon && <img src={dropdownIcon} width="20" height="20" alt="" aria-hidden="true" />}
      </span>
    </label>
  )
}
