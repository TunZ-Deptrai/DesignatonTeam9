import { Button } from '../../../components/ui/Button'
import { AssetIcon } from '../../../components/ui/AssetIcon'
import { assets } from '../assets'
import { formatPrice, getCartTotals, type CartProduct } from '../data/cart'
import { getShippingFee, type ShippingDetails } from '../data/shipping'
import { pointsLabel, type PaymentMethod } from '../data/payment'
import { CheckoutItems } from './CheckoutItems'

type Props = { items: CartProduct[]; shipping: ShippingDetails; method: PaymentMethod; review?: boolean; label: string; onAction: () => void; disabled?: boolean }

export function CheckoutSummary({ items, shipping, method, review = false, label, onAction, disabled }: Props) {
  const { quantity, subtotal } = getCartTotals(items)
  const shippingFee = getShippingFee(shipping.delivery)
  return (
    <aside className="cart-summary shipping-summary checkout-order-summary" aria-labelledby="checkout-summary-title">
      <h2 id="checkout-summary-title">Order summary</h2>
      {!review && <><CheckoutItems items={items} /><div className="cart-summary-divider" /></>}
      <dl className="cart-summary-rows">
        <div><dt>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div><dt>Shipping fee</dt><dd>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</dd></div>
        <div><dt>Points you’ll earn</dt><dd>{pointsLabel(subtotal, method)}</dd></div>
      </dl>
      <div className="cart-summary-divider" />
      <dl className="cart-summary-total"><div><dt>Total</dt><dd key={subtotal + shippingFee} className="cart-summary-amount" aria-live="polite">{formatPrice(subtotal + shippingFee)}</dd></div></dl>
      <Button variant="primary" disabled={disabled || !items.length} onClick={onAction}>{label}</Button>
      <p className="cart-guarantee"><AssetIcon src={assets.check} /><span>Free size exchange within 7 days if it doesn’t fit.</span></p>
    </aside>
  )
}
