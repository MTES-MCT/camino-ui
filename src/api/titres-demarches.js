import gql from 'graphql-tag'
import { apiFetch } from './_client'

import { fragmentTitre } from './fragments/titre'
import { fragmentDemarcheType } from './fragments/metas'
import { fragmentDemarches } from './fragments/titres-demarches'

const metasDemarches = apiFetch(
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
  `
)

const metasTitreDemarche = apiFetch(
  gql`
    query MetasDemarche($titreId: ID!, $id: ID) {
      demarchesTypes(titreId: $titreId, titreDemarcheId: $id) {
        ...demarcheType
      }
    }

    ${fragmentDemarcheType}
  `
)

const demarches = apiFetch(
  gql`
    query Demarches(
      $page: Int
      $intervalle: Int
      $colonne: String
      $ordre: String
      $typesIds: [ID!]
      $statutsIds: [ID!]
      $etapesInclues: [InputEtapeFiltre!]
      $etapesExclues: [InputEtapeFiltre!]
      $titresDomainesIds: [ID!]
      $titresTypesIds: [ID!]
      $titresStatutsIds: [ID!]
      $titresNoms: String
      $titresEntreprises: String
      $titresSubstances: String
      $titresReferences: String
      $titresTerritoires: String
    ) {
      demarches(
        page: $page
        intervalle: $intervalle
        colonne: $colonne
        ordre: $ordre
        typesIds: $typesIds
        statutsIds: $statutsIds
        etapesInclues: $etapesInclues
        etapesExclues: $etapesExclues
        titresDomainesIds: $titresDomainesIds
        titresTypesIds: $titresTypesIds
        titresStatutsIds: $titresStatutsIds
        titresNoms: $titresNoms
        titresEntreprises: $titresEntreprises
        titresSubstances: $titresSubstances
        titresReferences: $titresReferences
        titresTerritoires: $titresTerritoires
      ) {
        elements {
          ...demarches
        }
        total
      }
    }

    ${fragmentDemarches}
  `
)

const demarcheCreer = apiFetch(gql`
  mutation DemarcheCreer($demarche: InputDemarcheCreation!) {
    demarcheCreer(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheModifier = apiFetch(gql`
  mutation DemarcheModifier($demarche: InputDemarcheModification!) {
    demarcheModifier(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheSupprimer = apiFetch(gql`
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
