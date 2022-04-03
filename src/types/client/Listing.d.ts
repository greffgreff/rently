import Address from './Address'
import User from '../server/User'

export default interface Listing {
  id: string
  name: string
  desc: string
  price: string
  image: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  leaser: string
  phone: string
  address: Address
}
