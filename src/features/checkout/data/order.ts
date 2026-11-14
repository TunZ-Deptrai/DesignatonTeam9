import type { CartProduct } from './cart'
import type { ShippingDetails } from './shipping'
import type { PaymentDetails } from './payment'

export type OrderReceipt = { id: string; items: CartProduct[]; shipping: ShippingDetails; payment: PaymentDetails }
