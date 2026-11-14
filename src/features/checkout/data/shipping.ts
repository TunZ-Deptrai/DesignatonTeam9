export type ShippingDetails = {
  fullName: string
  mobile: string
  province: string
  city: string
  region: string
  barangay: string
  postalCode: string
  street: string
  landmark: string
  channel: 'SMS' | 'Messenger'
  delivery: 'standard' | 'express'
}

export const initialShipping: ShippingDetails = {
  fullName: 'Bea Santos',
  mobile: '+63 917 555 0142',
  province: 'Metro Manila',
  city: 'Makati City',
  region: 'Metro Manila (NCR)',
  barangay: 'Poblacion',
  postalCode: '1210',
  street: 'Unit 12B, 5432 Kalayaan Ave.',
  landmark: 'Across the 7-Eleven, blue gate',
  channel: 'SMS',
  delivery: 'standard',
}

export function getShippingFee(delivery: ShippingDetails['delivery']) {
  return delivery === 'express' ? 35000 : 0
}
