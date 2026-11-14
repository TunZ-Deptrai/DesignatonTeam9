import type { InputHTMLAttributes } from 'react'
import check from '../../assets/checkout/checkbox-check.svg'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string; className?: string }

export function Checkbox({ label, className = '', ...props }: Props) {
  return <label className={`checkout-checkbox ${className}`}><input type="checkbox" {...props} /><span className="checkout-checkbox-mark" aria-hidden="true">{props.checked && <img src={check} width="14" height="14" alt="" />}</span><span>{label}</span></label>
}
