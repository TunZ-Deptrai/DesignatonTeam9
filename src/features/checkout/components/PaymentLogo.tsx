import { paymentMethods, type PaymentMethod } from '../data/payment'

export function PaymentLogo({ method }: { method: PaymentMethod }) {
  const option = paymentMethods.find(item => item.id === method)!
  return <span className={`payment-logo payment-logo--${method}`}><img src={option.image} alt={option.label} /></span>
}
