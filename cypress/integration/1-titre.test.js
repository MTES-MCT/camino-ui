// https://docs.cypress.io/api/introduction/api.html

describe('Titres', () => {
  beforeEach(function() {
    cy.visit('http://localhost:8080')
  })

  it('affiche la page', function() {
    cy.contains('Titres miniers et autorisations')
    cy.contains('résultat')
  })
})
