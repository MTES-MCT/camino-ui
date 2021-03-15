import gql from 'graphql-tag'

import { fragmentTravauxType, fragmentDemarcheStatut } from './metas'

import { fragmentDocument } from './documents'

const fragmentTitreTravauxEtape = gql`
  fragment titreTravauxEtape on TravauxEtape {
    id
    ordre
    date
    duree
    surface
    type {
      id
      nom
      sections
    }
    statut {
      id
      nom
      couleur
    }
    contenu
    documents {
      ...document
    }

    modification
    suppression
    documentsCreation
  }

  ${fragmentDocument}
`

const fragmentTitreTravaux = gql`
  fragment titreTravaux on Travail {
    id
    ordre
    type {
      ...travauxType
    }
    statut {
      ...demarcheStatut
    }
    etapes {
      ...titreTravauxEtape
    }

    modification
    etapesCreation
    suppression
  }

  ${fragmentTitreTravauxEtape}
  ${fragmentTravauxType}
  ${fragmentDemarcheStatut}
`

export { fragmentTitreTravaux }
