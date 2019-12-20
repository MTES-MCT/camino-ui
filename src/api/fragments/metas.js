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
    typeId
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
  }
`

const fragmentActiviteType = gql`
  fragment activiteType on ActiviteType {
    id
    nom
    pays {
      id
      nom
    }
    frequence {
      id
      nom
      trimestres {
        id
        nom
        mois {
          id
          nom
        }
      }
      mois {
        id
        nom
      }
      annees {
        id
        nom
      }
    }
    sections
  }
`

export {
  fragmentActiviteType,
  fragmentEtapeType,
  fragmentPermission,
  fragmentUnite,
  fragmentDemarcheType,
  fragmentDemarcheStatut
}
