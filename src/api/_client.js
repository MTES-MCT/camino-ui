import { print } from 'graphql/language/printer'
import fetchOptionsGraphQL from 'graphql-react/public/fetchOptionsGraphQL.js'
import fetchGraphQL from 'graphql-react/public/fetchGraphQL.js'
import Cache from 'graphql-react/public/Cache.js'
import Loading from 'graphql-react/public/Loading.js'
import LoadingCacheValue from 'graphql-react/public/LoadingCacheValue.js'

const apiUrl = '/apiUrl'
const cache = new Cache()
const loading = new Loading()

const errorThrow = e => {
  if (
    e.message === 'aborted' ||
    e.message === 'Fetch error.' ||
    e.message === 'Response JSON parse error.'
  )
    throw new Error('aborted')

  throw new Error(e.message || e.status)
}

const graphQLCall = async (
  url,
  query,
  variables,
  cacheKey = query.definitions[0].name.value
) => {
  const abortController = new AbortController()
  const fetchOptions = fetchOptionsGraphQL({
    query: print(query),
    variables
  })

  fetchOptions.signal = abortController.signal

  if (loading.store[cacheKey]) {
    loading.store[cacheKey].forEach(a => {
      a.abortController.abort()
    })
  }

  const req = fetchGraphQL(url, fetchOptions)

  const loadingCacheValue = new LoadingCacheValue(
    loading,
    cache,
    cacheKey,
    req,
    abortController
  )

  const res = await loadingCacheValue.promise

  if (res.errors?.length) {
    res.errors.forEach(e => {
      if (e.extensions && e.extensions.client && e.message === 'FETCH_ERROR')
        throw new Error('aborted')

      throw new Error(e.message)
    })
  }

  const data = res.data

  const keys = Object.keys(data)
  const dataContent = keys.length === 1 ? data[keys[0]] : data

  return dataContent
}

const apiGraphQLFetch = (query, cacheKey) => async variables => {
  try {
    return await graphQLCall(apiUrl, query, variables, cacheKey)
  } catch (e) {
    if (e.status === 401 || e.message === 'HTTP 401 status.') {
      // la session a été invalidée par un administrateur
      // ne sachant pas si il voit des informations confidentielles actuellement,
      // il est préférable de rafraichir totalement la page
      window.location.reload()
    } else {
      errorThrow(e)
    }
  }
}

export { apiGraphQLFetch, errorThrow }
