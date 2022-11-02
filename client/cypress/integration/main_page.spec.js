describe('Kapsi front page', function () {
  beforeEach(function () {
    cy.visit('http://localhost:8000')
  })

  it('can be opened', function () {
    cy.contains('KAPSI')
  })

  it('contains a map with no park selected', function () {
    cy.contains('Leaflet')
    cy.contains('Valitse kansallispuisto kartalta')
  })

  it('map marker can be clicked for park details and the marker changes color', function () {
    cy.get('img[src*="icon-orange.png"]').should('not.exist')
    cy.get('[class^=leaflet-marker-icon]').first().click()
    cy.contains('Sijainti:')
    cy.get('img[src*="icon-orange.png"]')
  })

  it('park details can be closed', function () {
    cy.get('[class^=leaflet-marker-icon').first().click()
    cy.get('[aria-label="close"]').click()
    cy.contains('Valitse kansallispuisto kartalta')
    cy.get('img[src*="icon-orange.png"]').should('not.exist')
  })

  it('contains a link to sign in form', function () {
    cy.get('#login-link').click()
    cy.contains('Kirjaudu sisään')
  })

})