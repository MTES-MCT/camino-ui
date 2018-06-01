import gql from 'graphql-tag'

const titres = gql`
  query Titres(
    $typeIds: [TypeId!]
    $domaineIds: [DomaineId]
    $statutIds: [StatutId!]
    $policeIds: [Boolean!]
  ) {
    titres(
      typeId: $typeIds
      domaineId: $domaineIds
      statutId: $statutIds
      police: $policeIds
    ) {
      id
      nom
      police
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
      }
      phases {
        geojsonPoints {
          type
          features {
            type
            geometry {
              type
              coordinates
            }
          }
        }
        geojsonMultiPolygon {
          type
          geometry {
            type
            coordinates
          }
        }
      }
      substancesPrincipales {
        ...sub
      }
      substancesConnexes {
        ...sub
      }
    }
  }

  fragment sub on Substance {
    id
    nom
    domaine
    type
    usage
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

const titre = gql`
  query Titre($id: String!) {
    titre(id: $id) {
      nom
      id
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
      }
      police
      phases {
        id
        date
        duree
        geojsonPoints {
          type
          features {
            type
            geometry {
              type
              coordinates
            }
          }
        }
        geojsonMultiPolygon {
          type
          geometry {
            type
            coordinates
          }
        }
      }
      substancesPrincipales {
        id
        nom
      }
    }
  }
`

export { titres, titre }
