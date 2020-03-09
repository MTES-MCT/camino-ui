import gql from 'graphql-tag'
import { fragmentTitreAdministrations } from './administrations'
import { fragmentTitreEntreprises } from './entreprises'
import { fragmentTitreSubstance } from './substance'
import { fragmentPoint } from './point'
import { fragmentPays } from './pays'
import { fragmentUnite } from './metas'

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
    incertitudes {
      ...incertitudes
    }
    pays {
      ...pays
    }
    contenu

    editable
    supprimable
  }

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  fragment document on Document {
    id
    nom
    type {
      id
      nom
    }
    fichier
    fichierTypeId
    url
    uri
    jorf
    nor
    public

    editable
    supprimable
  }

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
