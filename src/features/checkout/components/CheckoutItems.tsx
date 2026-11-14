import { formatPrice, type CartProduct } from '../data/cart'
import shirtBackground from '../../../assets/checkout/summary-shirt-background.png'
import pantsBackground from '../../../assets/checkout/summary-pants-background.png'

export function CheckoutItems({ items }: { items: CartProduct[] }) {
  return <>{items.map(item => (
    <div className="shipping-summary-item" key={item.id}>
      <div className={`shipping-summary-image ${item.id === 'ilaya-shirt' ? 'is-shirt' : ''}`} style={{ backgroundImage: `url(${item.id === 'ilaya-shirt' ? shirtBackground : pantsBackground})` }}><img src={item.image} width={item.id === 'ilaya-shirt' ? 70 : 56} height="70" alt={item.name} /></div>
      <div className="shipping-summary-item-copy"><p>{item.name}</p><small>{item.color} · {item.size}{item.id === 'ilaya-shirt' ? ' · Your fit' : ''}{item.quantity > 1 ? ` · Qty ${item.quantity}` : ''}</small></div>
      <span>{formatPrice(item.priceCentavos * item.quantity)}</span>
    </div>
  ))}</>
}
