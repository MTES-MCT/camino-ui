import gql from 'graphql-tag'
import { fragmentTitreActivite } from './fragments/activite'

import { apiMutate } from './_utils'

const activiteModifier = apiMutate(gql`
  mutation ActiviteModifier($activite: InputActiviteModification!) {
    activiteModifier(activite: $activite) {
      ...titreActivite
    }
  }

  ${fragmentTitreActivite}
`)

export { activiteModifier }
