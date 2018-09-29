
import graphqlClient from './_graphql-client'
import queryTitres from './queries/titres'
import queryTitre from './queries/titre'


const titres = async ({ typeIds, domaineIds, statutIds, substances, noms }) => {
  try {
    const res = await graphqlClient.query({
      query: queryTitres,
      variables: {
        typeIds,
        domaineIds,
        statutIds,
        substances,
        noms
      }
    })
    
    return res && res.data
  } catch (e) {
    console.log(e)
  }
}

const titre = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryTitre,
      variables: { id }
    })

    return res && res.data.titre
  } catch (e) {
    console.log(e)
  }
}

export { titre, titres }