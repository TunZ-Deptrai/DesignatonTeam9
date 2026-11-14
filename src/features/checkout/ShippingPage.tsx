import { useRef, useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { AssetIcon } from '../../components/ui/AssetIcon'
import { FormField } from '../../components/ui/FormField'
import { SelectField } from '../../components/ui/SelectField'
import { assets } from './assets'
import { formatPrice, getCartTotals, type CartProduct } from './data/cart'
import { getShippingFee, type ShippingDetails } from './data/shipping'
import { CheckoutHeader } from './components/CheckoutHeader'
import { CheckoutFooter } from './components/CheckoutFooter'
import { CheckoutStepper } from './components/CheckoutStepper'
import { addressOptions } from './data/addressOptions'
import radioDot from '../../assets/checkout/radio-dot.svg'
import shirtBackground from '../../assets/checkout/summary-shirt-background.png'
import pantsBackground from '../../assets/checkout/summary-pants-background.png'
import './styles/cart.css'
import './styles/shipping.css'

type ShippingPageProps = {
  items: CartProduct[]
  details: ShippingDetails
  onChange: (details: ShippingDetails) => void
  onBack: () => void
  onContinue: () => void
}

export function ShippingPage({ items, details, onChange, onBack, onContinue }: ShippingPageProps) {
  const { quantity, subtotal } = getCartTotals(items)
  const shippingFee = getShippingFee(details.delivery)
  const [notice, setNotice] = useState('')
  const noticeRef = useRef<HTMLParagraphElement>(null)
  const province = addressOptions.find(option => option.province === details.province) ?? addressOptions[0]
  const city = province.cities.find(option => option.name === details.city) ?? province.cities[0]

  function changeProvince(value: string) {
    const next = addressOptions.find(option => option.province === value) ?? addressOptions[0]
    onChange({ ...details, province: next.province, region: next.region, city: next.cities[0].name, barangay: next.cities[0].barangays[0], postalCode: '' })
  }

  function changeCity(value: string) {
    const next = province.cities.find(option => option.name === value) ?? province.cities[0]
    onChange({ ...details, city: next.name, barangay: next.barangays[0], postalCode: '' })
  }

  function unavailable(label: string) {
    setNotice(`${label} is not available in this preview.`)
    noticeRef.current?.focus()
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (items.length) onContinue()
  }

  function field(name: keyof ShippingDetails, label: string, extra: { dropdownIcon?: string; autoComplete?: string; type?: string; required?: boolean } = {}) {
    return <FormField id={`shipping-${name}`} name={name} label={label} value={details[name]} onChange={event => onChange({ ...details, [name]: event.target.value })} required={extra.required ?? true} {...extra} />
  }

  return (
    <div className="checkout-prototype">
      <CheckoutHeader quantity={quantity} onUnavailable={unavailable} onCart={onBack} />
      <main className="shipping-main" data-figma-node="503:11581">
        <CheckoutStepper onCart={onBack} />
        <div className="shipping-columns">
          <form id="shipping-form" className="shipping-form" onSubmit={submit}>
            <section className="shipping-contact" aria-labelledby="shipping-contact-title">
              <h1 id="shipping-contact-title" tabIndex={-1}>Contact</h1>
              <div className="shipping-field-row">
                {field('fullName', 'Full Name', { autoComplete: 'name' })}
                {field('mobile', 'Mobile number', { autoComplete: 'tel', type: 'tel' })}
              </div>
              <p className="shipping-help">Checking out as a guest.</p>
              <fieldset className="shipping-channels">
                <legend className="shipping-sr-only">Order update channel</legend>
                {(['SMS', 'Messenger'] as const).map(channel => (
                  <label key={channel} className={`shipping-channel ${details.channel === channel ? 'is-selected' : ''}`}>
                    <input type="radio" name="channel" value={channel} checked={details.channel === channel} onChange={() => onChange({ ...details, channel })} />
                    <span className="shipping-radio-mark" aria-hidden="true">{details.channel === channel && <img src={radioDot} width="12" height="12" alt="" />}</span>
                    {channel}
                  </label>
                ))}
              </fieldset>
              <p className="shipping-help">We’ll confirm your order here.</p>
            </section>
            <section className="shipping-address" aria-labelledby="shipping-address-title">
              <h2 id="shipping-address-title">Shipping address</h2>
              <div className="shipping-field-row">
                <SelectField id="shipping-province" name="province" label="Province" autoComplete="address-level1" value={province.province} options={addressOptions.map(option => option.province)} onChange={event => changeProvince(event.target.value)} required />
                <SelectField id="shipping-city" name="city" label="City" autoComplete="address-level2" value={city.name} options={province.cities.map(option => option.name)} onChange={event => changeCity(event.target.value)} required />
              </div>
              <div className="shipping-field-row">
                <SelectField id="shipping-region" name="region" label="Region" value={province.region} options={[...new Set(addressOptions.map(option => option.region))]} onChange={event => changeProvince(addressOptions.find(option => option.region === event.target.value)!.province)} required />
                <SelectField id="shipping-barangay" name="barangay" label="Barangay" autoComplete="address-level3" value={details.barangay} options={city.barangays} onChange={event => onChange({ ...details, barangay: event.target.value })} required />
              </div>
              {field('postalCode', 'Postal code', { autoComplete: 'postal-code' })}
              {field('street', 'Street, building, unit', { autoComplete: 'street-address' })}
              {field('landmark', 'Landmark (optional)', { required: false })}
            </section>
            <fieldset className="shipping-delivery">
              <legend>Delivery</legend>
              {([
                { id: 'standard', label: 'Standard · from Vietnam', helper: 'Arrives 19–22 Nov · duties included', fee: 'Free' },
                { id: 'express', label: 'Express', helper: 'Arrives 16–18 Nov', fee: formatPrice(getShippingFee('express')) },
              ] as const).map(option => (
                <label key={option.id} className={`shipping-delivery-option ${details.delivery === option.id ? 'is-selected' : ''}`}>
                  <input type="radio" name="delivery" value={option.id} checked={details.delivery === option.id} onChange={() => onChange({ ...details, delivery: option.id })} />
                  <span className="shipping-radio-mark" aria-hidden="true">{details.delivery === option.id && <img src={radioDot} width="12" height="12" alt="" />}</span>
                  <span className="shipping-delivery-copy"><span>{option.label}</span><small>{option.helper}</small></span>
                  <span className="shipping-delivery-fee">{option.fee}</span>
                </label>
              ))}
            </fieldset>
          </form>
          <div className="shipping-side">
            <aside className="cart-summary shipping-summary" aria-labelledby="shipping-summary-title" data-figma-node="503:11655">
              <h2 id="shipping-summary-title">Order summary</h2>
              {items.map(item => (
                <div className="shipping-summary-item" key={item.id}>
                  <div className={`shipping-summary-image ${item.id === 'ilaya-shirt' ? 'is-shirt' : ''}`} style={{ backgroundImage: `url(${item.id === 'ilaya-shirt' ? shirtBackground : pantsBackground})` }}><img src={item.image} width={item.id === 'ilaya-shirt' ? 70 : 56} height="70" alt={item.name} /></div>
                  <div className="shipping-summary-item-copy"><p>{item.name}</p><small>{item.color} · {item.size}{item.id === 'ilaya-shirt' ? ' · Your fit' : ''}{item.quantity > 1 ? ` · Qty ${item.quantity}` : ''}</small></div>
                  <span>{formatPrice(item.priceCentavos * item.quantity)}</span>
                </div>
              ))}
              <div className="cart-summary-divider" />
              <dl className="cart-summary-rows">
                <div><dt>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</dt><dd key={`subtotal-${subtotal}`} className="cart-summary-amount">{formatPrice(subtotal)}</dd></div>
                <div><dt>Shipping fee</dt><dd>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</dd></div>
              </dl>
              <div className="cart-summary-divider" />
              <dl className="cart-summary-total"><div><dt>Total</dt><dd key={subtotal + shippingFee} className="cart-summary-amount" aria-live="polite">{formatPrice(subtotal + shippingFee)}</dd></div></dl>
              <Button variant="primary" type="submit" form="shipping-form" disabled={!items.length}>Continue</Button>
              <p className="cart-guarantee"><AssetIcon src={assets.check} /><span>Free size exchange within 7 days if it doesn’t fit.</span></p>
            </aside>
            <p className="shipping-signin">Have an account? <Button onClick={() => unavailable('Sign in')}>Sign in</Button></p>
            <p ref={noticeRef} className="shipping-notice" role="status" tabIndex={-1}>{notice}</p>
          </div>
        </div>
      </main>
      <CheckoutFooter onUnavailable={unavailable} />
    </div>
  )
}
