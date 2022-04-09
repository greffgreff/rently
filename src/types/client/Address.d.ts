export default interface Address {
  street?: string
  city: string
  zip: string
  country: string
  formattedAddress: string
  lat: number
  lon: number
}
