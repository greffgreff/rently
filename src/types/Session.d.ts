export default interface Session {
  user?: {
    name?: string | null
    email?: string | null
  }
  expires?: string
}
