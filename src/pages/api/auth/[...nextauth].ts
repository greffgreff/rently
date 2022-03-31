import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { Session, User } from '../../../types'
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
    callbacks: {
      async jwt({ token, account }) {
        // grab provider from token so available on session creation
        if (account) {
          token.origin = account.provider
        }
        return token
      },
      async session({ session, token }) {
        const sessionUser: Session = session
        const provider = token.provider
        const providerId = token.providerId

        // does user exist
        const token_ = generateToken(token)
        const data = await fetchUser(provider, providerId, token_)
        const currentTime = moment().format('X')

        if (data && (data.email != sessionUser.user.email || data.phone != sessionUser.user.phone)) {
          
          // if user does exist, and email and phone number changed, update user information
          sessionUser.user.updatedAt = currentTime
          putUser(sessionUser.user, token_)

        } else {

          // if user does not exist, create one
          const user: User = {
            id: uuid(),
            name: sessionUser.user.name,
            email: sessionUser.user.email,
            phone: sessionUser.user.phone,
            provider: provider,
            providerId: providerId,
            createdAt: currentTime,
            updatedAt: currentTime,
          }
          postUser(user, token_)
          
        }

        return session
      },
    },
  }
}

function generateToken(token) {
  const secret = process.env.JWT_SECRET
  const payload = {
    name: token.name,
    email: token.email,
    iat: token.iat,
    exp: token.exp,
  }
  return jwt.sign(payload, secret, { algorithm: 'HS256' })
}
