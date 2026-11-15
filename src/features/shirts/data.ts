import type { CartProduct } from '../checkout/data/cart'
import { shirtAssets } from './assets'

export const shirtSizes = ['XS', 'S', 'M', 'L', 'XL'] as const
export const shirtColors = ['Natural', 'Rose', 'Blue', 'Mint'] as const
export type ShirtSelection = { size: string; color: number; quantity: number }
export type FitProfile = {
  height: string
  weight: string
  bust: string
  waist: string
  hips: string
  skinTone: number
}
export const sampleMeasurements: FitProfile = { height: '160', weight: '62', bust: '92', waist: '84', hips: '94', skinTone: 2 }

// Approved prototype fixture from Figma; no sizing or body-type inference is performed.
export const sampleFitResult = {
  size: 'L',
  shape: 'The apple shape',
  description: 'For an apple body shape, elongate your torso with V-necks, wrap tops, and empire-waist dresses that skim smoothly over your midsection. Balance your proportions with bootcut or wide-leg pants, and add open, hip-length layers to create slimming vertical lines.',
  reason: 'Based on your 92 cm bust. Relaxed fit with room through the waist. M would feel snug.',
}

export function selectedShirt(selection: ShirtSelection): CartProduct {
  return {
    id: `red-linen-shirt-${selection.color}-${selection.size}`,
    name: 'Red Linen Shirt', priceCentavos: 245000,
    color: shirtColors[selection.color], size: selection.size, quantity: selection.quantity,
    image: shirtAssets.main, imageBase: shirtAssets.main,
  }
}
