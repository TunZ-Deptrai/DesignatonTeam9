import { Button } from '../../../components/ui/Button'
import { AssetIcon } from '../../../components/ui/AssetIcon'
import { assets } from '../assets'
import { shopLinks } from '../data/navigation'

export function CheckoutHeader({ quantity, onUnavailable, onCart }: { quantity: number; onUnavailable: (label: string) => void; onCart?: () => void }) {
  return (
    <header className="checkout-header" data-figma-node="503:11547">
      <div className="checkout-nav">
        <img className="checkout-logo" src={assets.logo} width="169" height="24" alt="MỘC STUDIO" />
        <nav className="checkout-menu" aria-label="Shop">
          {shopLinks.map(label => <Button key={label} onClick={() => onUnavailable(label)}>{label}</Button>)}
        </nav>
        <div className="checkout-header-actions">
          <Button variant="icon" aria-label="Search" onClick={() => onUnavailable('Search')}><AssetIcon src={assets.search} /></Button>
          <Button variant="icon" aria-label="Your account" onClick={() => { window.location.hash = '/account/membership' }}><AssetIcon src={assets.account} /></Button>
          <div className="checkout-cart-icon">
            <Button variant="icon" aria-label={`Your cart, ${quantity} items`} onClick={() => onCart ? onCart() : document.getElementById('cart-title')?.focus()}><AssetIcon src={assets.cart} /></Button>
            <span className="checkout-cart-count" aria-hidden="true">{quantity}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
