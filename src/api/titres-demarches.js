import gql from 'graphql-tag'
import { apiMutate, apiQuery } from './_utils'

import { fragmentTitre } from './fragments/titre'
import { fragmentDemarcheType } from './fragments/metas'
import { fragmentDemarches } from './fragments/titres-demarches'

const metasDemarches = apiQuery(
  gql`
    query MetasDemarches {
      domaines {
        id
        nom
      }

      types {
        id
        nom
      }

      statuts {
        id
        nom
        couleur
      }

      demarchesTypes {
        id
        nom
      }

      demarchesStatuts {
        id
        nom
        couleur
      }

      etapesTypes {
        id
        nom
        etapesStatuts {
          id
          nom
          couleur
        }
      }
    }
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasTitreDemarche = apiQuery(
  gql`
    query MetasDemarche($titreId: ID!, $id: ID) {
      demarchesTypes(titreId: $titreId, titreDemarcheId: $id) {
        ...demarcheType
      }
    }

    ${fragmentDemarcheType}
  `,
  { fetchPolicy: 'network-only' }
)

const demarches = apiQuery(
  gql`
    query Demarches(
      $page: Int
      $intervalle: Int
      $colonne: String
      $ordre: String
      $titresDomainesIds: [ID!]
      $titresTypesIds: [ID!]
      $titresStatutsIds: [ID!]
      $typesIds: [ID!]
      $statutsIds: [ID!]
      $noms: String
      $entreprises: String
      $substances: String
      $references: String
      $territoires: String
      $etapesInclues: [InputEtapeFiltre!]
      $etapesExclues: [InputEtapeFiltre!]
    ) {
      demarches(
        page: $page
        intervalle: $intervalle
        colonne: $colonne
        ordre: $ordre
        titresDomainesIds: $titresDomainesIds
        titresTypesIds: $titresTypesIds
        titresStatutsIds: $titresStatutsIds
        typesIds: $typesIds
        statutsIds: $statutsIds
        noms: $noms
        entreprises: $entreprises
        substances: $substances
        references: $references
        territoires: $territoires
        etapesInclues: $etapesInclues
        etapesExclues: $etapesExclues
      ) {
        elements {
          ...demarches
        }
        total
      }
    }

    ${fragmentDemarches}
  `,
  { fetchPolicy: 'network-only' }
)

const demarcheCreer = apiMutate(gql`
  mutation DemarcheCreer($demarche: InputDemarcheCreation!) {
    demarcheCreer(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheModifier = apiMutate(gql`
  mutation DemarcheModifier($demarche: InputDemarcheModification!) {
    demarcheModifier(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheSupprimer = apiMutate(gql`
  mutation DemarcheSupprimer($id: ID!) {
    demarcheSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export {
  metasDemarches,
  demarches,
  metasTitreDemarche,
  demarcheCreer,
  demarcheModifier,
  demarcheSupprimer
}
