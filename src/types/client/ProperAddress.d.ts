export default interface ProperAddress {
    formatedAddress: string
    geocode: {
        lat: number,
        lng: number,
    }
}