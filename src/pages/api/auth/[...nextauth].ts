import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
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
    // events: {
    //   async session(session) {
    //     const secret = process.env.JWT_SECRET
    //     const token = session.token
    //     const payload = {
    //       id: token.id,
    //       name: token.name,
    //       email: token.email,
    //       iat: token.iat,
    //       exp: token.exp,
    //     }
    //     const postJwt = jwt.sign(payload, secret, { algorithm: 'HS256' })
    //     res.setHeader('Set-Cookie', ['_jwt =' + postJwt])
    //   },
    //   async signOut() {
    //     res.setHeader('Set-Cookie', ['_jwt =; SECURE; EXPIRES=Thu, 01 Jan 1970 00:00:00 GMT'])
    //   },
    // },
  }
}
