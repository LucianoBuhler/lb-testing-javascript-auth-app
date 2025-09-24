
describe('The login process', () => {
  it('should login a user, flash a message, and redirect to the Home Page', () => {
    cy.fixture('user').then((user) => {
      cy.intercept('POST', '/api/v1/auth/login', {
        statusCode: 200,
        body: user,
      }).as('loginUser')
      // cy.intercept('http://localhost:4001/')

    })



    cy.visit('/auth/login')
    cy.get('input[name=email]').type('doctor@strange.com')
    cy.get('input[name="password"]').type('password')
    cy.get('button').click()

    // wait for login request to complete
    cy.wait('@loginUser')

    // now assert flash + menu items

    cy.get('#confirm-email-message').should('contain', 'Please confirm your email address.')
    cy.get('#auth-username').should('contain', 'Hey, doctor')
    cy.get('#auth-logout').should('contain', 'Logout')
  })
})