import gql from 'graphql-tag'
import { fragmentDemarches } from './fragments/demarches'

import { apiQuery } from './_utils'

const demarches = apiQuery(
  gql`
    query Demarches(
      $titreTypeIds: [ID]
      $titreDomaineIds: [ID]
      $titreStatutIds: [ID]
      $typeIds: [ID]
      $statutIds: [ID]
      $etapesIncluses: [InputEtapeFiltre]
      $etapesExcluses: [InputEtapeFiltre]
    ) {
      demarches(
        titreTypeIds: $titreTypeIds
        titreDomaineIds: $titreDomaineIds
        titreStatutIds: $titreStatutIds
        typeIds: $typeIds
        statutIds: $statutIds
        etapesIncluses: $etapesIncluses
        etapesExcluses: $etapesExcluses
      ) {
        ...demarches
      }
    }

    ${fragmentDemarches}
  `,
  { fetchPolicy: 'network-only' }
)

export { demarches }
