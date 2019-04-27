import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import {
  queryTitre,
  queryTitres,
  mutationTitreModifier,
  mutationTitreSupprimer,
  mutationTitreDemarcheModifier,
  mutationTitreDemarcheSupprimer,
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

const titreUpdate = async ({ titre }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreModifier,
      variables: { titre }
    })

    return res && res.data && res.data.titreModifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const titreRemove = async ({ id }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreSupprimer,
      variables: { id }
    })

    return res && res.data && res.data.titreSupprimer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const titreDemarcheUpdate = async ({ demarche }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreDemarcheModifier,
      variables: { demarche }
    })

    return res && res.data && res.data.titreDemarcheModifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const titreDemarcheRemove = async ({ id }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreDemarcheSupprimer,
      variables: { id }
    })

    return res && res.data && res.data.titreDemarcheSupprimer
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

const titreEtapeRemove = async ({ id }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreEtapeSupprimer,
      variables: { id }
    })

    return res && res.data && res.data.titreEtapeSupprimer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export {
  titre,
  titres,
  titreUpdate,
  titreRemove,
  titreDemarcheUpdate,
  titreDemarcheRemove,
  titreEtapeUpdate,
  titreEtapeRemove
}
