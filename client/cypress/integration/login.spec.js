describe('User', function () {
  before(function () {
    cy.createUser()
  })
  beforeEach(function () {
    cy.visit('http://localhost:8000/login')
  })

  it('can find user creation from login page', function () {
    cy.get('#signup-link').click()
    cy.contains('Luo käyttäjätunnukset')
  })

  it('can not login with unsuitable credentials', function () {
    cy.get('#username').type('hm')
    cy.get('#password').type(' ')
    cy.get('#login-button').click()
    cy.contains('Username must contain at least 3 characters')
    cy.contains('Password must contain at least 3 characters')
  })


  it('can not login with non-existing credentials', function () {
    cy.get('#username').type('muikkunen')
    cy.get('#password').type('muumi')
    cy.get('#login-button').click()
    cy.contains('Virheelliset tunnukset')
  })


  it('can login with correct credentials and is redirected', function () {
    cy.get('#username').type('testeri')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Valitse kansallispuisto kartalta')
  })

})