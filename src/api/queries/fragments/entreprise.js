import gql from 'graphql-tag'

import fragmentTitres from './titres'
import {fragmentUtilisateur} from './utilisateur'

const fragmentEntreprise = gql`
  fragment entreprise on Entreprise {
    id
    nom
    paysId
    legalSiren
    legalEtranger
    legalForme
    adresse
    codePostal
    commune
    cedex
    url
    telephone
    email
    etablissements {
      id
      nom
      dateDebut
      dateFin
      legalSiret
    }
    utilisateurs {
      ...utilisateur
    }
    titresTitulaire {
      ...titres
    }
    titresAmodiataire {
      ...titres
    }
  }

  ${fragmentTitres}
  ${fragmentUtilisateur}
`

export default fragmentEntreprise
