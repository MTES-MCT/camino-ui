import graphqlClient from './_graphql-client'
import errorLog from '@/api/_error-log'

import { mutationTitreTravauxRapportAjouter } from './queries/titre-travaux'

const titreTravauxRapportAdd = async ({ rapport }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationTitreTravauxRapportAjouter,
      variables: { rapport }
    })

    return res && res.data && res.data.titreTravauxRapportAjouter
  } catch (e) {
    errorLog(e, 'titreEtapeModifier')
  }
}

export { titreTravauxRapportAdd }
