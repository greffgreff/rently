import axios from 'axios'
import { User } from '../types'

export async function fetchUserByProvider(provider: string, providerId: string, token: string): Promise<User> {
  return await axios
    .get('http://localhost:8080/api/v2/' + provider + '/' + providerId, getHeaders(token))
    .then((res) => res.data.content)
}

export async function fetchUserById(id: string, token?: string): Promise<User> {
  return await axios
    .get('http://localhost:8080/api/v2/' + id, getHeaders(token))
    .then((res) => res.data.content)
}

export async function postUser(user: User, token: string) {
  await axios.post('http://localhost:8080/api/v2/', user, getHeaders(token))
}

export async function putUser(user: User, token: string) {
  await axios.put('http://localhost:8080/api/v2/' + user.id, user, getHeaders(token))
}

export async function deleteUser(id: string, token: string) {
  await axios.delete('http://localhost:8080/api/v2/' + id, getHeaders(token))
}

function getHeaders(token: string) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }
}
