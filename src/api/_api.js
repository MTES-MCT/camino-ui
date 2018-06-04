const baseUrl = process.env.BASE_URL

const titresNoms = [
  'per-bonneval',
  'conc-cerville-buissoncourt',
  'per-saint-just-en-brie',
  'conc-grand-serre',
  'conc-laconquillie',
  'per-lauterbourg',
  'per-pedral',
  'conc-saint-elie',
  'aex-crique-serpent',
  'aex-georgeon'
]

const mocksNoms = ['geothermie', 'hydrocarbures', 'mineraux', 'stockage']

const api = {
  titres() {
    return Promise.all([
      ...titresNoms.map(id =>
        fetch(`${baseUrl}data/titres/${id}.json`).then(r => r.json())
      )
    ]).then(r => r)
  },

  titre(id) {
    return fetch(`${baseUrl}data/titres/${id}.json`).then(r => r.json())
  },

  mocks() {
    return Promise.all([
      ...mocksNoms.map(id =>
        fetch(`${baseUrl}data/mocks/${id}.json`).then(r => r.json())
      )
    ]).then(r => ({
      type: 'FeatureCollection',
      features: r
    }))
  },

  mock(id) {
    return fetch(`${baseUrl}data/mocks/${id}.json`).then(r => r.json())
  }
}

export default api
