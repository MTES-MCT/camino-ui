import graphqlClient from './_graphql-client'
import graphqlErrorThrow from '@/api/_error-throw'

import { mutationTitreTravauxRapportModifier } from './queries/titre-travaux'

const titreTravauxRapportUpdate = async ({ rapport }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreTravauxRapportModifier,
      variables: { rapport }
    })

    return res && res.data && res.data.titreTravauxRapportModifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { titreTravauxRapportUpdate }
