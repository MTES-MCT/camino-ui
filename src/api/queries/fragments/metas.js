import gql from 'graphql-tag'

const fragmentEtapeType = gql`
  fragment etapeType on EtapeType {
    id
    nom
    acceptationAuto
    ordre
    typeId
    etapesStatuts {
      id
      nom
      couleur
    }
    fondamentale
    sections
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
    etapesTypes {
      ...etapeType
    }
  }

  ${fragmentEtapeType}
`

const fragmentMeta = gql`
  fragment meta on Metas {
    documentsTypes {
      id
      nom
    }
    domaines {
      id
      nom
      types {
        id
        nom
      }
    }
    types {
      id
      nom
    }
    statuts {
      id
      nom
      couleur
    }
    devises {
      id
      nom
    }
    unites {
      ...unite
    }
    geoSystemes {
      id
      nom
      zone
      unite {
        ...unite
      }
    }
  }

  ${fragmentUnite}
`

export {
  fragmentMeta,
  fragmentUnite,
  fragmentDemarcheType,
  fragmentDemarcheStatut
}
