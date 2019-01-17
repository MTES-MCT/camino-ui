import graphqlClient from './_graphql-client'
import graphqlErrorThrow from '@/api/_error-throw'

import {
  queryTitre,
  queryTitres,
  mutationTitreEtapeModifier
} from './queries/titres'

const titre = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryTitre,
      variables: { id },
      fetchPolicy: 'network-only'
    })

    return res && res.data.titre
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const titres = async (
  { typeIds, domaineIds, statutIds, substances, noms, entreprises, references },
  fetchPolicy
) => {
  try {
    const options = {
      query: queryTitres,
      variables: {
        typeIds,
        domaineIds,
        statutIds,
        substances,
        noms,
        entreprises,
        references
      }
    }

    if (fetchPolicy) {
      options.fetchPolicy = fetchPolicy
    }

    const res = await graphqlClient.query(options)

    return res && res.data && res.data.titres
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const titreEtapeUpdate = async ({ etape }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreEtapeModifier,
      variables: { etape }
    })

    return res && res.data && res.data.titreEtapeModifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { titre, titres, titreEtapeUpdate }
