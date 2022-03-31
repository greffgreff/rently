import Address from './Address'
import Contact from './Contact'

export default interface Listing {
  id: string
  name: string
  desc: string
  price: string
  image: string
  startDate: string
  endDate: string
  createAt: string
  address: Address
  leaser: Contact
}
