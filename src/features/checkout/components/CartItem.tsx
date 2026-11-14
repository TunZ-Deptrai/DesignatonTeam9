import { Button } from '../../../components/ui/Button'
import { AssetIcon } from '../../../components/ui/AssetIcon'
import { assets } from '../assets'
import { formatPrice, type CartProduct } from '../data/cart'

type CartItemProps = {
  item: CartProduct
  onQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
  onUnavailable: (label: string) => void
}

export function CartItem({ item, onQuantity, onRemove, onUnavailable }: CartItemProps) {
  return (
    <article className="cart-item" data-product-id={item.id} aria-label={item.name}>
      <div className="cart-item-image">
        <img src={item.imageBase} width="120" height="120" alt="" aria-hidden="true" />
        <img src={item.image} width="120" height="120" alt={item.name} />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-name-row">
          <h2>{item.name}</h2>
          <p className="cart-item-price">{formatPrice(item.priceCentavos)}</p>
        </div>
        <p className="cart-item-options">{item.color} · Size {item.size}</p>
        <span className="cart-fit-badge"><AssetIcon src={assets.fitCheck} size={12} /><span>Fit check · M fits you</span></span>
        <div className="cart-item-bottom">
          <div className="cart-item-actions">
            <div className="cart-quantity" role="group" aria-label={`Quantity for ${item.name}`}>
              <Button aria-label={`Decrease quantity of ${item.name}`} aria-disabled={item.quantity === 1} onClick={() => onQuantity(item.id, -1)}>−</Button>
              <output key={item.quantity} className="cart-quantity-value" aria-label={`${item.name} quantity`}>{item.quantity}</output>
              <Button aria-label={`Increase quantity of ${item.name}`} onClick={() => onQuantity(item.id, 1)}>+</Button>
            </div>
            <Button className="cart-change-size" aria-disabled="true" title="Size selection is not included in this Cart preview." onClick={() => onUnavailable('Change size')}>Change size</Button>
          </div>
          <Button className="cart-remove" aria-label={`Remove ${item.name}`} onClick={() => onRemove(item.id)}><AssetIcon src={assets.close} /><span>Remove</span></Button>
        </div>
      </div>
    </article>
  )
}
