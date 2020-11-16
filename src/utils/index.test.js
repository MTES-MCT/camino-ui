import {
  dateFormat,
  numberFormat,
  textNumberFormat,
  textToNumberFormat,
  permissionsCheck,
  typenameOmit,
  jsonTypenameOmit,
  elementsFormat
} from './index'

const each = require('jest-each').default

// dateFormat
each([
  ['2020-01-01', '01/01/2020'],
  ['2020-11-16', '16/11/2020']
]).describe('dateFormat : formatage de %s en %s', (input, output) => {
  test(`formate correctement ${input} en ${output}`, () =>
    expect(dateFormat(input)).toEqual(output))
})

// numberFormat
each([
  [123, '123'],
  [1234, '1 234'],
  [1234567, '1 234 567'],
  [1234567890123456, '1 234 567 890 123 456'], // limite max : 21 caractères
  [123456789012345678, '123 456 789 012 345 680'] // arrondi au delà de 21 caractères
]).describe('numberFormat : formatage de %s en %s', (input, output) => {
  test(`formate correctement ${input} en ${output}`, () =>
    expect(numberFormat(input)).toEqual(output))
})

// textNumberFormat et textToNumberFormat
each([
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
  ['azerty', { negative: true, integer: true }, '', undefined]
]).describe(
  "textNumberFormat et textToNumberFormat : formatage de '%s' avec les options %s en '%s' coté front et %d coté back",
  (input, options, frontValue, backValue) => {
    test(`formate correctement '${input}' en '${frontValue}' coté front`, () =>
      expect(textNumberFormat(input, options)).toEqual(frontValue))
    test(`formate correctement '${frontValue}' en ${backValue} coté back`, () =>
      expect(textToNumberFormat(frontValue)).toEqual(backValue))
  }
)

// permissionsCheck
each([
  [
    { id: 'admin' },
    ['admin', 'defaut', 'editeur', 'entreprise', 'lecteur', 'super']
  ],
  [{ id: 'super' }, ['admin', 'super']]
]).describe(
  "permissionsCheck : vérifie qu'un utilisateur a les permissions nécessaires",
  (userPermission, permissions) => {
    test(`vérifie que ${userPermission.id} appartient à la liste des permissions ${permissions}`, () =>
      expect(permissionsCheck(userPermission, permissions)).toBe(true))
  }
)

// typenameOmit
// each([
//   ['id', 'value', 'value'],
//   ['__typename', 'value', undefined]
// ]).describe(
//   "typenameOmit : renvoie la valeur d'un objet si la clé n'est pas __typename, sinon undefined",
//   (key, value, result) => {
//     test(`le couple (${key},${value}) renvoie ${result}`, () =>
//       expect(typenameOmit(key, value)).toEqual(result))
//   }
// )

// jsonTypenameOmit
each([
  [
    { id: 'id', value: 'value', __typename: 'typename' },
    { id: 'id', value: 'value', __typename: undefined }
  ]
]).describe(
  'jsonTypenameOmit : transforme un json en occultant les __typename',
  (json, result) => {
    test(`les __typename sont occultés`, () =>
      expect(jsonTypenameOmit(json)).toEqual(result))
  }
)

// elementsFormat
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

each([
  ['domaines', 'domainesIds', metas],
  ['statuts', 'statutsIds', metas],
  ['types', 'typesIds', metas]
]).describe('récupère les éléments de type metas', (nom, id, metas) => {
  test(`récupère les ${nom}`, () =>
    expect(elementsFormat(id, metas)).toEqual(metas[nom]))
})
