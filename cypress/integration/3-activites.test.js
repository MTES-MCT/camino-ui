// https://docs.cypress.io/api/introduction/api.html

describe('Activités', () => {
  const utilisateur = {
    prenom: 'Martin',
    nom: 'Delgado',
    email: 'test@camino.local',
    motDePasse: 'secret-password-stub',
    permissionId: 'entreprise',
    entreprisesIds: ['fr-830984613'],
    administrationsIds: null
  }

  beforeEach(function() {
    cy.fixture('init').as('init')
    cy.fixture('moi-null').as('moiNull')
    cy.fixture('titre-axm-null').as('titreAxmNull')
    cy.fixture('titre-axm-entreprise').as('titreAxmEntreprise')
    cy.fixture('activite-modifier-axm').as('activiteModifierAxm')
    cy.fixture('titre-axm-entreprise-activite').as('titreAxmEntrepriseActivite')
  })

  it('ajoute une activité', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.titreAxmNull,
      this.titreAxmEntreprise,
      this.activiteModifierAxm,
      this.titreAxmEntrepriseActivite
    ])

    cy.visit('http://localhost:8080/titres/m-axm-auror-2018')
    cy.userAdd(utilisateur, 'entreprise')
    cy.login(utilisateur.email, utilisateur.motDePasse, 'entreprise')

    cy.get('#cmn-titre-tab-activites').click()
    cy.contains('Remplir…')
      .first()
      .click()

    cy.get('input[type=number]').each(($input, i) => {
      cy.get($input).type(10 + i)
    })

    cy.get('.cmn-titre-edit-sections-checkboxes').each($checkboxesBlock => {
      cy.get($checkboxesBlock)
        .find('input[type=checkbox]')
        .first()
        .check({ force: true })
    })
    cy.get('#cmn-titre-activite-edit-popup-button-previsualiser').click()
    cy.get('#cmn-titre-activite-edit-popup-warning').should('be.visible')
    cy.get('#cmn-titre-activite-edit-popup-button-enregistrer').click()
    cy.get('#cmn-app-messages').should(
      'contain',
      "l'activité a été enregistrée"
    )
  })
})
