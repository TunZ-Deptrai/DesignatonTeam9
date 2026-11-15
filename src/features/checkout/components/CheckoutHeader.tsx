import { Button } from '../../../components/ui/Button'
import { AssetIcon } from '../../../components/ui/AssetIcon'
import { assets } from '../assets'
import { shopLinks } from '../data/navigation'

export function CheckoutHeader({ quantity, onUnavailable, onCart, onHomeSection }: { quantity: number; onUnavailable: (label: string) => void; onCart?: () => void; onHomeSection?: (section: 'fit' | 'collection') => void }) {
  function navigateShop(label: string) {
    if (label === 'Shirts') { window.location.hash = '/shirts'; return }
    if (label === 'Find my fit' || label === 'New collection') {
      const section = label === 'Find my fit' ? 'fit' : 'collection'
      if (onHomeSection) onHomeSection(section)
      else window.location.hash = `/home/${section}`
      return
    }
    onUnavailable(label)
  }
  return (
    <header className="checkout-header" data-figma-node="503:11547">
      <div className="checkout-nav">
        <a className="checkout-home-link" href="#/" aria-label="MỘC STUDIO home"><img className="checkout-logo" src={assets.logo} width="169" height="24" alt="MỘC STUDIO" /></a>
        <nav className="checkout-menu" aria-label="Shop">
          {shopLinks.map(label => <Button key={label} aria-current={label === 'Shirts' && window.location.hash === '#/shirts' ? 'page' : undefined} onClick={() => navigateShop(label)}>{label}</Button>)}
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
