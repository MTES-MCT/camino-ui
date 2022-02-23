import gql from 'graphql-tag'
import { fragmentTitreAdministrations } from './administrations'
import { fragmentTitreEntreprises } from './entreprises'
import { fragmentTitreSubstance } from './substance'
import { fragmentPoint } from './point'
import { fragmentGeojsonMultiPolygon } from './geojson'
import { fragmentPays } from './pays'
import {
  fragmentDemarcheType,
  fragmentDocumentType,
  fragmentTitreType,
  fragmentUnite
} from './metas'

import { fragmentDocument } from './documents'

const fragmentIncertitudes = gql`
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
  }
`

// fragment qui représente l’étape dont on hérite sur une prop
const fragmentHeritageEtape = gql`
  fragment heritageEtape on Etape {
    id
    titreDemarcheId
    ordre
    date
    dateDebut
    dateFin
    duree
    surface
    incertitudes {
      ...incertitudes
    }
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
    contenu
  }

  ${fragmentIncertitudes}

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentUnite}
`

const fragmentHeritageProps = gql`
  fragment heritageProps on HeritageProps {
    dateDebut {
      ...heritageProp
    }
    dateFin {
      ...heritageProp
    }
    duree {
      ...heritageProp
    }
    surface {
      ...heritageProp
    }
    points {
      ...heritageProp
    }
    substances {
      ...heritageProp
    }
    titulaires {
      ...heritageProp
    }
    amodiataires {
      ...heritageProp
    }
  }

  fragment heritageProp on HeritageProp {
    etape {
      ...heritageEtape
    }
    actif
  }

  ${fragmentHeritageEtape}
`

const fragmentTitreEtape = gql`
  fragment titreEtape on Etape {
    id
    slug
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
      documentsTypes {
        ...documentType
      }
      justificatifsTypes {
        ...documentType
      }
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
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
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
    heritageProps {
      ...heritageProps
    }
    pays {
      ...pays
    }
    contenu
    heritageContenu
    decisionsAnnexesSections
    decisionsAnnexesContenu

    modification
    suppression
    deposable
  }

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentGeojsonMultiPolygon}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  ${fragmentDocument}

  ${fragmentHeritageProps}

  ${fragmentIncertitudes}

  ${fragmentDocumentType}
`

const fragmentEtapeHeritage = gql`
  fragment etapeHeritage on EtapeHeritage {
    dateDebut
    dateFin
    duree
    surface
    type {
      id
      nom
      sections
      documentsTypes {
        ...documentType
      }
      justificatifsTypes {
        ...documentType
      }
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

    contenu

    heritageProps {
      ...heritageProps
    }

    heritageContenu
  }

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentHeritageProps}

  ${fragmentDocumentType}
`

const fragmentEtape = gql`
  fragment etape on Etape {
    id
    slug
    titreDemarcheId
    demarche {
      id
      type {
        ...demarcheType
      }
      titre {
        id
        slug
        nom
        domaine {
          id
          nom
        }
        type {
          ...titreType
        }
      }
    }
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
      documentsTypes {
        ...documentType
      }
      justificatifsTypes {
        ...documentType
      }
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
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
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
    heritageProps {
      ...heritageProps
    }
    pays {
      ...pays
    }
    contenu
    heritageContenu
    decisionsAnnexesSections
    decisionsAnnexesContenu

    modification
    suppression
  }

  ${fragmentDemarcheType}

  ${fragmentTitreType}

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentGeojsonMultiPolygon}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  ${fragmentDocument}

  ${fragmentHeritageProps}

  ${fragmentIncertitudes}

  ${fragmentDocumentType}
`

export { fragmentTitreEtape, fragmentEtapeHeritage, fragmentEtape }
