import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { AssetIcon } from '../../components/ui/AssetIcon'
import { assets } from './assets'
import { CheckoutHeader } from './components/CheckoutHeader'
import { CheckoutFooter } from './components/CheckoutFooter'
import { CheckoutStepper } from './components/CheckoutStepper'
import { CheckoutSummary } from './components/CheckoutSummary'
import { CheckoutItems } from './components/CheckoutItems'
import { PaymentLogo } from './components/PaymentLogo'
import { MockPaymentDialog } from './components/MockPaymentDialog'
import { paymentMethods, type PaymentDetails } from './data/payment'
import { getCartTotals, formatPrice, type CartProduct } from './data/cart'
import { getShippingFee, type ShippingDetails } from './data/shipping'
import './styles/payment.css'

type Props = { items: CartProduct[]; shipping: ShippingDetails; payment: PaymentDetails; onChange: (value: PaymentDetails) => void; onSuccess: () => void; onNavigate: (step: 'cart' | 'shipping' | 'payment' | 'review') => void }

export function ReviewPage({ items, shipping, payment, onChange, onSuccess, onNavigate }: Props) {
  const [notice, setNotice] = useState('')
  const [showMock, setShowMock] = useState(false)
  const { quantity, subtotal } = getCartTotals(items)
  const total = subtotal + getShippingFee(shipping.delivery)
  const method = paymentMethods.find(option => option.id === payment.method)!
  const delivery = shipping.delivery === 'standard' ? 'Standard' : 'Express'
  const arrival = shipping.delivery === 'standard' ? 'Arrives 19–22 Nov · Free' : 'Arrives 16–18 Nov · ₱350'
  return <div className="checkout-prototype">
    <CheckoutHeader quantity={quantity} onCart={() => onNavigate('cart')} onUnavailable={label => setNotice(`${label} is not available in this preview.`)} />
    <main className="shipping-main review-main">
      <CheckoutStepper active={3} onCart={() => onNavigate('cart')} onNavigate={onNavigate} />
      <div className="shipping-columns">
        <div className="review-content">
          <div className="checkout-page-head"><h1 tabIndex={-1}>Review your order</h1><p>Check the details below. You can still change anything before you place the order.</p></div>
          <section className="review-card" aria-labelledby="review-shipping-title">
            <div className="review-card-head"><h2 id="review-shipping-title">Shipping to</h2><Button onClick={() => onNavigate('shipping')}>Edit</Button></div>
            <div className="review-address"><p>{shipping.fullName} · {shipping.mobile}</p><p>{shipping.street}, {shipping.barangay}, {shipping.city}, {shipping.province} {shipping.postalCode}</p></div>
            <div className="cart-summary-divider" />
            <div className="review-delivery"><p>{delivery}</p><p>{arrival}</p></div>
          </section>
          <section className="review-card" aria-labelledby="review-payment-title">
            <div className="review-card-head"><h2 id="review-payment-title">Payment</h2><Button onClick={() => onNavigate('payment')}>Edit</Button></div>
            <div className="review-method"><PaymentLogo method={payment.method} /><p>{method.label}{payment.method === 'gcash' || payment.method === 'maya' ? ` · you approve ${formatPrice(total)} in the app` : payment.method === 'cod' ? ' · payment due on delivery' : ''}</p></div>
          </section>
          <section className="review-card review-items" aria-labelledby="review-items-title">
            <div className="review-card-head"><h2 id="review-items-title">Items ({quantity})</h2><Button onClick={() => onNavigate('cart')}>Edit bag</Button></div>
            <CheckoutItems items={items} />
          </section>
          <section className="review-guarantee" aria-labelledby="review-guarantee-title">
            <h2 id="review-guarantee-title"><AssetIcon src={assets.check} />Fit Guarantee · free size exchange within 7 days</h2>
            <p>•  Wrong size? Request an exchange from Orders. We pick it up from your door.</p>
            <p>•  Your new size ships free. No need to wait for a refund.</p>
            <p>•  Unworn, with tags. Change-of-mind returns follow our standard policy.</p>
          </section>
          <Checkbox name="agree-policy" className="review-consent" checked={payment.agreed} onChange={event => onChange({ ...payment, agreed: event.target.checked })} label="I agree to the Terms and the Fit Guarantee & Exchange policy" />
          {notice && <p role="status" className="checkout-inline-notice">{notice}</p>}
        </div>
        <CheckoutSummary items={items} shipping={shipping} method={payment.method} review label="Payment" disabled={!payment.agreed} onAction={() => setShowMock(true)} />
      </div>
    </main>
    <CheckoutFooter onUnavailable={label => setNotice(`${label} is not available in this preview.`)} />
    {showMock && <MockPaymentDialog method={payment.method} total={total} onClose={() => setShowMock(false)} onSuccess={onSuccess} onChangeMethod={() => { setShowMock(false); onNavigate('payment') }} />}
  </div>
}
