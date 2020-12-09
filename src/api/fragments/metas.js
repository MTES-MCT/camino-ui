import gql from 'graphql-tag'

const fragmentPermission = gql`
  fragment permission on Permission {
    id
    nom
  }
`

const fragmentTitreTypeType = gql`
  fragment titreTypeType on TitreTypeType {
    id
    nom
    description
    ordre
  }
`

const fragmentTitreStatut = gql`
  fragment titreStatut on TitreStatut {
    id
    nom
    description
    couleur
    ordre
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
    description
    couleur
    ordre
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
    description
    ordre
    duree
    points
    substances
    titulaires
    exception
    renouvelable
    demarchesCreation
    titreTypeId
  }
`

const fragmentTravauxType = gql`
  fragment travauxType on TravauxType {
    id
    nom
    ordre
    travauxCreation
  }
`

const fragmentDomaine = gql`
  fragment domaine on Domaine {
    id
    nom
    description
    ordre
  }
`

const fragmentDefinition = gql`
  fragment definition on Definition {
    id
    nom
    slug
    description
    couleur
    ordre
    elements {
      id
      nom
      description
      couleur
    }
  }
`

export {
  fragmentTitreTypeType,
  fragmentTitreStatut,
  fragmentEtapeType,
  fragmentPermission,
  fragmentUnite,
  fragmentDemarcheType,
  fragmentDemarcheStatut,
  fragmentTitreType,
  fragmentTravauxType,
  fragmentDomaine,
  fragmentDefinition
}
