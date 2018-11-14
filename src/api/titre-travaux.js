import graphqlClient from './_graphql-client'
import graphqlErrorThrow from '@/api/_error-throw'

import { mutationTitreTravauxRapportAjouter } from './queries/titre-travaux'

const titreTravauxRapportAdd = async ({ rapport }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreTravauxRapportAjouter,
      variables: { rapport }
    })

    return res && res.data && res.data.titreTravauxRapportAjouter
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { titreTravauxRapportAdd }
