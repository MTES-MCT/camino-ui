import graphqlClient from './_graphql-client'
import { queryTitre, queryTitres } from './queries/titres'

const titre = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryTitre,
      variables: { id }
    })

    return res && res.data.titre
  } catch (e) {
    console.log({ e })
  }
}

const titres = async (
  { typeIds, domaineIds, statutIds, substances, noms },
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
        noms
      }
    }

    if (fetchPolicy) {
      options.fetchPolicy = fetchPolicy
    }

    const res = await graphqlClient.query(options)

    return res && res.data
  } catch (e) {
    console.log({ e })
  }
}

export { titre, titres }
