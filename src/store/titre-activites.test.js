import titreActivites from './titre-activites'
import * as api from '../api/titre-activites'

jest.mock('../api/titre-activites', () => ({
  titreActiviteUpdate: jest.fn()
}))

describe('actions sur les activites des titres', () => {
  test("Update de l'activite fonctionne", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const activite = { id: 27, contenu: [], statut: { id: 28 } }
    const returnVariable = { confirmation: true }
    const apiSpy = api.titreActiviteUpdate.mockImplementation(
      ({ activite }) => returnVariable
    )
    await titreActivites.actions.update(
      { commit: commitSpy, dispatch: dispatchSpy },
      activite
    )
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 28 }
    })
    expect(dispatchSpy).toHaveBeenCalledTimes(2)
    expect(commitSpy).toHaveBeenCalledTimes(4)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'titreActiviteUpdate',
      {
        root: true
      }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      4,
      'loadingRemove',
      'titreActiviteUpdate',
      { root: true }
    )
    expect(dispatchSpy).toHaveBeenNthCalledWith(
      1,
      'messageAdd',
      {
        value:
          returnVariable && returnVariable.confirmation
            ? `l'activite a été validée`
            : `l'activite a été enregistrée`,
        type: 'success'
      },
      { root: true }
    )
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, 'titre/reload', null, {
      root: true
    })
  })
  test("Update de l'activite ne fonctionne pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const activite = { id: 27, contenu: [], statut: { id: 28 } }
    const returnVariable = undefined
    const apiSpy = api.titreActiviteUpdate.mockImplementation(
      ({ activite }) => returnVariable
    )
    await titreActivites.actions.update(
      { commit: commitSpy, dispatch: dispatchSpy },
      activite
    )
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 28 }
    })
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'titreActiviteUpdate',
      {
        root: true
      }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'loadingRemove',
      'titreActiviteUpdate',
      { root: true }
    )
  })
})
