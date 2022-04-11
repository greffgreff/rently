export default interface Address {
  street?: string
  city: string
  zip: string
  country: string
  formattedAddress: string
  location: {
    type: string
    coordinates: number[]
  }
}
