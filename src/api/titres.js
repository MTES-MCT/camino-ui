import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentTitreTypeType } from './fragments/metas'
import {
  fragmentTitre,
  fragmentTitres,
  fragmentTitresGeo,
  fragmentTitresGeoPolygon
} from './fragments/titre'

const titreMetas = apiGraphQLFetch(
  gql`
    query MetasTitre {
      referencesTypes {
        id
        nom
      }
    }
  `
)

const titresMetas = apiGraphQLFetch(
  gql`
    query TitresMetas {
      domaines {
        id
        nom
        titresCreation
      }

      types {
        ...titreTypeType
      }

      statuts {
        id
        nom
        couleur
      }
    }

    ${fragmentTitreTypeType}
  `
)

const titre = apiGraphQLFetch(
  gql`
    query Titre($id: ID!) {
      titre(id: $id) {
        ...titre
      }
    }

    ${fragmentTitre}
  `
)

const titresGeoPolygon = apiGraphQLFetch(
  gql`
    query Titres(
      $typesIds: [ID!]
      $domainesIds: [ID!]
      $statutsIds: [ID!]
      $substances: String
      $noms: String
      $entreprises: String
      $references: String
      $territoires: String
      $perimetre: [Float!]
    ) {
      titres(
        typesIds: $typesIds
        domainesIds: $domainesIds
        statutsIds: $statutsIds
        substances: $substances
        noms: $noms
        entreprises: $entreprises
        references: $references
        territoires: $territoires
        perimetre: $perimetre
      ) {
        elements {
          ...titresGeoPolygon
        }
        total
      }
    }

    ${fragmentTitresGeoPolygon}
  `
)

const titresGeo = apiGraphQLFetch(
  gql`
    query Titres(
      $typesIds: [ID!]
      $domainesIds: [ID!]
      $statutsIds: [ID!]
      $substances: String
      $noms: String
      $entreprises: String
      $references: String
      $territoires: String
      $perimetre: [Float!]
    ) {
      titres(
        typesIds: $typesIds
        domainesIds: $domainesIds
        statutsIds: $statutsIds
        substances: $substances
        noms: $noms
        entreprises: $entreprises
        references: $references
        territoires: $territoires
        perimetre: $perimetre
      ) {
        elements {
          ...titresGeo
        }
        total
      }
    }

    ${fragmentTitresGeo}
  `
)

const titres = apiGraphQLFetch(
  gql`
    query Titres(
      $intervalle: Int
      $page: Int
      $colonne: String
      $ordre: String
      $typesIds: [ID!]
      $domainesIds: [ID!]
      $statutsIds: [ID!]
      $substances: String
      $noms: String
      $entreprises: String
      $references: String
      $territoires: String
    ) {
      titres(
        intervalle: $intervalle
        page: $page
        colonne: $colonne
        ordre: $ordre
        typesIds: $typesIds
        domainesIds: $domainesIds
        statutsIds: $statutsIds
        substances: $substances
        noms: $noms
        entreprises: $entreprises
        references: $references
        territoires: $territoires
      ) {
        elements {
          ...titres
        }
        total
      }
    }

    ${fragmentTitres}
  `
)

const titreCreer = apiGraphQLFetch(gql`
  mutation TitreCreer($titre: InputTitreCreation!) {
    titreCreer(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreModifier = apiGraphQLFetch(gql`
  mutation TitreModifier($titre: InputTitreModification!) {
    titreModifier(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreSupprimer = apiGraphQLFetch(gql`
  mutation TitreSupprimer($id: ID!) {
    titreSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export {
  titreMetas,
  titresMetas,
  titre,
  titres,
  titresGeo,
  titresGeoPolygon,
  titreCreer,
  titreModifier,
  titreSupprimer
}
