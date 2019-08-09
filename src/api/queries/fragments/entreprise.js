import gql from 'graphql-tag'

import fragmentTitres from './titres'

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
      id
      email
      nom
      prenom
    }
    titresTitulaire {
      ...titres
    }
    titresAmodiataire {
      ...titres
    }
  }

  ${fragmentTitres}
`

export default fragmentEntreprise
