/// <reference types="cypress" />

import Chance from 'chance'

const chance = Chance()

describe('User Login', () => {
  const email = chance.email()
  const password = chance.word()

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Login success', () => {
    cy.contains('Rently.io')
  })
})
