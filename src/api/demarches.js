import gql from 'graphql-tag'
import { fragmentDemarches } from './fragments/demarches'

import { apiQuery } from './_utils'

const demarches = apiQuery(
  gql`
    query Demarches(
      $titresDomaineIds: [ID]
      $titresTypeIds: [ID]
      $titresStatutIds: [ID]
      $typeIds: [ID]
      $statutIds: [ID]
      $etapesInclues: [InputEtapeFiltre]
      $etapesExclues: [InputEtapeFiltre]
    ) {
      demarches(
        titresDomaineIds: $titresDomaineIds
        titresTypeIds: $titresTypeIds
        titresStatutIds: $titresStatutIds
        typeIds: $typeIds
        statutIds: $statutIds
        etapesInclues: $etapesInclues
        etapesExclues: $etapesExclues
      ) {
        ...demarches
      }
    }

    ${fragmentDemarches}
  `,
  { fetchPolicy: 'network-only' }
)

export { demarches }
