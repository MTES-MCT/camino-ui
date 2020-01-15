import gql from 'graphql-tag'
import { fragmentActivite, fragmentTitreActivite } from './fragments/activite'

import { apiMutate, apiQuery } from './_utils'

const activiteModifier = apiMutate(gql`
  mutation ActiviteModifier($activite: InputActiviteModification!) {
    activiteModifier(activite: $activite) {
      ...titreActivite
    }
  }

  ${fragmentTitreActivite}
`)

const activites = apiQuery(
  gql`
    query Activites($typeId: ID!, $annee: Int!) {
      activites(typeId: $typeId, annee: $annee) {
        ...activite
      }
    }

    ${fragmentActivite}
  `,
  { fetchPolicy: 'network-only' }
)

const activite = apiQuery(
  gql`
    query Activite($id: ID!) {
      activite(id: $id) {
        ...activite
      }
    }

    ${fragmentActivite}
  `,
  { fetchPolicy: 'network-only' }
)

export { activite, activites, activiteModifier }
