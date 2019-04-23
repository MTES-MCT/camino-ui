import graphqlClient from './_graphql-client'
import graphqlErrorThrow from '@/api/_error-throw'

import {
  queryTitre,
  queryTitres,
  mutationTitreEtapeModifier,
  mutationTitreEtapeSupprimer
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
  {
    typeIds,
    domaineIds,
    statutIds,
    substances,
    noms,
    entreprises,
    references,
    territoires
  },
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
        references,
        territoires
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

const titreEtapeRemove = async ({ etapeId }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreEtapeSupprimer,
      variables: { etapeId }
    })

    return res && res.data && res.data.titreEtapeSupprimer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { titre, titres, titreEtapeUpdate, titreEtapeRemove }
