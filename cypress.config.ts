import { defineConfig } from 'cypress'

const { GoogleSocialLogin } = require("cypress-social-logins").plugins

export default defineConfig({
  projectId: 'frhfvc',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        GoogleSocialLogin: GoogleSocialLogin,
      })
    },
  },
})
