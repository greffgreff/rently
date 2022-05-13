import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { User } from '../../../types'
import { fetchUserByProvider, postUser, putUser } from '../../../api'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

export default NextAuth({
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
        const currentTimeInMills = new Date().getTime()

        let userFromDB: User
        try {
          userFromDB = await fetchUserByProvider(provider, providerId)
        } catch (e) {}
        
        let sessionToken : string
        let sessionUser: User
        
        if (!!userFromDB && (userFromDB.email != userFromProvider.email || userFromDB.name != userFromProvider.name)) {
          sessionUser = {
            id: userFromDB.id,
            name: userFromProvider.name,
            email: userFromProvider.email,
            provider: provider,
            providerId: providerId,
            createdAt: userFromDB.createdAt,
            updatedAt: currentTimeInMills.toString(),
          }
          sessionToken = generateToken(userFromDB.id, account.expires_at, currentTimeInMills)
          await putUser(sessionUser, sessionToken)
        } else if (!userFromDB) {
          let newUserId = randomUUID()
          sessionUser = {
            id: newUserId,
            name: userFromProvider.name,
            email: userFromProvider.email,
            provider: provider,
            providerId: providerId,
            createdAt: currentTimeInMills.toString(),
            updatedAt: currentTimeInMills.toString(),
          }
          sessionToken = generateToken(newUserId, account.expires_at, currentTimeInMills)
          await postUser(sessionUser, sessionToken)
        } else {
          sessionUser = {
            id: userFromDB.id,
            name: userFromDB.name,
            email: userFromDB.email,
            provider: provider,
            providerId: providerId,
            createdAt: userFromDB.createdAt,
            updatedAt: userFromDB.updatedAt,
          }
          sessionToken = generateToken(userFromDB.id, account.expires_at, currentTimeInMills)
        }

        token.user = sessionUser
        token.jwt = sessionToken
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.sessionToken = token.jwt
      return session
    },
  },
})

function generateToken(subject: string, exp: number, iat: number) {
  const secret = process.env.JWT_SECRET
  const payload = {
    sub: subject,
    exp: exp,
    iat: iat,
  }
  return jwt.sign(payload, secret, { algorithm: 'HS256' })
}
