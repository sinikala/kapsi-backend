describe('Kapsi', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('KAPSI')
  })

  it('front page contains a map with no park selected', function () {
    cy.contains('Leaflet')
    cy.contains('Valitse kansallispuisto kartalta')
  })

  it('a marker can be clicked for park details', function () {
    cy.get('[class^=leaflet-marker-icon]').first().click()
    cy.contains('Sijainti:')
  })

  it('park details can be closed', function () {
    cy.get('[class^=leaflet-marker-icon').first().click()
    cy.get('[aria-label="close"]').click()
    cy.contains('Valitse kansallispuisto kartalta')
  })
})