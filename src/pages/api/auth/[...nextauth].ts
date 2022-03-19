import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "478652591193-154niej44ummo8if0tp23tuc6epuma24.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ]
})
