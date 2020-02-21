import gql from 'graphql-tag'
import { fragmentUtilisateur } from './utilisateur'

const fragmentAdministration = gql`
  fragment administration on Administration {
    id
    nom
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
  }

  ${fragmentUtilisateur}
`

export { fragmentAdministration }
