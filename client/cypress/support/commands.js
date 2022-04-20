Cypress.Commands.add('createUser', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')

  const user = {
    username: 'testeri',
    name: 'Terttu-Esteri',
    password: 'salainen'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
})
