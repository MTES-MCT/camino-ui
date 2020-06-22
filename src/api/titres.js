import gql from 'graphql-tag'
import { apiQuery, apiMutate } from './_utils'

import { fragmentTitreTypeType } from './fragments/metas'
import {
  fragmentTitre,
  fragmentTitres,
  fragmentTitresGeo
} from './fragments/titre'

const metasTitre = apiQuery(
  gql`
    query MetasTitre {
      referencesTypes {
        id
        nom
      }
    }
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasTitres = apiQuery(
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
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const titre = apiQuery(
  gql`
    query Titre($id: ID!) {
      titre(id: $id) {
        ...titre
      }
    }

    ${fragmentTitre}
  `,
  { fetchPolicy: 'network-only' }
)

const titresGeo = apiQuery(
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
      ) {
        elements {
          ...titresGeo
        }
        total
      }
    }

    ${fragmentTitresGeo}
  `,
  { fetchPolicy: 'network-only' }
)

const titres = apiQuery(
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
  `,
  { fetchPolicy: 'network-only' }
)

const titreCreer = apiMutate(gql`
  mutation TitreCreer($titre: InputTitreCreation!) {
    titreCreer(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreModifier = apiMutate(gql`
  mutation TitreModifier($titre: InputTitreModification!) {
    titreModifier(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreSupprimer = apiMutate(gql`
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
