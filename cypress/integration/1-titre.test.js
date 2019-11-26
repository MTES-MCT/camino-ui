// https://docs.cypress.io/api/introduction/api.html

describe('Titres', () => {
  beforeEach(function() {
    cy.fixture('init').as('init')
    cy.fixture('metas-titres-null').as('metasTitresNull')
    cy.fixture('moi-null').as('moiNull')
    cy.fixture('titres-null').as('titresNull')
  })

  it('affiche la page', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull
    ])

    cy.visit('http://localhost:8080')
    cy.contains('Titres miniers et autorisations')
    cy.contains('résultat')
  })
})
