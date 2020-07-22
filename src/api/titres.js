import gql from 'graphql-tag'
import { apiFetch } from './_client'

import { fragmentTitreTypeType } from './fragments/metas'
import {
  fragmentTitre,
  fragmentTitres,
  fragmentTitresGeo
} from './fragments/titre'

const metasTitre = apiFetch(
  gql`
    query MetasTitre {
      referencesTypes {
        id
        nom
      }
    }
  `
)

const metasTitres = apiFetch(
  gql`
    query MetasTitres {
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

const titre = apiFetch(
  gql`
    query Titre($id: ID!) {
      titre(id: $id) {
        ...titre
      }
    }

    ${fragmentTitre}
  `
)

const titresGeo = apiFetch(
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

const titres = apiFetch(
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

const titreCreer = apiFetch(gql`
  mutation TitreCreer($titre: InputTitreCreation!) {
    titreCreer(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreModifier = apiFetch(gql`
  mutation TitreModifier($titre: InputTitreModification!) {
    titreModifier(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreSupprimer = apiFetch(gql`
  mutation TitreSupprimer($id: ID!) {
    titreSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export {
  metasTitre,
  metasTitres,
  titre,
  titres,
  titresGeo,
  titreCreer,
  titreModifier,
  titreSupprimer
}
