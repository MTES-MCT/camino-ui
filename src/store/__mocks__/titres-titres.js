const state = {
  list: { length: true },
  filterIds: [
    'substances',
    'noms',
    'entreprises',
    'references',
    'territoires',
    'typeIds',
    'domaineIds',
    'statutIds'
  ]
}
const params = { noms: ['s'], domaineIds: ['c', 'w'], statutIds: ['val'] }

const rootState = {
  user: {
    preferences: {
      filtres: {
        noms: 's',
        entreprises: null,
        domaines: 'c,w',
        statuts: 'val',
        types: null,
        territoires: null,
        substances: null,
        references: null
      }
    }
  }
}

export { state, params, rootState }
