const baseUrl = process.env.BASE_URL

const titres = [
  'per-bonneval',
  'conc-cerville-buissoncourt',
  'per-saint-just-en-brie',
  'conc-grand-serre',
  'conc-laconquillie',
  'per-lauterbourg',
  'per-pedral',
  'conc-saint-elie'
]

const api = {
  titresGet() {
    return Promise.all([
      ...titres.map(id =>
        fetch(`${baseUrl}data/titres/${id}.json`).then(r => r.json())
      )
    ]).then(r => r)
  },

  titreGet(id) {
    return fetch(`${baseUrl}data/titres/${id}.json`).then(r => r.json())
  }
}

export default api
