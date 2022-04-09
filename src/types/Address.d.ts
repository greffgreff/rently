export default interface Address {
  id: string
  street?: string
  city: string
  zip: string
  country: string
  formattedAddress: string
  lat: number
  lon: number
}
