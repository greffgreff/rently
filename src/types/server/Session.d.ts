import User from "./User"

export default interface Session {
  user: User
  sessionToken: string
  expires: Date
}
