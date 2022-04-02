import axios from 'axios'
import { User } from '../types'

export async function fetchUser(provider: string, providerId: string, token: string): Promise<User> {
  return await axios
    .get('http://localhost:8080/api/v2/' + provider + '/' + providerId, getHeaders(token))
    .then((res) => res.data.content)
    .catch(console.log)
}

export async function postUser(user: User, token: string) {
  await axios.post('http://localhost:8080/api/v2/', user, getHeaders(token)).catch(console.log)
}

export async function putUser(user: User, token: string) {
  await axios.put('http://localhost:8080/api/v2/' + user.provider + '/' + user.providerId, user, getHeaders(token)).catch(console.log)
}

export async function deleteUser(provider: string, providerId: string, token: string) {
  await axios.delete('http://localhost:8080/api/v2/' + provider + '/' + providerId, getHeaders(token)).catch(console.log)
}

function getHeaders(token: string) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }
}
