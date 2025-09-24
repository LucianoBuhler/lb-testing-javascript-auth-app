describe('The home page', () => {
  it('should displays the page title', () => {
    cy.visit('/')

    cy.get('#hero-page-title').should('contain', 'FULLSTACK-JS MERN STARTER')
  })

  it('should have sign in and join now buttons', () => {
    cy.visit('/')

    cy.get('#login-button').should('contain', 'Sign In')
    cy.get('#register-button').should('contain', 'Join Now')
  })

  it('should navigate to sign in page', () => {
    cy.visit('/')

    cy.get('#login-button').click()
    cy.url().should('contain', 'auth/login')
  })

  it('should navigate to the register page', () => {
    cy.visit('/')

    cy.get('#register-button').click()
    cy.url().should('contain', 'auth/register')
  })
})