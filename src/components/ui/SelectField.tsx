import type { SelectHTMLAttributes } from 'react'
import chevron from '../../assets/checkout/chevron-down.svg'

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: readonly string[] }

export function SelectField({ label, id, options, ...props }: Props) {
  return <label className="shipping-field" htmlFor={id}><span>{label}</span><span className="shipping-field-container"><select id={id} {...props}>{options.map(option => <option key={option} value={option}>{option}</option>)}</select><img src={chevron} width="20" height="20" alt="" aria-hidden="true" /></span></label>
}
