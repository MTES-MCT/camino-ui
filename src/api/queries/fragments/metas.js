import gql from 'graphql-tag'

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
  }
`

const fragmentMeta = gql`
  fragment meta on Metas {
    types {
      id
      nom
    }
    domaines {
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

export { fragmentMeta, fragmentDemarcheType }
