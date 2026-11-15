import { useEffect, useRef, useState } from 'react'
import { CartPage } from './CartPage'
import { ShippingPage } from './ShippingPage'
import { initialCart } from './data/cart'
import { initialShipping, type ShippingDetails } from './data/shipping'
import { initialPayment, type PaymentDetails } from './data/payment'
import { PaymentPage } from './PaymentPage'
import { ReviewPage } from './ReviewPage'
import { ConfirmationPage } from './ConfirmationPage'
import type { OrderReceipt } from './data/order'
import { MembershipPage } from '../account/MembershipPage'
import { ShirtsPage } from '../shirts/ShirtsPage'
import { selectedShirt, type FitProfile } from '../shirts/data'
import { Homepage } from '../homepage/Homepage'

type CheckoutStep = 'home' | 'cart' | 'shipping' | 'payment' | 'review' | 'confirmation' | 'membership' | 'shirts'

function readStep(): CheckoutStep {
  if (window.location.hash === '#/cart' || window.location.hash === '#/checkout/cart') return 'cart'
  if (window.location.hash === '#/shirts') return 'shirts'
  if (window.location.hash === '#/account/membership') return 'membership'
  const route = window.location.hash.replace('#/checkout/', '')
  return route === 'shipping' || route === 'payment' || route === 'review' || route === 'confirmation' ? route : 'home'
}

export function CheckoutFlow() {
  const [step, setStep] = useState(readStep)
  const [items, setItems] = useState(initialCart)
  const [shipping, setShipping] = useState<ShippingDetails>(initialShipping)
  const [payment, setPayment] = useState<PaymentDetails>(initialPayment)
  const [editingShipping, setEditingShipping] = useState(false)
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null)
  const [shirtFitProfile, setShirtFitProfile] = useState<FitProfile | null>(null)
  const orderSequence = useRef(20481)

  useEffect(() => {
    const onHashChange = () => setStep(readStep())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (step === 'confirmation' && !receipt) {
      window.location.replace('#/checkout/review')
      return
    }
    const titles = { home: 'Home', cart: 'Your cart', shipping: 'Shipping address', payment: 'Payment method', review: 'Review your order', confirmation: 'Order confirmed', membership: 'Membership', shirts: 'Red Linen Shirt' }
    document.title = `${titles[step]} — MỘC STUDIO`
    window.scrollTo(0, 0)
    document.querySelector<HTMLElement>('main h1')?.focus()
    if (step === 'home') {
      const id = window.location.hash === '#/home/fit' ? 'home-fit' : window.location.hash === '#/home/collection' ? 'home-collection' : null
      if (id) {
        const section = document.getElementById(id)
        section?.scrollIntoView({ block: 'start' })
        section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
      }
    }
  }, [step, receipt])

  function goToCart() {
    window.location.hash = '/cart'
  }

  function navigate(next: CheckoutStep) {
    window.location.hash = next === 'cart' ? '/cart' : `/checkout/${next}`
  }

  if (step === 'membership') return <MembershipPage quantity={items.reduce((sum, item) => sum + item.quantity, 0)} onCart={goToCart} />

  if (step === 'home') return <Homepage quantity={items.reduce((sum, item) => sum + item.quantity, 0)} profile={shirtFitProfile} onCart={goToCart} onChooseFit={(profile, buyNow) => {
    setShirtFitProfile(profile)
    const product = selectedShirt({ size: 'L', color: 0, quantity: 1 })
    setItems(current => current.some(item => item.id === product.id)
      ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, product])
    if (buyNow) { setEditingShipping(false); navigate('shipping') }
  }} />

  if (step === 'shirts') return <ShirtsPage quantity={items.reduce((sum, item) => sum + item.quantity, 0)} profile={shirtFitProfile} onProfileChange={setShirtFitProfile} onCart={goToCart} onAdd={(selection, buyNow) => {
    const product = selectedShirt(selection)
    setItems(current => current.some(item => item.id === product.id)
      ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item)
      : [...current, product])
    if (buyNow) {
      setEditingShipping(false)
      navigate('shipping')
    }
  }} />

  if (step === 'payment') return <PaymentPage items={items} shipping={shipping} payment={payment} onChange={setPayment} onNavigate={navigate} onContinue={() => navigate('review')} />
  if (step === 'confirmation' && receipt) return <ConfirmationPage receipt={receipt} onContinueShopping={goToCart} />
  if (step === 'review' || step === 'confirmation') return <ReviewPage items={items} shipping={shipping} payment={payment} onChange={setPayment} onSuccess={() => {
    setReceipt({ id: `MC-${orderSequence.current++}`, items: items.map(item => ({ ...item })), shipping: { ...shipping }, payment: { ...payment } })
    navigate('confirmation')
  }} onNavigate={next => {
    if (next === 'shipping') {
      setEditingShipping(true)
    }
    navigate(next)
  }} />

  return step === 'shipping' ? (
    <ShippingPage items={items} details={shipping} onChange={setShipping} onBack={goToCart} onContinue={() => {
      navigate(editingShipping ? 'review' : 'payment')
      setEditingShipping(false)
    }} />
  ) : (
    <CartPage items={items} onItemsChange={setItems} onCheckout={() => {
      if (items.length) {
        setEditingShipping(false)
        window.location.hash = '/checkout/shipping'
      }
    }} />
  )
}
