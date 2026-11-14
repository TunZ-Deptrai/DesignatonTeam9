import shirt from '../../../assets/checkout/shirt.png'
import shirtBase from '../../../assets/checkout/shirt-base.png'
import pants from '../../../assets/checkout/pants.png'
import pantsBase from '../../../assets/checkout/pants-base.png'

export type CartProduct = {
  id: string
  name: string
  priceCentavos: number
  quantity: number
  color: string
  size: string
  image: string
  imageBase: string
}

export const initialCart: CartProduct[] = [
  { id: 'ilaya-shirt', name: 'Ilaya Linen Shirt', priceCentavos: 245000, quantity: 1, color: 'Terracotta', size: 'M', image: shirt, imageBase: shirtBase },
  { id: 'alon-pants', name: 'Alon Wide Pants', priceCentavos: 219000, quantity: 1, color: 'Sand', size: 'M', image: pants, imageBase: pantsBase },
]

const currency = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })

export function formatPrice(centavos: number) {
  return currency.format(centavos / 100)
}

export function getCartTotals(items: CartProduct[]) {
  return {
    quantity: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.priceCentavos * item.quantity, 0),
  }
}
