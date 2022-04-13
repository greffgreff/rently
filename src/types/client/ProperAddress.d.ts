export default interface ProperAddress {
  address: {
    street?: string
    city: string
    zip: string
    country: string
  }
  formatedAddress: string
  geocode: {
    lat: number
    lng: number
  }
}
