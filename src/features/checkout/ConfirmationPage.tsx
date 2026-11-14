import { useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { AssetIcon } from '../../components/ui/AssetIcon'
import { CheckoutHeader } from './components/CheckoutHeader'
import { CheckoutFooter } from './components/CheckoutFooter'
import { CheckoutItems } from './components/CheckoutItems'
import { assets } from './assets'
import { formatPrice, getCartTotals } from './data/cart'
import { getShippingFee } from './data/shipping'
import { pointsLabel } from './data/payment'
import type { OrderReceipt } from './data/order'
import messenger from '../../assets/checkout/messenger.png'
import successCheck from '../../assets/checkout/success-check.svg'
import packingDot from '../../assets/checkout/packing-dot.svg'
import arrowRight from '../../assets/checkout/arrow-right.svg'
import './styles/confirmation.css'

export function ConfirmationPage({ receipt, onContinueShopping }: { receipt: OrderReceipt; onContinueShopping: () => void }) {
  const [notice, setNotice] = useState('')
  const [showTracking, setShowTracking] = useState(false)
  const tracking = useRef<HTMLElement>(null)
  const { items, shipping, payment } = receipt
  const { quantity, subtotal } = getCartTotals(items)
  const shippingFee = getShippingFee(shipping.delivery)
  const firstName = shipping.fullName.trim().split(/\s+/)[0] || 'friend'
  const hasPoints = pointsLabel(subtotal, payment.method).startsWith('+928')
  const connect = (name: string) => setNotice(`${name} is not connected yet.`)

  return <div className="checkout-prototype">
    <CheckoutHeader quantity={quantity} onCart={onContinueShopping} onUnavailable={connect} />
    <main className="confirmation-main" data-figma-node="503:11893">
      <div className="confirmation-content">
        <div className="confirmation-success"><span className="confirmation-success-icon"><img src={successCheck} width="28" height="28" alt="" /></span></div>
        <div className="confirmation-heading">
          <p className="confirmation-order-id">Order #{receipt.id}</p>
          <h1 tabIndex={-1}>Salamat, {firstName}! Your order is confirmed.</h1>
          <p className="confirmation-subtitle">{payment.method === 'cod' ? `Your order is confirmed. Pay ${formatPrice(subtotal + shippingFee)} when it arrives.` : `Your payment is complete. Your linen is being packed in our Hội An studio.`}</p>
        </div>
        <section className="confirmation-card confirmation-delivery" ref={tracking} aria-labelledby="delivery-title" tabIndex={-1}>
          <div className="confirmation-delivery-head"><div><p id="delivery-title">Estimated delivery</p><h2>{shipping.delivery === 'standard' ? 'Thu 19 – Sun 22 Nov' : 'Mon 16 – Wed 18 Nov'}</h2></div><span className="confirmation-packing"><img src={packingDot} width="12" height="12" alt="" /><span>Packing</span></span></div>
          <ol className="confirmation-timeline" aria-label="Order progress">
            {['Confirmed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'].map((label, index) => <li key={label} className={index < 2 ? 'is-complete' : ''} aria-current={index === 1 ? 'step' : undefined}><span>{label}</span><span className="confirmation-progress-bar" /></li>)}
          </ol>
          {showTracking && <div className="confirmation-tracking-details"><p>{shipping.fullName} · {shipping.mobile}</p><p>{shipping.street}, {shipping.barangay}, {shipping.city}, {shipping.province} {shipping.postalCode}</p><p>{shipping.delivery === 'standard' ? 'Standard' : 'Express'} · {payment.method === 'cod' ? 'Cash on delivery' : 'Payment complete'}</p></div>}
        </section>
        <section className="confirmation-card confirmation-updates" aria-label="Messenger updates">
          <img src={messenger} width="40" height="40" alt="Messenger" />
          <div><h2>Get updates on Messenger</h2><p>Tracking, delivery day and a quick fit check after 3 days.</p></div>
          <Button className="confirmation-outline" onClick={() => connect('Messenger')}>Connect</Button>
        </section>
        {notice && <p className="confirmation-notice" role="status">{notice}</p>}
      </div>
      <div className="confirmation-side">
        <aside className="cart-summary shipping-summary confirmation-summary" aria-labelledby="confirmation-summary-title">
          <h2 id="confirmation-summary-title">Order summary</h2>
          <CheckoutItems items={items} />
          <div className="cart-summary-divider" />
          <dl className="cart-summary-rows"><div><dt>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</dt><dd>{formatPrice(subtotal)}</dd></div><div><dt>Shipping fee</dt><dd>{shippingFee ? formatPrice(shippingFee) : 'Free'}</dd></div></dl>
          <div className="cart-summary-divider" />
          <dl className="cart-summary-total"><div><dt>Total</dt><dd>{formatPrice(subtotal + shippingFee)}</dd></div></dl>
          <p className="cart-guarantee"><AssetIcon src={assets.check} /><span>Free size exchange within 7 days if it doesn’t fit.</span></p>
        </aside>
        <div className="confirmation-actions"><Button className="confirmation-outline" onClick={() => { setShowTracking(value => !value); tracking.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); tracking.current?.focus({ preventScroll: true }) }}>Track order</Button><Button onClick={onContinueShopping}>Continue shopping<AssetIcon src={arrowRight} /></Button></div>
        <section className="confirmation-save" aria-labelledby="save-fit-title">
          <p className="confirmation-save-label">GUEST CHECKOUT</p>
          <h2 id="save-fit-title">Save your fit &amp; earn points</h2>
          <p>Create an account in one tap. Keep your size M profile for next time{hasPoints ? ' and get 928 pts for this order.' : '.'}</p>
          <p className="confirmation-benefit"><AssetIcon src={assets.check} />Your fit profile, saved</p>
          <p className="confirmation-benefit"><AssetIcon src={assets.check} />{hasPoints ? '928 pts → Seed member' : 'Keep your orders in one place'}</p>
          <p className="confirmation-benefit"><AssetIcon src={assets.check} />Exchange sizes from your account</p>
          <Button variant="primary" onClick={() => connect('Account registration')}>Collect</Button>
          <Button className="confirmation-facebook" onClick={() => connect('Facebook sign-in')}>Continue with Facebook</Button>
        </section>
      </div>
    </main>
    <CheckoutFooter onUnavailable={connect} />
  </div>
}
