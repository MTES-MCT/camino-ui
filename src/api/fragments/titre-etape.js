import gql from 'graphql-tag'
import { fragmentTitreAdministrations } from './administrations'
import { fragmentTitreEntreprises } from './entreprises'
import { fragmentTitreSubstance } from './substance'
import { fragmentPoint } from './point'
import { fragmentPays } from './pays'
import { fragmentUnite } from './metas'

import { fragmentDocument } from './documents'

const fragmentHeritageTitreEtape = gql`
  fragment heritageEtape on Etape {
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
    contenu
  }

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
`

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
    heritageProps {
      ...heritageProps
    }
    pays {
      ...pays
    }
    contenu

    modification
    suppression
    justificatifsAssociation
  }

  ${fragmentHeritageTitreEtape}

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

const fragmentTitreEtapeNouvelle = gql`
  fragment etapeNouvelle on EtapeNouvelle {
    date
    dateDebut
    dateFin
    duree
    surface

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
    heritageProps {
      ...heritageProps
    }
  }

  ${fragmentHeritageTitreEtape}

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentHeritageProps}
`

export { fragmentTitreEtape, fragmentTitreEtapeNouvelle }
