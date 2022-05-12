import User from "./User"

export default interface Session {
  user: User
  expires: string
}
