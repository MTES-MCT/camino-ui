import map from './map'

jest.mock('../conf/map-tiles', () => [])

test('interactions avec la carte', () => {
  expect(map.state.current).toBeNull()
})
