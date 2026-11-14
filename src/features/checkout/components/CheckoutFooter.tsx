import { Button } from '../../../components/ui/Button'
import { assets } from '../assets'
import { shopLinks } from '../data/navigation'

const groups = [
  { name: 'Shop', links: shopLinks },
  { name: 'Customer care', links: ['Fit Guarantee & exchanges', 'Shipping & payment', 'Track your order', 'Size guide', 'FAQs'] },
  { name: 'Contact', links: ['hello@moc.studio', 'Live on Shopee & TikTok', 'Social: Viber & Instagram'] },
]

export function CheckoutFooter({ onUnavailable }: { onUnavailable: (label: string) => void }) {
  return (
    <footer className="checkout-footer" data-figma-node="503:11578">
      <div className="checkout-footer-main">
        <div className="checkout-footer-brand">
          <img src={assets.logo} width="226" height="32" alt="MỘC STUDIO" />
          <p>Vietnamese linen, cut and sewn by our team in Vietnam. Shipped to Manila.</p>
          <div className="checkout-socials" aria-label="Social channels">
            <Button className="social-viber" aria-label="Viber" onClick={() => onUnavailable('Viber')}><span><img src={assets.viber} alt="" /></span></Button>
            <Button className="social-shopee" aria-label="Shopee" onClick={() => onUnavailable('Shopee')}><span><img src={assets.shopee} alt="" /></span></Button>
            <Button className="social-tiktok" aria-label="TikTok" onClick={() => onUnavailable('TikTok')}><img src={assets.tiktok} width="48" height="48" alt="" /></Button>
            <Button className="social-instagram" aria-label="Instagram" onClick={() => onUnavailable('Instagram')}><img src={assets.instagram} width="20" height="20" alt="" /></Button>
          </div>
          <p>Made in Vietnam. Worn in Manila.</p>
        </div>
        <div className="checkout-footer-groups">
          {groups.map(group => (
            <section key={group.name} aria-label={group.name}>
              <h2>{group.name}</h2>
              {group.links.map(label => label === 'hello@moc.studio'
                ? <a key={label} href="mailto:hello@moc.studio">{label}</a>
                : <Button key={label} onClick={() => onUnavailable(label)}>{label}</Button>)}
            </section>
          ))}
        </div>
      </div>
      <div className="checkout-footer-legal">
        <div className="checkout-footer-divider" />
        <div className="checkout-footer-legal-row">
          <p>© 2026 MỘC STUDIO. All rights reserved.</p>
          <Button onClick={() => onUnavailable('Privacy Policy')}>Privacy Policy</Button>
          <Button onClick={() => onUnavailable('Terms & Conditions')}>Terms &amp; Conditions</Button>
          <span>Philippines · English</span>
        </div>
      </div>
    </footer>
  )
}
