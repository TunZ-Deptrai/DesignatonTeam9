import { Button } from '../../../components/ui/Button'
import { AssetIcon } from '../../../components/ui/AssetIcon'
import { assets } from '../assets'
import { formatPrice } from '../data/cart'

export function OrderSummary({ quantity, subtotal, onCheckout }: { quantity: number; subtotal: number; onCheckout: () => void }) {
  return (
    <aside className="cart-summary" aria-labelledby="summary-title" data-figma-node="503:11561">
      <h2 id="summary-title">Order summary</h2>
      <dl className="cart-summary-rows">
        <div><dt>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</dt><dd className="cart-summary-amount" key={`subtotal-${subtotal}`}>{formatPrice(subtotal)}</dd></div>
        <div><dt>Shipping fee</dt><dd>Free</dd></div>
      </dl>
      <div className="cart-summary-divider" />
      <dl className="cart-summary-total"><div><dt>Total</dt><dd className="cart-summary-amount" key={`total-${subtotal}`} aria-live="polite" aria-atomic="true">{formatPrice(subtotal)}</dd></div></dl>
      <Button variant="primary" className="cart-checkout" disabled={quantity === 0} onClick={onCheckout}>Checkout</Button>
      <p className="cart-guarantee"><AssetIcon src={assets.check} /><span>Free size exchange within 7 days if it doesn’t fit.</span></p>
    </aside>
  )
}
