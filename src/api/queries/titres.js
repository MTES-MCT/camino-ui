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
      ...meta
    }
    titres(
      typeIds: $typeIds
      domaineIds: $domaineIds
      statutIds: $statutIds
      substances: $substances
      noms: $noms
    ) {
      ...titre
    }
  }

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
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
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
  }

  fragment geojsonMultiPolygon on GeojsonMultiPolygon {
    type
    geometry {
      type
      coordinates
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
`

export default titres
