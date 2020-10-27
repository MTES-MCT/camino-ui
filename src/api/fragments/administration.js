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
    modification
  }

  ${fragmentUtilisateur}
`

export { fragmentAdministration }
