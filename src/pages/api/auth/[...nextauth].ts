import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { User } from '../../../types'
import { fetchUser, postUser, putUser } from '../../../api'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import jwt from 'jsonwebtoken'

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        version: '2.0',
      }),
    ],
    pages: {
      signIn: '/login',
    },
    session: {
      jwt: true,
      maxAge: 60 * 60 * 24,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    events: {
      async signIn(message) {
        const user = message.user
        const provider = message.account.provider
        const providerId = message.account.providerAccountId

        // does user exist
        const token_ = generateToken(user)
        const data = await fetchUser(provider, providerId, token_)
        const currentTime = moment().format('X')

        if (!!data && data.email != user.email) {
          console.log('User exsits, info changed. Updating user.')
          // if user does exist and email number changed, update user information
          user.updatedAt = currentTime
          await putUser(user, token_)
        } else if (!data) {
          console.log('User not found. Creating user.')
          // if user does not exist, create one
          const user_: User = {
            id: uuid(),
            name: user.name,
            email: user.email,
            provider: provider,
            providerId: providerId,
            createdAt: currentTime,
            updatedAt: currentTime,
          }
          await postUser(user_, token_)
        } else {
          console.log('User exists, info unchanged. Nothing occurred')
        }
      },
    },
  }
}

function generateToken(user) {
  const secret = process.env.JWT_SECRET
  const currentTime = parseInt(moment().format('X'))
  const payload = {
    name: user.name,
    email: user.email,
    iat: currentTime,
    exp: currentTime + 1000,
  }
  return jwt.sign(payload, secret, { algorithm: 'HS256' })
}
