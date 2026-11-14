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
  fullName: '',
  mobile: '',
  province: '',
  city: '',
  region: '',
  barangay: '',
  postalCode: '',
  street: '',
  landmark: '',
  channel: 'SMS',
  delivery: 'standard',
}

export function getShippingFee(delivery: ShippingDetails['delivery']) {
  return delivery === 'express' ? 35000 : 0
}
