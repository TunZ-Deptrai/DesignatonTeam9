import { useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { CheckoutHeader } from '../checkout/components/CheckoutHeader'
import { FitFinderDialog } from './FitFinderDialog'
import { gallery, shirtAssets, skinTones } from './assets'
import { sampleFitResult, shirtColors, shirtSizes, type FitProfile, type ShirtSelection } from './data'
import '../checkout/styles/cart.css'
import '../checkout/styles/shipping.css'
import './shirts.css'

type Props = {
  quantity: number
  profile: FitProfile | null
  onProfileChange: (value: FitProfile) => void
  onAdd: (selection: ShirtSelection, buyNow: boolean) => void
  onCart: () => void
}

export function ShirtsPage({ quantity, profile, onProfileChange, onAdd, onCart }: Props) {
  const [photo, setPhoto] = useState(1)
  const [size, setSize] = useState(profile ? sampleFitResult.size : 'XS')
  const [color, setColor] = useState(0)
  const [count, setCount] = useState(1)
  const [fitOpen, setFitOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const noticeRef = useRef<HTMLParagraphElement>(null)
  const fitTrigger = useRef<HTMLButtonElement>(null)

  function announce(message: string) {
    setNotice(message)
    noticeRef.current?.focus()
  }

  function addToCart(buyNow: boolean, selectedSize = size) {
    onAdd({ size: selectedSize, color, quantity: count }, buyNow)
    if (!buyNow) announce(`${count} Red Linen Shirt${count > 1 ? 's' : ''} added to your cart.`)
  }

  function closeFit() {
    setFitOpen(false)
    fitTrigger.current?.focus({ preventScroll: true })
  }

  return <div className="checkout-prototype shirts-page">
    <CheckoutHeader quantity={quantity} onCart={onCart} onUnavailable={label => announce(`${label} is not available in this preview.`)} />
    <main className="shirts-main" data-figma-node={profile ? '729:10094' : '729:9796'}>
      <div className="shirts-product-section">
        <nav className="shirts-breadcrumb" aria-label="Breadcrumb"><span>Shirts / </span><strong>Red Linen Shirt</strong></nav>
        <div className="shirts-product-grid">
          <div className="shirts-gallery" aria-label="Product photos">
            <div className="shirts-main-photo"><img src={gallery[photo].src} alt={gallery[photo].alt} /></div>
            <div className="shirts-thumbnails">{gallery.map((item, index) => <Button key={item.src} className={`shirts-thumbnail${photo === index ? ' is-selected' : ''}`} aria-label={`View ${item.alt.toLowerCase()}`} aria-pressed={photo === index} onClick={() => setPhoto(index)}><img src={item.src} width="88" height="110" alt="" /></Button>)}</div>
          </div>
          <div className="shirts-buy-box">
            <div className="shirts-title-rating"><h1 tabIndex={-1}>Red Linen Shirt</h1><p className="shirts-rating"><img src={shirtAssets.star} width="12" height="12" alt="" />4.8 from 248 reviews</p></div>
            <p className="shirts-price">₱2,450</p>
            <div className="shirts-variants">
              <fieldset className="shirts-color"><legend>Available color</legend><div className="shirts-swatches"><img src={shirtAssets.swatches} width="144" height="24" alt="" />{shirtColors.map((name, index) => <button key={name} type="button" aria-label={`${name} color`} aria-pressed={color === index} className={color === index ? 'is-selected' : ''} onClick={() => setColor(index)} />)}</div></fieldset>
              <fieldset className="shirts-sizes"><legend className="shipping-sr-only">Size</legend><div className="shirts-size-label"><span>Size</span><Button onClick={() => announce('Size chart is not available in this preview.')}>Size chart</Button></div><div className="shirts-size-options">{shirtSizes.map(value => <Button key={value} className="shirts-size-chip" aria-label={`Size ${value}`} aria-pressed={size === value} onClick={() => setSize(value)}>{value}</Button>)}</div></fieldset>
              <div className="shirts-quantity"><span>Quantity</span><div><Button aria-label="Decrease quantity" disabled={count <= 1} onClick={() => setCount(value => Math.max(1, value - 1))}><img src={shirtAssets.minus} width="24" height="24" alt="" /></Button><output aria-live="polite">{count}</output><Button aria-label="Increase quantity" onClick={() => setCount(value => value + 1)}><img src={shirtAssets.plus} width="24" height="24" alt="" /></Button></div></div>
            </div>
            {profile ? <section className="shirts-fit-card shirts-saved-fit" aria-label="Your saved fit">
              <div className="shirts-saved-heading"><h2>Your size: {sampleFitResult.size}</h2><Button ref={fitTrigger} onClick={() => setFitOpen(true)}>Edit</Button></div>
              <div className="shirts-saved-body"><div className="shirts-saved-values"><dl><div><dt>Height</dt><dd>{profile.height}cm</dd></div><div><dt>Weight</dt><dd>{profile.weight}kg</dd></div></dl><dl><div><dt>Bust</dt><dd>{profile.bust}cm</dd></div><div><dt>Waist</dt><dd>{profile.waist}cm</dd></div><div><dt>Hips</dt><dd>{profile.hips}cm</dd></div></dl><div className="shirts-saved-skin"><span>Skin tone</span><span className="shirts-small-skin" aria-label={skinTones[profile.skinTone].name}>{profile.skinTone === 3 ? <img src={shirtAssets.savedTan} width="12" height="12" alt="" /> : <span><img src={skinTones[profile.skinTone].image} width="40" height="40" alt="" /></span>}</span></div></div><div className="shirts-body-shape"><img src={shirtAssets.bodyShape} alt="Sample apple body shape illustration" /></div></div>
            </section> : <section className="shirts-fit-card shirts-try-fit"><div><h2>Not sure how it fits?</h2><p>See how it fits on your body before you buy.</p></div><Button ref={fitTrigger} className="shirts-try-button" onClick={() => setFitOpen(true)}>Try now</Button></section>}
            <div className="shirts-ctas"><Button variant="primary" onClick={() => addToCart(true)}>Buy now</Button><Button className="shirts-button-outline" onClick={() => addToCart(false)}>Add to cart</Button></div>
            <ul className="shirts-guarantees">{[
              ['Free size exchange within 7 days', 'We pick up the old size in Metro Manila.'],
              ['Ships from Manila · arrives 19–22 Nov', 'Free duties'],
              ['Pay your way', 'GCash · Maya · Card · Cash on delivery'],
            ].map(([title, helper]) => <li key={title}><img src={shirtAssets.check} width="20" height="20" alt="" /><div><p>{title}</p><small>{helper}</small></div></li>)}</ul>
          </div>
        </div>
      </div>
      <section className="shirts-info" aria-label="Product information"><div className="shirts-info-tabs"><Button className="is-selected" aria-current="true">Details</Button><Button onClick={() => announce('4.8 from 248 reviews. Detailed reviews are not available in this preview.')}>Reviews</Button></div><div className="shirts-description"><div><h2>Natural texture. Everyday ease.</h2><p>An easygoing linen shirt with a softly textured finish and a relaxed silhouette. Designed to move effortlessly from slow mornings to days out.</p><p>Wear it buttoned up for a clean, considered look, or leave it open over your favourite tee for a lighter layer.</p></div><div className="shirts-care"><div><h2>How it stands out.</h2><ul><li>Relaxed shape with a classic pointed collar</li><li>Button-through front and a single chest pocket</li><li>Long sleeves with button cuffs and a curved hem</li></ul></div><p>For the best care, follow the instructions on the garment label. Embrace the natural creases — they are part of linen’s character.</p></div></div></section>
      <p ref={noticeRef} className="cart-status" role="status" tabIndex={-1}>{notice}</p>
    </main>
    {fitOpen && <FitFinderDialog profile={profile} onClose={closeFit} onChoose={(next, buyNow) => { onProfileChange(next); setSize(sampleFitResult.size); closeFit(); addToCart(buyNow, sampleFitResult.size) }} />}
  </div>
}
