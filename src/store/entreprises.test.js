import entreprises from './entreprises'
import * as Vue from 'vue'

jest.mock('vue', () => ({
  set: jest.fn()
}))

describe('mutations des entreprises', () => {
  test('permet de visionner les entreprises', () => {
    const entreprise = []
    const apiSpy = Vue.set.mockImplementation(
      (state, current, entreprise) => true
    )
    entreprises.mutations.set('state', entreprise)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'list', entreprise)
  })
})
