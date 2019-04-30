const state = {
  domaines: [{ id: 'c' }, { id: 'w' }],
  statuts: [],
  types: []
}

const rootState = {
  user: {
    preferences: {
      filtres: {
        domaines: 'c,w',
        statuts: 'val',
        types: null
      }
    }
  }
}

export { state, rootState }
