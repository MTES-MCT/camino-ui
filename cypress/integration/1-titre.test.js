// https://docs.cypress.io/api/introduction/api.html

describe('Titres', () => {
  beforeEach(function() {
    cy.visit('/')
  })

  it('affiche la page', function() {
    cy.contains('Titres miniers et autorisations')
    cy.contains('résultat')
  })
})
