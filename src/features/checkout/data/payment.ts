import gcash from '../../../assets/checkout/gcash.png'
import maya from '../../../assets/checkout/maya.png'
import card from '../../../assets/checkout/card.png'
import cod from '../../../assets/checkout/cod.png'

export type PaymentMethod = 'gcash' | 'maya' | 'card' | 'cod'
export type PaymentDetails = { method: PaymentMethod; billingSame: boolean; agreed: boolean }
export const initialPayment: PaymentDetails = { method: 'gcash', billingSame: true, agreed: true }
export const paymentMethods = [
  { id: 'gcash', label: 'GCash', helper: 'Pay in the GCash app · 2x points', image: gcash },
  { id: 'maya', label: 'Maya', helper: 'Pay in the Maya app · 2x points', image: maya },
  { id: 'card', label: 'Credit / debit card', helper: 'Visa · Mastercard · JCB', image: card },
  { id: 'cod', label: 'Cash on delivery', helper: 'Pay the rider in cash. We confirm your order by SMS first.', image: cod },
] as const

export function pointsLabel(subtotal: number, method: PaymentMethod) {
  // Only the approved Figma fixture defines a reward. Do not invent a general rewards policy.
  return subtotal === 464000 && (method === 'gcash' || method === 'maya') ? '+928 pts (2x e-wallet)' : 'To be confirmed'
}
