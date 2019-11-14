import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import { mutationTitreActiviteModifier } from './queries/titre-activites'

const titreActiviteUpdate = async ({ activite }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreActiviteModifier,
      variables: { activite }
    })

    return res && res.data && res.data.titreActiviteModifier
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

export { titreActiviteUpdate }
