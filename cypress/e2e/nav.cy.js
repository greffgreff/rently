/// <reference types="cypress" />

describe('Navigation Bar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Login to login page', () => {
    cy.get('#signin').click()
    cy.url().should('include', '/login')
    cy.get('#signout').should('not.exist')
    cy.get('#account').should('not.exist')
  })

  it('Search to listings page', () => {
    cy.get('#search').click()
    cy.url().should('include', '/listings')
  })

  // it('Account to account page', () => {
  //   cy.get('#account').click()
  //   cy.url().should('include', '/account')
  // })

  it('Login with Google', () => {
    const username = 'info.rently.io@gmail.com'
    const password = 'AdminAdmin123123!!'
    const loginUrl = 'http://localhost:3000'
    const cookieName = 'next-auth.session-token'
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: true,
      loginSelector: `a[href="http://localhost:3000/api/auth/signin/google"]`,
      postLoginSelector: '.unread-count',
    }

    return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
      cy.clearCookies()

      const cookie = cookies.filter((cookie) => cookie.name === cookieName).pop()
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        })

        Cypress.Cookies.defaults({
          preserve: cookieName,
        })

        // remove the two lines below if you need to stay logged in
        // for your remaining tests
        // cy.visit('/api/auth/signout')
        // cy.get('form').submit()
      }
    })
  })
})
