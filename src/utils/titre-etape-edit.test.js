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
                coordonnees: { x: 1.5, y: 1 }
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
              description: undefined,
              nom: undefined,
              references: { 'geo-systeme-id': [1.5, 1] },
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
                coordonnees: { x: 1.5, y: 1 }
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
                coordonnees: { x: 1.5, y: 3 }
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
                coordonnees: { x: 1.5, y: 4 }
              }
            ]
          }
        ],
        contenu: { 'prop-id': 'prop-value' },
        incertitudes: { amodiataires: true },
        substances: [{ id: 'auru' }]
      })
    ).toEqual({
      id: 'etape-id',
      typeId: 'etape-type-id',
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
              description: undefined,
              nom: undefined,
              references: { 'geo-systeme-id': [1.5, 1] },
              lot: undefined,
              subsidiaire: undefined
            },
            {
              description: undefined,
              references: ['1,5;3', '1,5;4'],
              lot: 1,
              subsidiaire: undefined
            }
          ]
        ]
      ],
      substances: [{ id: 'auru' }],
      contenu: { 'prop-id': 'prop-value' },
      incertitudes: { amodiataires: true },
      documents: [],
      justificatifs: []
    })
  })

  test('formate une étape avec des documents', () => {
    expect(
      etapeEditFormat({
        __typename: 'etape',
        id: 'etape-id',
        type: {
          id: 'mfm'
        },
        documents: [
          {
            id: 'doc-id-111',
            type: {
              id: 'typeId'
            },
            modification: true,
            suppression: true
          }
        ]
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
      typeId: 'mfm',
      sections: undefined,
      contenu: {
        arm: {
          mecanise: true
        }
      },
      incertitudes: {},
      documents: [
        {
          fichierNouveau: null,
          id: 'doc-id-111',
          titreEtapeId: 'etape-id',
          typeId: 'typeId'
        }
      ],
      justificatifs: []
    })
  })
})
