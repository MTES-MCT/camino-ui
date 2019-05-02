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
  }
`

const fragmentDemarcheStatut = gql`
  fragment demarcheStatut on DemarcheStatut {
    id
    nom
    couleur
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
    demarchesStatuts {
      ...demarcheStatut
    }
    etapesTypes {
      ...etapeType
    }
  }

  ${fragmentEtapeType}
  ${fragmentDemarcheStatut}
`

const fragmentMeta = gql`
  fragment meta on Metas {
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
    volumeUnites {
      id
      nom
    }
    geoSystemes {
      id
      nom
      zone
      unite
    }
    emprises {
      id
      nom
    }
  }
`

export { fragmentMeta, fragmentDemarcheType, fragmentDemarcheStatut }
