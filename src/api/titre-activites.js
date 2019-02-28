import graphqlClient from './_graphql-client'
import graphqlErrorThrow from '@/api/_error-throw'

import { mutationTitreActivitesRapportModifier } from './queries/titre-activites'

const titreActivitesRapportUpdate = async ({ rapport }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreActivitesRapportModifier,
      variables: { rapport }
    })

    return res && res.data && res.data.titreActivitesRapportModifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { titreActivitesRapportUpdate }
