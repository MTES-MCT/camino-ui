import graphqlClient from './_graphql-client'
import errorLog from '@/api/_error-log'

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
    errorLog(e, 'titre')
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

    return res && res.data && res.data.titres
  } catch (e) {
    errorLog(e, 'titres')
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
    errorLog(e, 'titreEtapeUpdate')
  }
}

export { titre, titres, titreEtapeUpdate }
