// https://docs.cypress.io/api/introduction/api.html

describe('Activités', () => {
  const utilisateur = {
    prenom: 'Martin',
    nom: 'Delgado',
    email: 'test@camino.local',
    motDePasse: 'secret-password-stub',
    permissionId: 'entreprise',
    entreprises: [{ id: 'fr-830984613' }],
    administrations: null
  }

  it('remplit une activité', function() {
    cy.visit('/titres/m-ax-auror-2018')
    cy.userAdd(utilisateur)
    cy.login(utilisateur.email, utilisateur.motDePasse)

    cy.get('#cmn-titre-tab-activites').click()
    cy.get('.cmn-activite-btn-remplir')
      .eq(2)
      .click()

    cy.get('input[type=number]').each(($input, i) => {
      cy.get($input).type(10 + i)
    })

    cy.get('input[type=checkbox]').each($checkbox => {
      cy.get($checkbox).check({ force: true })
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
