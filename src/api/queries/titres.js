import gql from 'graphql-tag'

const titres = gql`
  query Titres(
    $typeIds: [TypeId!]
    $domaineIds: [DomaineId!]
    $statutIds: [StatutId!]
  ) {
    metas {
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
            ...entreprise
          }
          amodiataires {
            ...entreprise
          }
          utilisateurs {
            ...utilisateur
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

  fragment utilisateur on Utilisateur {
    id
    nom
    prenom
    email
    telephoneMobile
    telephoneFixe
    administrationId
    entrepriseId
  }

  fragment entreprise on Entreprise {
    id
    nom
    service
    site
    email
    telephone
    adresse1
    adresse2
    codePostal
    ville
    cedex
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
