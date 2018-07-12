import gql from 'graphql-tag'

const titres = gql`
  query Titres(
    $typeIds: [TypeId!]
    $domaineIds: [DomaineId]
    $statutIds: [StatutId!]
  ) {
    statuts {
      id
      nom
      couleur
    }
    titres(typeIds: $typeIds, domaineIds: $domaineIds, statutIds: $statutIds) {
      id
      nom
      type {
        id
        nom
      }
      domaine {
        id
        nom
      }
      statut {
        id
        nom
        couleur
      }
      demarches {
        id
        type {
          id
          nom
        }
        statut {
          id
          nom
          couleur
        }
        etapes {
          id
          date
          duree
          surface
          type {
            id
            nom
          }
          statut {
            id
            nom
            couleur
          }
          emprise {
            id
            nom
          }
          titulaires {
            id
            nom
          }
          geojsonPoints {
            ...geojsonPoints
          }
          geojsonMultiPolygon {
            ...geojsonMultiPolygon
          }
          substances {
            ...substance
          }
        }
      }
    }
  }

  fragment geojsonMultiPolygon on GeojsonMultiPolygon {
    type
    geometry {
      type
      coordinates
    }
  }

  fragment geojsonPoints on GeojsonPoints {
    type
    features {
      type
      geometry {
        type
        coordinates
      }
    }
  }

  fragment substance on TitreSubstance {
    id
    nom
    connexe
    ordre
    domaine {
      id
      nom
    }
    type
    symbole
    alias
    gerep
    description
    legal {
      id
      nom
      description
      lien
    }
  }
`

export default titres
