import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "478652591193-154niej44ummo8if0tp23tuc6epuma24.apps.googleusercontent.com",
      clientSecret: "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"
    }),  
    FacebookProvider({
      clientId: "435847995008552",
      clientSecret: "4dfbdc01711852771ad4c42a1329ac58"
    }),
    TwitterProvider({
      clientId: "478652591193-154niej44ummo8if0tp23tuc6epuma24.apps.googleusercontent.com",
      clientSecret: "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"
    }),    
  ],
  pages: {
    signIn: '/login',
  }
})
