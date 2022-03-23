import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import jwt from 'jsonwebtoken'

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
    maxAge: 60 * 60,
  },
  jwt: {
    // secret: process.env.JWT_SECRET,
    secret: 'HelloDarknessMyOldFriend',
    // encode: async ({ secret, token, maxAge }) => {
    //   const jwtClaims = {
    //     sub: token.id,
    //     name: token.name,
    //     email: token.email,
    //     iat: Date.now() / 1000,
    //     exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    //   }
    //   return jwt.sign(jwtClaims, secret, { algorithm: 'HS256' })
    // },
    // decode: async ({ secret, token, maxAge }) => {
    //   return jwt.verify(token, secret, { algorithms: ['HS256'] })
    // },
  },
})

// https://next-auth.js.org/v3/configuration/options
