import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { User } from '../../../types'
import { fetchUserByProvider, postUser, putUser } from '../../../api'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

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
        const userFromProvider = token

        if (account) {
          const provider = account.provider
          const providerId = account.providerAccountId
          const currentTime = new Date().getTime()
          const token_ = generateToken(account.expires_at, currentTime)
          let userFromDB: User
          try {
            userFromDB = await fetchUserByProvider(provider, providerId, token_)
          } catch (e) {}

          let user_: User

          if (!!userFromDB && (userFromDB.email != userFromProvider.email || userFromDB.name != userFromProvider.name)) {
            user_ = {
              id: userFromDB.id,
              name: userFromProvider.name,
              email: userFromProvider.email,
              provider: provider,
              providerId: providerId,
              createdAt: userFromDB.createdAt,
              updatedAt: currentTime.toString(),
            }

            await putUser(user_, token_)
          } else if (!userFromDB) {
            user_ = {
              id: randomUUID(),
              name: userFromProvider.name,
              email: userFromProvider.email,
              provider: provider,
              providerId: providerId,
              createdAt: currentTime.toString(),
              updatedAt: currentTime.toString(),
            }

            await postUser(user_, token_)
          } else {
            user_ = {
              id: userFromDB.id,
              name: userFromDB.name,
              email: userFromDB.email,
              provider: provider,
              providerId: providerId,
              createdAt: userFromDB.createdAt,
              updatedAt: userFromDB.updatedAt,
            }
          }

          delete token.name
          delete token.email
          delete token.picture
          delete token.sub

          token.user = user_
        }
        return token
      },
      async session({ session, token }) {
        session.user = token.user
        return session
      },
    },
  }
}

function generateToken(exp, iat) {
  const secret = process.env.JWT_SECRET
  const payload = {
    iat: iat,
    exp: exp,
  }
  return jwt.sign(payload, secret, { algorithm: 'HS256' })
}
