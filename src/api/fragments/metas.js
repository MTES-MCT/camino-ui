import gql from 'graphql-tag'

const fragmentPermission = gql`
  fragment permission on Permission {
    id
    nom
  }
`

const fragmentEtapeType = gql`
  fragment etapeType on EtapeType {
    id
    nom
    acceptationAuto
    ordre
    etapesStatuts {
      id
      nom
      couleur
    }
    fondamentale
    sections
    etapesCreation
  }
`

const fragmentDemarcheStatut = gql`
  fragment demarcheStatut on DemarcheStatut {
    id
    nom
    couleur
  }
`

const fragmentUnite = gql`
  fragment unite on Unite {
    id
    nom
    symbole
  }
`

const fragmentDemarcheType = gql`
  fragment demarcheType on DemarcheType {
    id
    nom
    ordre
    duree
    points
    substances
    titulaires
    renouvelable
    exception
    demarchesCreation
    titreTypeId
  }
`

const fragmentTitreTypeType = gql`
  fragment titreTypeType on TitreTypeType {
    id
    nom
    exploitation
  }
`

const fragmentTitreType = gql`
  fragment titreType on TitreType {
    id
    type {
      ...titreTypeType
    }
    titresCreation
  }
  ${fragmentTitreTypeType}
`

const fragmentTravauxType = gql`
  fragment travauxType on TravauxType {
    id
    nom
    ordre
    travauxCreation
  }
`

export {
  fragmentEtapeType,
  fragmentPermission,
  fragmentUnite,
  fragmentDemarcheType,
  fragmentDemarcheStatut,
  fragmentTitreTypeType,
  fragmentTitreType,
  fragmentTravauxType
}
