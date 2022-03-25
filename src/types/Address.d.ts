export default interface Address {
  id: string
  streetNumber?: string
  streetName?: string
  city: string
  zip: string
  country: string
}

//https://maps.googleapis.com/maps/api/geocode/json?address=5+Av.+Anatole+France,+75007+Paris,+France&key=AIzaSyCYm4sjNy3lfgfcfK7zV7e_G8sOVyHtpr0