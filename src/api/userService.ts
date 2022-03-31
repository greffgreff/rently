import axios from 'axios'
import { User } from '../types'

const HEADERS = {
  headers: { 'Content-Type': 'application/json' },
}

export async function fetchUser(provider: string, providerId: string): Promise<User> {
  return await axios
    .get('http://localhost:8080/api/v2/' + provider + '/' + providerId)
    .then((res) => res.data)
    .catch(console.log)
}

export async function postUser(user: User) {
  await axios.post('http://localhost:8080/api/v2/', user, HEADERS).catch(console.log)
}

export async function putUser(user: User) {
  await axios.put('http://localhost:8080/api/v2/' + user.provider + '/' + user.providerId, user, HEADERS).catch(console.log)
}

export async function deleteUser(user: User) {
  await axios.delete('http://localhost:8080/api/v2/' + user.provider + '/' + user.providerId).catch(console.log)
}
