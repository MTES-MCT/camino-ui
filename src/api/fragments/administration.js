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

const fragmentTitreAdministrations = gql`
  fragment titreAdministrations on Administration {
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
  }
`

const fragmentTitresAdministrations = gql`
  fragment titresAdministrations on Administration {
    id
    nom
  }
`

export {
  fragmentAdministration,
  fragmentTitreAdministrations,
  fragmentTitresAdministrations
}
