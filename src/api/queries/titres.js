import gql from 'graphql-tag'

const titres = gql`
  query Titres(
    $typeIds: [TypeId!]
    $domaineIds: [DomaineId!]
    $statutIds: [StatutId!]
    $substances: [String!]
    $noms: [String!]
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
    titres(
      typeIds: $typeIds
      domaineIds: $domaineIds
      statutIds: $statutIds
      substances: $substances
      noms: $noms
    ) {
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
      references {
        type
        valeur
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
        phase {
          dateDebut
          dateFin
          statut {
            id
            nom
            couleur
          }
        }
        etapes {
          id
          date
          dateDebut
          dateFin
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
          documents {
            ...document
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
    symbole
    gerep
    description
    legal {
      id
      nom
      description
      domaine {
        id
        nom
      }
      code {
        id
        nom
        description
        lien
      }
    }
  }

  fragment document on Document {
    id
    nom
    type
    url
    uri
    fichier
    jorf
    nor
  }
`

export default titres
