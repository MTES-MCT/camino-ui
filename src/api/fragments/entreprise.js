import gql from 'graphql-tag'

import { fragmentTitres } from './titre'
import { fragmentUtilisateur } from './utilisateur'
import { fragmentDocument } from './documents'

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

    documents {
      ...document
    }

    modification
  }

  ${fragmentTitres}
  ${fragmentUtilisateur}
  ${fragmentDocument}
`

export { fragmentEntreprise }
