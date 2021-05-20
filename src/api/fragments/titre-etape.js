import gql from 'graphql-tag'
import { fragmentTitreAdministrations } from './administrations'
import { fragmentTitreEntreprises } from './entreprises'
import { fragmentTitreSubstance } from './substance'
import { fragmentPoint } from './point'
import { fragmentPays } from './pays'
import { fragmentDocumentType, fragmentUnite } from './metas'

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
const fragmentHeritageTitreEtape = gql`
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

  ${fragmentHeritageTitreEtape}
`

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
      documentsTypes {
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

    modification
    suppression
    justificatifsAssociation
    documentsCreation
  }

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  ${fragmentDocument}

  ${fragmentHeritageProps}

  ${fragmentIncertitudes}

  ${fragmentDocumentType}
`

const fragmentTitreEtapeHeritage = gql`
  fragment etapeHeritage on EtapeHeritage {
    dateDebut
    dateFin
    duree
    surface
    type {
      id
      sections
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
`

const fragmentTitreEtapeEdit = gql`
  fragment etapeEdit on Etape {
    id
    titreDemarcheId
    demarche {
      type {
        nom
      }
      titre {
        nom
        domaine {
          id
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
      id
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

    modification
    suppression
    justificatifsAssociation
    documentsCreation
  }

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  ${fragmentDocument}

  ${fragmentHeritageProps}

  ${fragmentIncertitudes}
`

export {
  fragmentTitreEtape,
  fragmentTitreEtapeHeritage,
  fragmentTitreEtapeEdit
}
