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
  createAt: string
  leaser: string
  address: Address
}
