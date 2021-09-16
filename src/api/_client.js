import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import fetchOptionsGraphQL from 'graphql-react/public/fetchOptionsGraphQL.js'
import fetchGraphQL from 'graphql-react/public/fetchGraphQL.js'
import Cache from 'graphql-react/public/Cache.js'
import Loading from 'graphql-react/public/Loading.js'
import LoadingCacheValue from 'graphql-react/public/LoadingCacheValue.js'
import { fragmentUtilisateurToken } from './fragments/utilisateur'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'

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

const authorizationGet = () => {
  const token = localStorage.getItem('accessToken')
  const authorization = token ? `Bearer ${token}` : ''

  return authorization
}

const restCall = async (url, path) => {
  const authorization = authorizationGet()

  const res = await fetch(`${url}/${path}`, {
    method: 'GET',
    headers: new Headers({ authorization })
  })

  if (res.status !== 200) {
    throw res
  }

  return res
}

const restUpload = document => {
  const uppy = new Uppy({ autoProceed: true })
  uppy.use(Tus, { endpoint: 'http://localhost:4000/uploads' })
  uppy.addFile({
    name: document.name,
    data: document
  })
  return uppy
}

const graphQLCall = async (url, query, variables) => {
  const authorization = authorizationGet()
  const abortController = new AbortController()
  const fetchOptions = fetchOptionsGraphQL({
    query: print(query),
    variables
  })

  fetchOptions.signal = abortController.signal
  fetchOptions.headers = Object.assign(fetchOptions.headers, { authorization })

  const cacheKey = query.definitions[0].name.value

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

const apiFetch = async (call, query, variables) => {
  try {
    return await call(apiUrl, query, variables)
  } catch (e) {
    if (e.status === 401 || e.message === 'HTTP 401 status.') {
      await tokenRefresh()
      return await call(apiUrl, query, variables)
    } else {
      errorThrow(e)
    }
  }
}

const apiGraphQLFetch = query => async variables =>
  apiFetch(graphQLCall, query, variables)

const apiRestFetch = path => apiFetch(restCall, path)

const utilisateurTokenRafraichir = gql`
  mutation UtilisateurTokenRafraichir($refreshToken: String!) {
    utilisateurTokenRafraichir(refreshToken: $refreshToken) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`

const tokenRefresh = async () => {
  try {
    localStorage.removeItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    // On ne peut pas utiliser apiGraphQLFetch, car ça pourrait générer une boucle infinie
    const data = await graphQLCall(apiUrl, utilisateurTokenRafraichir, {
      refreshToken
    })
    localStorage.setItem('accessToken', data.accessToken)
  } catch (e) {
    // Si on est incapable de rafraichir le token c’est que la session a été invalidée par un administrateur
    // ne sachant pas si il voit des informations confidentielles actuellement,
    // il est préférable de rafraichir totalement la page
    window.location.reload()
  }
}

export { apiGraphQLFetch, apiRestFetch, restUpload }
