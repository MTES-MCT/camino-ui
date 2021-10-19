import gql from 'graphql-tag'
import { fragmentUtilisateur } from './utilisateur'

const fragmentAdministration = gql`
  fragment administration on Administration {
    id
    nom
    type {
      id
      nom
    }
    abreviation
    service
    adresse1
    adresse2
    codePostal
    commune
    cedex
    url
    telephone
    email
    utilisateurs {
      ...utilisateur
    }
    departement {
      id
      nom
    }
    region {
      id
      nom
    }
    titresTypes {
      id
      domaine {
        id
        nom
      }
      type {
        id
        nom
      }
      gestionnaire
      associee
    }
    titresTypesTitresStatuts {
      titreType {
        id
        domaine {
          id
          nom
        }
        type {
          id
          nom
        }
      }
      titreStatut {
        id
        nom
        couleur
      }
      titresModificationInterdit
      demarchesModificationInterdit
      etapesModificationInterdit
    }
    titresTypesEtapesTypes {
      titreType {
        id
        type {
          id
          nom
        }
        domaine {
          id
          nom
        }
      }
      etapeType {
        id
        nom
      }
      lectureInterdit
      creationInterdit
      modificationInterdit
    }

    activitesTypes {
      id
      nom
      lectureInterdit
      modificationInterdit
    }
    activitesTypesEmails {
      id
      email
    }

    modification
  }

  ${fragmentUtilisateur}
`

export { fragmentAdministration }
