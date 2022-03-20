import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import jwt from 'jsonwebtoken'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '478652591193-154niej44ummo8if0tp23tuc6epuma24.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    FacebookProvider({
      clientId: '435847995008552',
      clientSecret: '4dfbdc01711852771ad4c42a1329ac58',
    }),
    TwitterProvider({
      clientId: '478652591193-154niej44ummo8if0tp23tuc6epuma24.apps.googleusercontent.com',
      clientSecret: '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',
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
