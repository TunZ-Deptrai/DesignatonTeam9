import { useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../../components/ui/Button'
import { AssetIcon } from '../../components/ui/AssetIcon'
import { assets } from './assets'
import { getCartTotals, type CartProduct } from './data/cart'
import { CheckoutHeader } from './components/CheckoutHeader'
import { CheckoutFooter } from './components/CheckoutFooter'
import { CartItem } from './components/CartItem'
import { OrderSummary } from './components/OrderSummary'
import './styles/cart.css'

type CartPageProps = {
  items: CartProduct[]
  onItemsChange: Dispatch<SetStateAction<CartProduct[]>>
  onCheckout: () => void
}

export function CartPage({ items, onItemsChange: setItems, onCheckout }: CartPageProps) {
  const [message, setMessage] = useState('')
  const messageRef = useRef<HTMLParagraphElement>(null)
  const { quantity, subtotal } = getCartTotals(items)

  function unavailable(label: string) {
    setMessage(`${label} is not available in this Cart preview.`)
    messageRef.current?.focus()
  }

  function updateQuantity(id: string, delta: number) {
    setItems(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    setMessage('')
  }

  function removeItem(id: string) {
    setItems(current => current.filter(item => item.id !== id))
    setMessage('Item removed from your cart.')
    document.getElementById('cart-title')?.focus()
  }

  return (
    <div className="checkout-prototype">
      <CheckoutHeader quantity={quantity} onUnavailable={unavailable} />
      <main className="cart-main" data-figma-node="503:11548">
        <nav className="cart-breadcrumb" aria-label="Breadcrumb"><span>Home / Product Detail</span></nav>
        <div className="cart-title-row">
          <h1 id="cart-title" tabIndex={-1}>Your cart</h1>
          <Button className="cart-continue" aria-disabled="true" onClick={() => unavailable('Continue shopping')}><AssetIcon src={assets.arrowLeft} />Continue shopping</Button>
        </div>
        <div className="cart-columns">
          <section className="cart-items" aria-label="Items in your cart">
            {items.map(item => <CartItem key={item.id} item={item} onQuantity={updateQuantity} onRemove={removeItem} onUnavailable={unavailable} />)}
            {items.length === 0 && <p className="cart-empty" role="status">Your cart is empty.</p>}
          </section>
          <OrderSummary quantity={quantity} subtotal={subtotal} onCheckout={onCheckout} />
        </div>
        <p ref={messageRef} className="cart-status" role="status" tabIndex={-1}>{message}</p>
      </main>
      <CheckoutFooter onUnavailable={unavailable} />
    </div>
  )
}
