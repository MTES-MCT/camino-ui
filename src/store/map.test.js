import map from './map'

jest.mock('../conf/map-tiles', () => [])

describe('état de la carte', () => {
  test("retourne l'état par défaut", () => {
    expect(map.state.current).toBeNull()
  })
})
