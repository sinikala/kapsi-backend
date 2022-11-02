describe('User', function () {
  before(function () {
    cy.createUser()
  })
  beforeEach(function () {
    cy.visit('http://localhost:8000/signup')
  })


  it('can not signup with unsuitable credentials', function () {
    cy.get('#username').type('hm')
    cy.get('#password').type('1')
    cy.get('#passwordConfirm').type('11')
    cy.get('#signup-button').click()

    cy.contains('Username must contain at least 3 characters')
    cy.contains('Password must contain at least 3 characters')
    // eslint-disable-next-line quotes
    cy.contains("Password and password confirm don't match")

    cy.get('#username').type('bad')
    cy.get('#password').type('input')
    cy.get('#passwordConfirm').type('input')
    cy.get('#signup-button').click()

    cy.contains('Name is required')
  })


  it('can not signup for taken username', function () {
    cy.get('#username').type('testeri')
    cy.get('#name').type('Taavetti')
    cy.get('#password').type('salainen')
    cy.get('#passwordConfirm').type('salainen')
    cy.get('#signup-button').click()

    cy.contains('Käyttäjänimi varattu')
  })


  it('can signup with proper credentials and is signed in', function () {
    cy.get('#username').type('tahvo')
    cy.get('#name').type('Taavetti')
    cy.get('#password').type('salainen')
    cy.get('#passwordConfirm').type('salainen')
    cy.get('#signup-button').click()

    cy.contains('Valitse kansallispuisto kartalta')
  })

})