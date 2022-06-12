import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'frhfvc',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    "CYPRESS_RECORD_KEY": "a3b8256a-4431-4930-8c58-ee2cb3c2012b~"
  }
})
