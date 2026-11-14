import { useEffect, useRef, useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { formatPrice } from '../data/cart'
import { paymentMethods, type PaymentMethod } from '../data/payment'
import { PaymentLogo } from './PaymentLogo'
import successCheck from '../../../assets/checkout/success-check.svg'

type Props = { method: PaymentMethod; total: number; onClose: () => void; onSuccess: () => void; onChangeMethod: () => void }

export function MockPaymentDialog({ method, total, onClose, onSuccess, onChangeMethod }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [state, setState] = useState<'ready' | 'processing' | 'success'>('ready')
  const processing = state === 'processing'
  const success = state === 'success'
  useEffect(() => {
    const element = dialog.current!
    element.showModal()
    return () => { clearTimeout(timer.current); element.close() }
  }, [])
  function confirmPayment() {
    if (state !== 'ready') return
    setState('processing')
    // Local-only prototype adapter. No gateway request or real transaction is made.
    timer.current = setTimeout(() => {
      setState('success')
      timer.current = setTimeout(onSuccess, 1600)
    }, 900)
  }
  return <dialog ref={dialog} className="mock-payment-dialog" aria-labelledby="mock-payment-title" onCancel={success ? onSuccess : onClose}>
    <p className="payment-dialog-eyebrow">MỘC STUDIO · CHECKOUT</p>
    <h2 id="mock-payment-title">{method === 'cod' ? 'Confirm your order' : 'Confirm your payment'}</h2>
    <div className="payment-dialog-method"><PaymentLogo method={method} /><span>{paymentMethods.find(option => option.id === method)!.label}</span><span className="payment-dialog-change"><Button disabled={processing || success} onClick={onChangeMethod}>Change</Button></span></div>
    <div className="payment-dialog-amount"><span>Order total</span><p className="mock-payment-total">{formatPrice(total)}</p></div>
    <div role="status" aria-live="polite" aria-atomic="true" className={`mock-payment-state${success ? ' is-success' : ''}`}>
      {state === 'ready' && (method === 'cod' ? 'Pay the rider when your order arrives.' : 'Review the total, then confirm to complete your order.')}
      {processing && <><span className="mock-payment-spinner" aria-hidden="true" />{method === 'cod' ? 'Placing your order…' : 'Processing payment…'}</>}
      {success && <><span className="payment-success-check" aria-hidden="true"><img src={successCheck} width="28" height="28" alt="" /></span><span>{method === 'cod' ? 'Order placed successfully!' : 'Payment successful!'}</span></>}
    </div>
    <div className="mock-payment-actions"><Button variant="primary" disabled={processing} onClick={success ? onSuccess : confirmPayment}>{success ? 'View order' : processing ? 'Please wait…' : method === 'cod' ? 'Place order' : 'Confirm payment'}</Button></div>
    {success ? <p className="mock-payment-close payment-success-redirect">Opening your order…</p> : <Button className="mock-payment-close" onClick={onClose}>{processing ? 'Cancel' : 'Back to review'}</Button>}
  </dialog>
}
