import gql from 'graphql-tag'
import { fragmentTitreAdministrations } from './administrations'
import { fragmentTitreEntreprises } from './entreprises'
import { fragmentTitreSubstance } from './substance'
import { fragmentPoint } from './point'
import { fragmentPays } from './pays'
import { fragmentUnite } from './metas'

import { fragmentDocument } from './documents'

const fragmentTitreEtape = gql`
  fragment etape on Etape {
    id
    ordre
    date
    dateDebut
    dateFin
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
    administrations {
      ...titreAdministrations
    }
    titulaires {
      ...titreEntreprises
    }
    amodiataires {
      ...titreEntreprises
    }
    points {
      ...point
    }
    substances {
      ...titreSubstance
    }
    documents {
      ...document
    }
    justificatifs {
      ...document
    }
    incertitudes {
      ...incertitudes
    }
    pays {
      ...pays
    }
    contenu

    modification
    suppression
  }

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  ${fragmentDocument}

  fragment incertitudes on Incertitudes {
    date
    dateDebut
    dateFin
    duree
    surface
    points
    substances
    titulaires
    amodiataires
    administrations
  }
`

export { fragmentTitreEtape }
