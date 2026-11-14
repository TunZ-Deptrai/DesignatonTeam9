import { useState } from 'react'
import { Checkbox } from '../../components/ui/Checkbox'
import { AssetIcon } from '../../components/ui/AssetIcon'
import { CheckoutHeader } from './components/CheckoutHeader'
import { CheckoutFooter } from './components/CheckoutFooter'
import { CheckoutStepper } from './components/CheckoutStepper'
import { CheckoutSummary } from './components/CheckoutSummary'
import { PaymentLogo } from './components/PaymentLogo'
import { paymentMethods, type PaymentDetails } from './data/payment'
import { getCartTotals, formatPrice, type CartProduct } from './data/cart'
import { getShippingFee, type ShippingDetails } from './data/shipping'
import radioDot from '../../assets/checkout/radio-dot.svg'
import info from '../../assets/checkout/info.svg'
import recommendedDot from '../../assets/checkout/recommended-dot.svg'
import './styles/payment.css'

type Props = { items: CartProduct[]; shipping: ShippingDetails; payment: PaymentDetails; onChange: (value: PaymentDetails) => void; onContinue: () => void; onNavigate: (step: 'cart' | 'shipping' | 'payment' | 'review') => void }

export function PaymentPage({ items, shipping, payment, onChange, onContinue, onNavigate }: Props) {
  const [notice, setNotice] = useState('')
  const { quantity, subtotal } = getCartTotals(items)
  const total = subtotal + getShippingFee(shipping.delivery)
  function next() {
    if (!payment.billingSame) { setNotice('A different billing address has not been specified. Please use the shipping address for this demo.'); return }
    onContinue()
  }
  return (
    <div className="checkout-prototype">
      <CheckoutHeader quantity={quantity} onCart={() => onNavigate('cart')} onUnavailable={label => setNotice(`${label} is not available in this preview.`)} />
      <main className="shipping-main payment-main">
        <CheckoutStepper active={2} onCart={() => onNavigate('cart')} onNavigate={onNavigate} />
        <div className="shipping-columns">
          <div className="payment-content">
            <div className="checkout-page-head"><h1 tabIndex={-1}>Payment method</h1><p>All payments are in PHP. Pay with an e-wallet to earn 2x points.</p></div>
            <fieldset className="payment-methods">
              <legend className="shipping-sr-only">Select payment method</legend>
              {paymentMethods.map(option => (
                <div key={option.id} className="payment-method-group">
                  <label className={`payment-option ${payment.method === option.id ? 'is-selected' : ''}`}>
                    <input type="radio" name="payment-method" value={option.id} checked={payment.method === option.id} onChange={() => { onChange({ ...payment, method: option.id }); setNotice('') }} />
                    <span className="payment-option-row">
                      <span className="shipping-radio-mark" aria-hidden="true">{payment.method === option.id && <img src={radioDot} width="12" height="12" alt="" />}</span>
                      <PaymentLogo method={option.id} />
                      <span className="payment-option-copy"><span>{option.label}</span><small>{option.helper}</small></span>
                      {option.id === 'gcash' && <span className="payment-recommended"><img src={recommendedDot} width="12" height="12" alt="" /><span>Recommended</span></span>}
                    </span>
                    {option.id === 'cod' && <span className="payment-cod-note"><AssetIcon src={info} /><span>First COD order up to ₱5,000. A one-time code is sent to your mobile to confirm.</span></span>}
                  </label>
                  {option.id === 'gcash' && payment.method === 'gcash' && <p className="payment-wallet-note">After you place the order, we open GCash so you can approve {formatPrice(total)}. Your order is held for 15 minutes.</p>}
                </div>
              ))}
            </fieldset>
            <Checkbox name="billing-same" checked={payment.billingSame} onChange={event => onChange({ ...payment, billingSame: event.target.checked })} label="Billing address same as shipping" />
            {notice && <p className="checkout-inline-notice" role="status">{notice}</p>}
          </div>
          <CheckoutSummary items={items} shipping={shipping} method={payment.method} label="Continue" onAction={next} />
        </div>
      </main>
      <CheckoutFooter onUnavailable={label => setNotice(`${label} is not available in this preview.`)} />
    </div>
  )
}
