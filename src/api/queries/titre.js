import gql from 'graphql-tag'

const titre = gql`
  query Titre($id: String!) {
    titre(id: $id) {
      ...titre
    }
  }

  fragment titre on Titre {
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
    substances {
      ...substance
    }
    administrations {
      ...administration
    }
    titulaires {
      ...entreprise
    }
    amodiataires {
      ...entreprise
    }
    points {
      ...point
    }
    geojsonPoints {
      ...geojsonPoints
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
    demarches {
      ...demarche
    }
  }

  fragment demarche on Demarche {
    id
    ordre
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
      ...etape
    }
  }

  fragment etape on Etape {
    id
    ordre
    date
    duree
    surface
    volume
    volumeUnite
    visas
    engagement
    engagementDevise
    sourceIndisponible
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
    administrations {
      ...administration
    }
    titulaires {
      ...entreprise
    }
    amodiataires {
      ...entreprise
    }
    points {
      ...point
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

  fragment administration on Administration {
    id
    nom
    service
    adresse1
    adresse2
    codePostal
    ville
    cedex
    url
    telephone
    email
    utilisateurs {
      ...utilisateur
    }
  }

  fragment entreprise on Entreprise {
    id
    nom
    raisonSociale
    paysId
    legalSiren
    legalEtranger
    legalForme
    voieNumero
    voieType
    voieNom
    adresseComplement
    codePostal
    ville
    cedex
    url
    telephone
    email
    utilisateurs {
      ...utilisateur
    }
  }

  fragment utilisateur on Utilisateur {
    id
    email
    nom
    prenom
    telephoneMobile
    telephoneFixe
    entrepriseId
    groupes {
      ...groupe
    }
  }

  fragment groupe on Groupe {
    id
    nom
  }

  fragment point on Point {
    id
    coordonees {
      x
      y
    }
    groupe
    contour
    point
    nom
    description
    securite
    references {
      ...pointReference
    }
  }

  fragment pointReference on PointReference {
    id
    systeme
    coordonees {
      x
      y
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
    gerep
    description
    legales {
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

export default titre
