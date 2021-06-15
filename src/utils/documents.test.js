import { documentsRequiredAdd } from './documents'
import { TODAY } from './index'

describe('documents', () => {
  test('retourne un tableau vide si il n’y a aucun doc à ajouter', () => {
    expect(documentsRequiredAdd(undefined, undefined, true)).toEqual([])
  })

  test.each`
    userIsAdmin
    ${true}
    ${false}
  `('ajoute un document obligatoire manquant', ({ userIsAdmin }) => {
    expect(
      documentsRequiredAdd(
        undefined,
        [{ optionnel: false, id: 'aaa' }],
        userIsAdmin
      )
    ).toEqual([
      {
        date: TODAY,
        entreprisesLecture: userIsAdmin,
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        id: 'aaa',
        modification: true,
        publicLecture: false,
        suppression: false,
        type: {
          id: 'aaa',
          optionnel: false
        },
        typeId: 'aaa'
      }
    ])
  })

  test('supprime le document avec un type inexistant', () => {
    expect(
      documentsRequiredAdd(
        [{ typeId: 'aaa' }, { typeId: 'ddd' }],
        [{ optionnel: false, id: 'aaa' }],
        true
      )
    ).toEqual([
      {
        typeId: 'aaa',
        suppression: true
      }
    ])
  })
})
