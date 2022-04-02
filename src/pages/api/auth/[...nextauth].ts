import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { User } from '../../../types'
import { fetchUser, postUser, putUser } from '../../../api'
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
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token
          token.provider = account.provider
          token.providerId = account.providerAccountId
        }
        return token
      },
    },
    events: {
      async signIn(message) {
        const userFromProvider = message.user
        const provider = message.account.provider
        const providerId = message.account.providerAccountId
        const token_ = generateToken(provider, providerId)
        const userFromDB = await fetchUser(provider, providerId, token_)
        const currentTime = moment().format('X')

        if (!!userFromDB && userFromDB.email != userFromProvider.email) {
          // if user does exist and email number changed, update user information
          console.log('User exsits, info changed. Updating user.')
          const user_: User = {
            name: userFromProvider.name,
            email: userFromProvider.email,
            provider: provider,
            providerId: providerId,
            createdAt: userFromDB.createdAt,
            updatedAt: currentTime,
          }
          await putUser(user_, token_)
        } else if (!userFromDB) {
          // if user does not exist, create one
          console.log('User not found. Creating user.')
          const user_: User = {
            name: userFromProvider.name,
            email: userFromProvider.email,
            provider: provider,
            providerId: providerId,
            createdAt: currentTime,
            updatedAt: currentTime,
          }
          await postUser(user_, token_)
        } else {
          console.log('User exists, info unchanged. Nothing occurred.')
        }
      },
    },
  }
}

function generateToken(provider: string, providerId: string) {
  const secret = process.env.JWT_SECRET
  const currentTime = parseInt(moment().format('X'))
  const payload = {
    provider: provider,
    providerId: providerId,
    iat: currentTime,
    exp: currentTime + 1000,
  }
  return jwt.sign(payload, secret, { algorithm: 'HS256' })
}
