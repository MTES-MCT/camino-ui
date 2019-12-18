// https://docs.cypress.io/api/introduction/api.html

describe('Utilisateur', () => {
  const utilisateur = {
    prenom: 'Martin',
    nom: 'Delgado',
    email: 'test@camino.local',
    motDePasse: 'secret-password-stub',
    permissionId: 'defaut',
    entreprisesIds: null,
    administrationsIds: null
  }

  it("s'envoie un email de création de compte", function() {
    cy.visit('/')
    cy.userRemove(utilisateur.email)
    // cy.get('#cmn-user-button-connexion').click()
    cy.get('[data-cy=cmn-user-button-connexion]').click()
    cy.get('#cmn-user-login-popup-button-creer-votre-compte').click()
    cy.get('#cmn-user-add-popup-input-email').type(utilisateur.email)
    cy.get('#cmn-user-add-popup-button-valider').click({ force: true })
    // cy.get('#cmn-app-messages').should(
    cy.get('[data-cy=cmn-app-messages]').should(
      'contain',
      'un email pour créer votre compte a été envoyé'
    )
  })

  it('se crée un compte', function() {
    cy.userRemove(utilisateur.email)
    cy.userAccountUrl(utilisateur.email).then(url => {
      cy.visit(url.replace('undefined', '/'))

      cy.get('#cmn-user-add-input-prenom').type(utilisateur.prenom)
      cy.get('#cmn-user-add-input-nom').type(utilisateur.nom)
      cy.get('#cmn-user-add-input-mot-de-passe').type(utilisateur.motDePasse)
      cy.get('#cmn-user-add-checkbox-cgu').check()
      cy.get('#cmn-user-add-button-enregistrer').click({ force: true })
      // cy.get('#cmn-app-messages').should('contain', 'bienvenue Martin Delgado')
      cy.get('[data-cy=cmn-app-messages]').should(
        'contain',
        'bienvenue Martin Delgado'
      )

      cy.userRemove(utilisateur.email)
    })
  })

  it('se connecte (erreur: mot de passe)', function() {
    cy.userAdd(utilisateur)
    cy.visit('/')
    // cy.get('#cmn-user-button-connexion').click()
    cy.get('[data-cy=cmn-user-button-connexion]').click()
    cy.get('#cmn-user-login-popup-input-email').type(utilisateur.email)
    cy.get('#cmn-user-login-popup-input-mot-de-passe').type(
      `mot-de-passe-erroné{enter}`
    )

    cy.get('#cmn-ui-popup-messages').should('contain', 'mot de passe incorrect')
    cy.userRemove(utilisateur.email)
  })

  it('se connecte', function() {
    cy.userAdd(utilisateur)
    cy.visit('/')
    // cy.get('#cmn-user-button-connexion').click()
    cy.get('[data-cy=cmn-user-button-connexion]').click()

    cy.get('#cmn-user-login-popup-input-email').type(utilisateur.email)

    cy.get(
      '#cmn-user-login-popup-input-mot-de-passe'
    ).type(`${utilisateur.motDePasse}{enter}`, { log: false })

    // cy.get('#cmn-app-messages').should('contain', 'bienvenue')
    // cy.get('#cmn-app-messages').should('contain', 'liste de titres mise à jour')
    cy.get('[data-cy=cmn-app-messages]').should('contain', 'bienvenue')
    cy.get('[data-cy=cmn-app-messages]').should(
      'contain',
      'liste de titres mise à jour'
    )
    cy.userRemove(utilisateur.email)
  })

  it('se déconnecte', function() {
    cy.userAdd(utilisateur)
    cy.visit('/')
    cy.login(utilisateur.email, utilisateur.motDePasse).then(() => {
      cy.get('#cmn-user-button-menu').click()
      cy.get('#cmn-user-menu-button-deconnexion').click()
      // cy.get('#cmn-app-messages').should('contain', 'vous êtes déconnecté')
      cy.get('[data-cy=cmn-app-messages]').should(
        'contain',
        'vous êtes déconnecté'
      )
      cy.userRemove(utilisateur.email)
    })
  })

  it('définit une permission "entreprise"', function() {
    cy.userAdd(utilisateur)
    cy.visit('/')
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'), 'super')
    cy.visit('//utilisateurs')

    cy.contains(utilisateur.nom).click()

    cy.get('#cmn-utilisateur-button-popup-editer').click()
    cy.get('#cmn-utilisateur-edit-popup-permission-button-entreprise').click()
    cy.get('#cmn-utilisateur-edit-popup-entreprise-button-ajouter').click()
    cy.get('#cmn-utilisateur-edit-popup-entreprise-select').select(
      'fr-830984613'
    )
    cy.get('#cmn-utilisateur-edit-popup-button-enregistrer').click({
      force: true
    })
    // cy.get('#cmn-app-messages').should(
    cy.get('[data-cy=cmn-app-messages]').should(
      'contain',
      `l'utilisateur a été mis à jour`
    )
    cy.userRemove(utilisateur.email)
  })

  it('supprime son compte', function() {
    cy.userAdd(utilisateur)
    cy.visit('/')
    cy.login(utilisateur.email, utilisateur.motDePasse)

    cy.get('#cmn-user-button-menu').click()
    cy.get('#cmn-user-menu-a-utilisateur').click()
    cy.get('#cmn-utilisateur-button-popup-supprimer').click()
    cy.get('#cmn-utilisateur-remove-popup-button-supprimer').click({
      force: true
    })

    // cy.get('#cmn-app-messages').should('contain', 'vous êtes déconnecté')
    cy.get('[data-cy=cmn-app-messages]').should(
      'contain',
      'vous êtes déconnecté'
    )
    // cy.get('#cmn-app-messages').should(
    cy.get('[data-cy=cmn-app-messages]').should(
      'contain',
      `l'utilisateur ${utilisateur.prenom} ${utilisateur.nom} a été supprimé`
    )
    cy.userRemove(utilisateur.email)
  })
})
