import Address from './Address'

export default interface Listing {
  id: string
  name: string
  desc: string
  price: number
  image: any
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  leaser: string
  phone: string
  address: Address
}
