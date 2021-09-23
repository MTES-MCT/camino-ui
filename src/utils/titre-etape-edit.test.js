import { etapeEditFormat } from './titre-etape-edit'

// dateFormat
describe('etapeEditFormat', () => {
  test("formate une étape pour l'éditer", () => {
    expect(
      etapeEditFormat({
        __typename: 'etape',
        id: 'etape-id'
      })
    ).toEqual({
      id: 'etape-id',
      statutId: '',
      duree: { ans: null, mois: null },
      amodiataires: [],
      titulaires: [],
      geoSystemeIds: [],
      geoSystemeOpposableId: null,
      groupes: [],
      substances: [],
      contenu: {},
      incertitudes: {},
      documents: [],
      justificatifs: []
    })

    expect(
      etapeEditFormat({
        __typename: 'etape',
        id: 'etape-id',
        points: [
          {
            id: 'point-id-111',
            groupe: 1,
            contour: 1,
            point: 1,
            references: [
              {
                opposable: true,
                geoSysteme: { id: 'geo-systeme-id' },
                coordonnees: { x: 1.5, y: 1 },
                id: 'ref'
              }
            ]
          }
        ],
        justificatifs: [{ id: 'toto', nom: 'name' }]
      })
    ).toEqual({
      id: 'etape-id',
      statutId: '',
      duree: { ans: null, mois: null },
      amodiataires: [],
      titulaires: [],
      geoSystemeIds: ['geo-systeme-id'],
      geoSystemeOpposableId: 'geo-systeme-id',
      groupes: [
        [
          [
            {
              id: 'point-id-111',
              description: undefined,
              nom: undefined,
              references: { 'geo-systeme-id': { id: 'ref', x: 1.5, y: 1 } },
              lot: undefined,
              subsidiaire: undefined
            }
          ]
        ]
      ],
      substances: [],
      contenu: {},
      incertitudes: {},
      documents: [],
      justificatifs: [{ id: 'toto', nom: 'name' }]
    })

    expect(
      etapeEditFormat({
        __typename: 'etape',
        id: 'etape-id',
        type: { id: 'etape-type-id' },
        statut: { id: 'etape-statut-id' },
        duree: 240,
        administrations: ['administration'],
        titulaires: [{ id: 'titulaire-id', prop: 'titulaire-prop' }],
        points: [
          {
            id: 'point-id-111',
            groupe: 1,
            contour: 1,
            point: 1,
            references: [
              {
                geoSysteme: { id: 'geo-systeme-id' },
                coordonnees: { x: 1.5, y: 1 },
                id: 'ref'
              }
            ]
          },
          {
            id: 'point-id-113',
            groupe: 1,
            contour: 1,
            point: 3,
            lot: 1,
            references: [
              {
                geoSysteme: { id: 'geo-systeme-id' },
                coordonnees: { x: 1.5, y: 3 },
                id: 'ref3'
              }
            ]
          },
          {
            id: 'point-id-114',
            groupe: 1,
            contour: 1,
            point: 4,
            lot: 1,
            references: [
              {
                geoSysteme: { id: 'geo-systeme-id' },
                coordonnees: { x: 1.5, y: 4 },
                id: 'ref2'
              }
            ]
          }
        ],
        contenu: { 'prop-id': 'prop-value' },
        incertitudes: { amodiataires: true },
        substances: [{ id: 'auru' }],
        documents: [{ type: { id: 'act' } }]
      })
    ).toEqual({
      id: 'etape-id',
      type: { id: 'etape-type-id' },
      statutId: 'etape-statut-id',
      duree: { ans: 20, mois: 0 },
      amodiataires: [],
      titulaires: [{ id: 'titulaire-id', operateur: undefined }],
      geoSystemeIds: ['geo-systeme-id'],
      geoSystemeOpposableId: '',
      groupes: [
        [
          [
            {
              id: 'point-id-111',
              description: undefined,
              nom: undefined,
              references: { 'geo-systeme-id': { id: 'ref', x: 1.5, y: 1 } },
              lot: undefined,
              subsidiaire: undefined
            },
            {
              id: 'point-id-113',
              description: undefined,
              references: [
                { id: 'ref3', x: 1.5, y: 3 },
                { id: 'ref2', x: 1.5, y: 4 }
              ],
              lot: 1,
              subsidiaire: undefined
            }
          ]
        ]
      ],
      substances: [{ id: 'auru' }],
      contenu: { 'prop-id': 'prop-value' },
      incertitudes: { amodiataires: true },
      documents: [{ fichierNouveau: null, typeId: 'act', type: { id: 'act' } }],
      justificatifs: []
    })
  })
})
