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
    titreTypeId
    demarcheTypeId
    etapesStatuts {
      id
      nom
      couleur
    }
    fondamentale
    sections
    editable
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
    editable
    titreTypeId
  }
`

const fragmentTitreTypeType = gql`
  fragment titreTypeType on TitreTypeType {
    id
    nom
  }
`

const fragmentTitreType = gql`
  fragment titreType on TitreType {
    id
    type {
      ...titreTypeType
    }
  }
  ${fragmentTitreTypeType}
`

export {
  fragmentEtapeType,
  fragmentPermission,
  fragmentUnite,
  fragmentDemarcheType,
  fragmentDemarcheStatut,
  fragmentTitreTypeType,
  fragmentTitreType
}
