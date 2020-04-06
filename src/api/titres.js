import gql from 'graphql-tag'
import { apiQuery, apiMutate } from './_utils'

import { fragmentTitreTypeType } from './fragments/metas'
import { fragmentTitre, fragmentTitres } from './fragments/titre'

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
    fetchPolicy: 'network-only',
  }
)

const metasTitres = apiQuery(
  gql`
    query MetasTitres {
      domaines {
        id
        nom
        titresModification
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
    fetchPolicy: 'network-only',
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

const titres = apiQuery(
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
        ...titres
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
  titreCreer,
  titreModifier,
  titreSupprimer,
}
