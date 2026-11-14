import { useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { CheckoutHeader } from '../checkout/components/CheckoutHeader'
import { CheckoutFooter } from '../checkout/components/CheckoutFooter'
import memberPattern from '../../assets/account/member-pattern.png'
import memberLogo from '../../assets/account/member-logo.svg'
import clock from '../../assets/account/clock.svg'
import stars from '../../assets/account/stars.svg'
import truck from '../../assets/account/truck.svg'
import gift from '../../assets/account/gift.svg'
import '../checkout/styles/cart.css'
import './membership.css'

const accountLinks = ['Profile & my measurements', 'Membership', 'Orders & exchanges', 'Community', 'Sign out']
const earningOptions = [
  { title: 'Review with a photo and your size', description: 'Helps people like you find their fit', points: '+50 pts', action: 'Write a review' },
  { title: 'Invite a friend', description: 'They get ₱200 off · you earn when they place a first order', points: '+200 pts', action: 'Invite' },
  { title: 'Pay with GCash or Maya', description: 'On every order, no minimum', points: '+50 pts', action: 'Set as default' },
]
const perks = [
  { icon: stars, title: '1.5x points', description: 'From your next order' },
  { icon: truck, title: 'Monthly free delivery', description: 'Next voucher on 1 Dec' },
  { icon: gift, title: 'Birthday gift', description: 'Add your birthday →' },
]

export function MembershipPage({ quantity, onCart }: { quantity: number; onCart: () => void }) {
  const [notice, setNotice] = useState('')
  const noticeRef = useRef<HTMLParagraphElement>(null)

  // Only Membership has a supplied screen. Do not invent account, reward or auth flows.
  function unavailable(label: string) {
    setNotice(`${label} is not available yet.`)
    noticeRef.current?.focus()
  }

  return (
    <div className="checkout-prototype membership-page" data-figma-node="630:12958">
      <CheckoutHeader quantity={quantity} onCart={onCart} onUnavailable={unavailable} />
      <main className="membership-main">
        <aside className="membership-sidebar" aria-label="Your account">
          <div className="membership-greeting"><p>Hi Bea</p><small>Thread member · 640 pts</small></div>
          <nav className="membership-nav" aria-label="Account">
            {accountLinks.map(label => <Button key={label} aria-current={label === 'Membership' ? 'page' : undefined} onClick={() => label === 'Membership' ? document.getElementById('membership-title')?.focus() : unavailable(label)}>{label}</Button>)}
          </nav>
        </aside>
        <div className="membership-content">
          <section className="membership-section" aria-labelledby="membership-title">
            <div className="membership-section-head"><h1 id="membership-title" tabIndex={-1}>Membership</h1><Button className="membership-text-button" disabled>How membership works</Button></div>
            <div className="member-card" data-figma-node="630:12981">
              <img className="member-card-pattern" src={memberPattern} alt="" />
              <div className="member-card-top"><img src={memberLogo} width="139" height="20" alt="MỘC STUDIO" /><Button className="membership-small-button member-history" onClick={() => unavailable('Points history')}><img src={clock} width="20" height="20" alt="" />History</Button></div>
              <div className="member-card-tier"><div><p className="member-tier-name">Thread</p><p className="member-name">Bea Santos</p></div><p className="member-points"><strong>640</strong><span>pts</span></p></div>
              <div className="member-progress">
                <div className="member-progress-labels"><p>₱6,460 more to reach Linen</p><p>Thread until 12 Nov 2027</p></div>
                <div className="member-progress-bar" role="progressbar" aria-label="Progress to Linen" aria-valuemin={0} aria-valuemax={15000} aria-valuenow={8540} aria-valuetext="₱6,460 more to reach Linen"><span /></div>
                <p>Linen adds 2x points and free delivery on every order.</p>
              </div>
            </div>
          </section>
          <section className="membership-section membership-rewards" aria-labelledby="membership-rewards-title">
            <h2 id="membership-rewards-title">Rewards</h2>
            <div className="membership-reward-tabs"><div className="membership-tabs" aria-label="Rewards"><Button aria-current="page" onClick={() => document.getElementById('membership-voucher')?.focus()}>My vouchers (1)</Button><Button onClick={() => unavailable('Redeem points')}>Redeem points</Button></div><Button className="membership-text-button" disabled>Voucher history →</Button></div>
            <div className="membership-voucher" id="membership-voucher" tabIndex={-1} data-figma-node="630:13035"><div><h3>Free delivery</h3><p>On orders of ₱1,500 or more.</p><small>Thread benefit · Valid through 30 Nov 2026</small></div><Button variant="primary" className="membership-small-button" onClick={onCart}>Shop with offer</Button></div>
            <p className="membership-caption">Choose this voucher at checkout.</p>
          </section>
          <section className="membership-section" aria-labelledby="membership-earn-title">
            <h2 id="membership-earn-title">Earn more points</h2>
            <div className="membership-earn-list">{earningOptions.map(option => <div className="membership-earn-row" key={option.title}><div className="membership-earn-copy"><h3>{option.title}</h3><p>{option.description}</p></div><span className="membership-earned-points">{option.points}</span><Button variant="primary" className="membership-small-button" onClick={() => unavailable(option.action)}>{option.action}</Button></div>)}</div>
          </section>
          <section className="membership-section" aria-labelledby="membership-perks-title">
            <div className="membership-section-head"><h2 id="membership-perks-title">Your Thread perks</h2><Button className="membership-text-button" disabled>Compare tiers →</Button></div>
            <div className="membership-perks">{perks.map(perk => <div className="membership-perk" key={perk.title}><img src={perk.icon} width="24" height="24" alt="" /><div><h3>{perk.title}</h3>{perk.icon === gift ? <Button onClick={() => unavailable('Add your birthday')}>{perk.description}</Button> : <p>{perk.description}</p>}</div></div>)}</div>
          </section>
        </div>
        <p className="cart-status" role="status" tabIndex={-1} ref={noticeRef}>{notice}</p>
      </main>
      <CheckoutFooter onUnavailable={unavailable} />
    </div>
  )
}
