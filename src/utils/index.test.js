import {
  dateFormat,
  textNumberFormat,
  textToNumberFormat,
  permissionsCheck,
  cloneAndClean,
  elementsFormat,
  paramsBuild
} from './index'

// dateFormat
describe('dateFormat', () => {
  const cases = [
    ['2020-01-01', '01/01/2020'],
    ['2020-11-16', '16/11/2020']
  ]

  test.each(cases)('formate la date %s en %s', (input, output) => {
    expect(dateFormat(input)).toEqual(output)
  })
})

// textNumberFormat et textToNumberFormat
describe('textNumberFormat et textToNumberFormat', () => {
  const cases = [
    ['1.2 34', { negative: false, integer: false }, '1,234', 1.234],
    ['-1.234', { negative: false, integer: false }, '1,234', 1.234],
    ['-1.234', { negative: true, integer: false }, '-1,234', -1.234],
    ['---1.234', { negative: true, integer: false }, '-1,234', -1.234],
    ['1.2 34', { negative: false, integer: true }, '1', 1],
    ['---1.2 34', { negative: false, integer: true }, '1', 1],
    ['1.2abc34', { negative: false, integer: false }, '1,234', 1.234],
    ['-1.2abc34', { negative: true, integer: false }, '-1,234', -1.234],
    ['-1.2abc34', { negative: false, integer: true }, '1', 1],
    ['-1.2abc34', { negative: true, integer: true }, '-1', -1],
    ['---1.2 34', { negative: true, integer: true }, '-1', -1],
    ['1.2abc.34', { negative: false, integer: false }, '1,234', 1.234],
    ['1,2ab c.,34', { negative: false, integer: false }, '1,234', 1.234],
    ['-1,2ab c.,34', { negative: false, integer: false }, '1,234', 1.234],
    ['-1,2ab c.,34', { negative: true, integer: false }, '-1,234', -1.234],
    ['-1,2ab c.,34', { negative: true, integer: true }, '-1', -1],
    ['azerty', { negative: true, integer: true }, '', null]
  ]

  test.each(cases)(
    'formate %s avec les options %o en texte %s',
    (input, options, resText, resNumber) => {
      expect(textNumberFormat(input, options)).toEqual(resText)
    }
  )

  test.each(cases)(
    'formate %s avec les options %o en nombre %i',
    (input, options, resText, resNumber) => {
      expect(textToNumberFormat(resText)).toEqual(resNumber)
    }
  )
})

// permissionsCheck
describe('permissionsCheck', () => {
  const cases = [
    [
      { permission: { id: 'admin' } },
      ['admin', 'defaut', 'editeur', 'entreprise', 'lecteur', 'super'],
      true
    ],
    [{ permission: { id: 'super' } }, ['admin', 'super'], true]
  ]

  test.each(cases)(
    'vérifie que %o appartient à la liste des permissions %o',
    (userPermissionId, permissions, res) => {
      expect(permissionsCheck(userPermissionId, permissions)).toBe(res)
    }
  )
})

describe('cloneAndClean', () => {
  test(`transforme un json en occultant les propriétés __typename`, () =>
    expect(
      cloneAndClean({ id: 'id', value: 'value', __typename: 'typename' })
    ).toEqual({ id: 'id', value: 'value', __typename: undefined }))
})

describe('elementsFormat', () => {
  const metas = {
    domaines: {
      c: 'carrières',
      f: 'combustibles fossiles',
      g: 'géothermie',
      h: 'hydrocarbures liquides ou gazeux',
      i: 'inconnu',
      m: 'minéraux et métaux',
      r: 'éléments radioactifs',
      s: 'stockages souterrains',
      w: 'granulats marins'
    },
    statuts: {},
    types: {}
  }

  const cases = [
    ['domaines', 'domainesIds'],
    ['statuts', 'statutsIds'],
    ['types', 'typesIds']
  ]

  test.each(cases)('formate les %s', (nom, id) => {
    expect(elementsFormat(id, metas)).toEqual(metas[nom])
  })
})

describe('paramsBuild', () => {
  const params = [
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    { id: 'colonne', type: 'string', elements: ['nom', 'type', 'abreviation'] },
    { id: 'ordre', type: 'string', elements: ['asc', 'desc'] },
    { id: 'typesIds', type: 'strings', elements: ['aaa', 'bbb'] },
    { id: 'noms', type: 'string' },
    { id: 'numbers', type: 'numbers' }
  ]

  const preferences = {
    page: 1,
    intervalle: 200,
    ordre: 'asc',
    colonne: 'type',
    noms: 'one two',
    typesIds: ['aaa'],
    numbers: ['1', '2']
  }

  test('formate les paramètres', () => {
    expect(paramsBuild(params, preferences)).toEqual({
      intervalle: 200,
      ordre: 'asc',
      page: 1,
      colonne: 'type',
      noms: 'one two',
      typesIds: ['aaa'],
      numbers: [1, 2]
    })
  })
})
