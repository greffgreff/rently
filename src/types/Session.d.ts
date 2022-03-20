export default interface Session {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires?: string
}
