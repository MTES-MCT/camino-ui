// https://docs.cypress.io/api/introduction/api.html

describe('Activités', () => {
  const utilisateur = {
    prenom: 'Martin',
    nom: 'Delgado',
    email: 'test@camino.local',
    motDePasse: 'secret-password-stub',
    permissionId: 'entreprise',
    entreprises: ['fr-830984613'],
    administrations: null
  }

  it('remplit une activité', function() {
    cy.visit('/titres/m-ax-auror-2018')
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
