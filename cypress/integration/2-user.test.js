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

  beforeEach(function() {
    cy.fixture('init').as('init')
    cy.fixture('metas-titres-null').as('metasTitresNull')
    cy.fixture('moi-null').as('moiNull')
    cy.fixture('utilisateur-token-creer-defaut').as(
      'utilisateurTokenCreerDefaut'
    )
    cy.fixture('utilisateur-token-creer-super').as('utilisateurTokenCreerSuper')
    cy.fixture('utilisateur-token-creer-erreur-mot-de-passe').as(
      'utilisateurTokenCreerErreurMotDepasse'
    )
    cy.fixture('titres-null').as('titresNull')
    cy.fixture('titres-admin').as('titresAdmin')
    cy.fixture('utilisateur-creation-email-envoyer').as(
      'utilisateurCreationEmailEnvoyer'
    )
    cy.fixture('utilisateur-creer-defaut').as('utilisateurCreerDefaut')

    cy.fixture('_api-email').as('apiEmail')

    cy.fixture('utilisateur-defaut').as('utilisateurDefaut')
    cy.fixture('utilisateur-supprimer-defaut').as('utilisateurSupprimerDefaut')
    cy.fixture('utilisateurs-super').as('utilisateursSuper')
    cy.fixture('utilisateurs-null').as('utilisateursNull')
    cy.fixture('metas-utilisateur').as('metasUtilisateur')
    cy.fixture('utilisateur-modifier-entreprise').as(
      'utilisateurModifierEntreprise'
    )
  })

  it("s'envoie un email de création de compte", function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull,
      this.utilisateurCreationEmailEnvoyer
    ])
    cy.userRemove(utilisateur.email)
    cy.visit('http://localhost:8080')
    cy.get('#cmn-user-button-connexion').click()
    cy.get('#cmn-user-login-popup-button-creer-votre-compte').click()

    cy.get('#cmn-user-add-popup-input-email').type(utilisateur.email)

    cy.get('#cmn-user-add-popup-button-valider').click()

    cy.get('#cmn-app-messages').should(
      'contain',
      'un email pour créer votre compte a été envoyé'
    )
  })

  it('se crée un compte', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull,
      this.utilisateurCreerDefaut,
      this.utilisateurTokenCreerDefaut
    ])

    const url = Cypress.env('mock')
      ? `http://localhost:8080/creation-de-compte?token=token-stub&email=test%40${utilisateur.email}`
      : this.apiEmail.html.match(/"([^']*)"/)[1]

    cy.visit(url)

    cy.get('#cmn-user-add-input-prenom').type(utilisateur.prenom)
    cy.get('#cmn-user-add-input-nom').type(utilisateur.nom)
    cy.get('#cmn-user-add-input-mot-de-passe').type(utilisateur.motDePasse)
    cy.get('#cmn-user-add-checkbox-cgu').check()

    cy.get('#cmn-user-add-button-enregistrer').click()

    cy.get('#cmn-app-messages').should('contain', 'bienvenue Martin Delgado')

    cy.userRemove(utilisateur.email)
  })

  it('se connecte (erreur: mot de passe)', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull,
      this.utilisateurTokenCreerErreurMotDepasse
    ])
    cy.visit('http://localhost:8080')
    cy.userAdd(utilisateur, 'defaut')

    cy.get('#cmn-user-button-connexion').click()

    cy.get('#cmn-user-login-popup-input-email').type(utilisateur.email)

    cy.get('#cmn-user-login-popup-input-mot-de-passe').type(
      `mot-de-passe-erroné{enter}`
    )

    cy.get('#cmn-ui-popup-messages').should('contain', 'mot de passe incorrect')

    cy.userRemove(utilisateur.email)
  })

  it('se connecte', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull,
      this.utilisateurTokenCreerDefaut,
      this.metasTitresNull,
      this.titresNull
    ])
    cy.visit('http://localhost:8080')
    cy.userAdd(utilisateur, 'defaut')

    cy.get('#cmn-user-button-connexion').click()

    cy.get('#cmn-user-login-popup-input-email').type(utilisateur.email)

    cy.get(
      '#cmn-user-login-popup-input-mot-de-passe'
    ).type(`${utilisateur.motDePasse}{enter}`, { log: false })

    cy.get('#cmn-app-messages').should('contain', 'bienvenue')
    cy.get('#cmn-app-messages').should('contain', 'liste de titres mise à jour')

    cy.userRemove(utilisateur.email)
  })

  it('se déconnecte', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull,
      this.metasTitresNull,
      this.titresNull,
      this.metasTitresNull,
      this.titresNull
    ])
    cy.visit('http://localhost:8080')
    cy.userAdd(utilisateur, 'defaut')
    cy.login(utilisateur.email, utilisateur.motDePasse, 'defaut')

    cy.get('#cmn-user-button-menu').click()
    cy.get('#cmn-user-menu-button-deconnexion').click()
    cy.get('#cmn-app-messages').should('contain', 'vous êtes déconnecté')
    cy.userRemove(utilisateur.email)
  })

  it('définit une permission "entreprise"', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.utilisateursNull,
      this.utilisateursSuper,
      this.utilisateurDefaut,
      this.metasUtilisateur,
      this.utilisateurModifierEntreprise
    ])
    cy.visit('http://localhost:8080/utilisateurs')
    cy.userAdd(utilisateur, 'defaut')
    cy.login(
      Cypress.env('userSuperEmail'),
      Cypress.env('userSuperMotDePasse'),
      'super'
    )

    cy.contains(utilisateur.nom).click()

    cy.get('#cmn-utilisateur-button-popup-editer').click()
    cy.get('#cmn-utilisateur-edit-popup-permission-button-entreprise').click()
    cy.get('#cmn-utilisateur-edit-popup-entreprise-button-ajouter').click()
    cy.get('#cmn-utilisateur-edit-popup-entreprise-select').select(
      'fr-830984613'
    )
    cy.get('#cmn-utilisateur-edit-popup-button-enregistrer').click()
    cy.get('#cmn-app-messages').should(
      'contain',
      `utilisateur ${utilisateur.prenom} ${utilisateur.nom} mis à jour`
    )
    cy.userRemove(utilisateur.email)
  })

  it('supprime son compte', function() {
    cy.mockGraphQL([
      this.init,
      this.moiNull,
      this.metasTitresNull,
      this.titresNull,
      this.metasTitresNull,
      this.titresNull,
      this.utilisateurDefaut,
      this.utilisateurSupprimerDefaut,
      this.utilisateursNull
    ])
    cy.visit('http://localhost:8080')
    cy.userAdd(utilisateur, 'defaut')
    cy.login(utilisateur.email, utilisateur.motDePasse, 'defaut')

    cy.get('#cmn-user-button-menu').click()
    cy.get('#cmn-user-menu-a-utilisateur').click()
    cy.get('#cmn-utilisateur-button-popup-supprimer').click()
    cy.get('#cmn-utilisateur-remove-popup-button-supprimer').click()

    cy.get('#cmn-app-messages').should('contain', 'vous êtes déconnecté')

    cy.get('#cmn-app-messages').should(
      'contain',
      `utilisateur ${utilisateur.prenom} ${utilisateur.nom} supprimé`
    )
  })
})
