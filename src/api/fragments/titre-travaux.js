import gql from 'graphql-tag'

import { fragmentDemarcheStatut, fragmentDocumentType } from './metas'

import { fragmentTravauxType } from './metas-travaux'

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
      documentsTypes {
        ...documentType
      }
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

  ${fragmentDocumentType}
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
