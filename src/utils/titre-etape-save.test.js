import { etapeSaveFormat } from './titre-etape-save'

// dateFormat
describe('etapeSaveFormat', () => {
  test("formate une étape pour l'enregistrer", () => {
    expect(
      etapeSaveFormat({
        id: 'etape-id',
        type: { id: 'mfr' },
        titreDemarcheId: 'demarche-id',
        statutId: '',
        dateFin: '',
        duree: { ans: null, mois: null },
        amodiataires: [],
        titulaires: [],
        geoSystemeIds: [],
        geoSystemeOpposableId: null,
        groupes: [],
        substances: [],
        contenu: {},
        incertitudes: {}
      })
    ).toEqual({
      amodiataires: [],
      duree: null,
      dateFin: null,
      id: 'etape-id',
      incertitudes: {},
      points: null,
      statutId: '',
      substances: [],
      titreDemarcheId: 'demarche-id',
      titulaires: [],
      typeId: 'mfr'
    })

    expect(
      etapeSaveFormat({
        id: 'etape-id',
        type: { id: 'mfr' },
        titreDemarcheId: 'demarche-id',
        statutId: '',
        duree: { ans: 0, mois: 10 },
        amodiataires: [],
        titulaires: [],
        geoSystemeIds: ['geo-systeme-id', 'geo-systeme-id-2'],
        geoSystemeOpposableId: 'geo-systeme-id',
        groupes: [
          [
            [
              {
                references: {
                  'geo-systeme-id': { id: 'id1', x: 1.5, y: 1 },
                  'geo-systeme-id-2': { x: undefined, y: undefined }
                }
              },
              {
                references: {
                  'geo-systeme-id': { x: undefined, y: undefined },
                  'geo-systeme-id-2': { id: 'id3', x: 1.5, y: 1 }
                }
              }
            ]
          ]
        ],
        substances: [],
        contenu: {},
        incertitudes: {},
        heritageProps: { 'prop-id': { etape: {}, actif: true } },
        heritageContenu: {
          'section-id': { 'element-id': { etape: {}, actif: true } }
        }
      })
    ).toEqual({
      amodiataires: [],
      duree: 10,
      id: 'etape-id',
      incertitudes: {},
      points: [
        {
          contour: 1,
          groupe: 1,
          point: 1,
          references: [
            {
              coordonnees: { x: 1.5, y: 1 },
              geoSystemeId: 'geo-systeme-id',
              opposable: true,
              id: 'id1'
            }
          ]
        }
      ],
      statutId: '',
      substances: [],
      titreDemarcheId: 'demarche-id',
      titulaires: [],
      heritageProps: { 'prop-id': { actif: true } },
      heritageContenu: {
        'section-id': { 'element-id': { actif: true } }
      },
      typeId: 'mfr'
    })

    expect(
      etapeSaveFormat({
        id: 'etape-id',
        titreDemarcheId: 'demarche-id',
        type: { id: 'etape-type-id' },
        statutId: 'etape-statut-id',
        duree: { ans: 20, mois: 0 },
        amodiataires: [],
        titulaires: [{ id: 'titulaire-id' }, { id: '' }],
        geoSystemeIds: ['geo-systeme-id'],
        geoSystemeOpposableId: '',
        groupes: [
          [
            [
              {
                references: {
                  'geo-systeme-id': { id: '1', x: 1.5, y: null }
                },
                lot: undefined,
                subsidiaire: undefined
              },
              {
                references: { 'geo-systeme-id': { id: '2', x: 1.5, y: 1 } },
                lot: undefined,
                subsidiaire: undefined
              },
              {
                description: undefined,
                references: [
                  { id: '3', x: 1.5, y: 3 },
                  { id: '4', x: 1.5, y: 4 }
                ],
                lot: 1,
                subsidiaire: undefined
              },
              {
                description: undefined,
                references: [],
                lot: 2,
                subsidiaire: undefined
              },
              {
                description: undefined,
                references: ['reference invalide'],
                lot: 3,
                subsidiaire: undefined
              }
            ]
          ],
          [[]]
        ],
        substances: [{ id: 'substance-id-1' }],
        contenu: { 'prop-id': 'prop-value' },
        incertitudes: { amodiataires: true },
        documents: [{ id: 'tmp', typeId: 'tmp' }, { id: 'doc-id' }]
      })
    ).toEqual({
      amodiataires: [],
      contenu: { 'prop-id': 'prop-value' },
      duree: 240,
      id: 'etape-id',
      incertitudes: { amodiataires: true },
      points: [
        {
          contour: 1,
          groupe: 1,
          point: 1,
          references: [
            {
              id: '2',
              coordonnees: { x: 1.5, y: 1 },
              geoSystemeId: 'geo-systeme-id'
            }
          ]
        },
        {
          contour: 1,
          description: undefined,
          groupe: 1,
          lot: 1,
          nom: null,
          point: 2,
          references: [
            {
              coordonnees: { x: 1.5, y: 3 },
              geoSystemeId: 'geo-systeme-id',
              id: '3'
            }
          ],
          subsidiaire: true
        },
        {
          contour: 1,
          description: undefined,
          groupe: 1,
          lot: 1,
          nom: null,
          point: 3,
          references: [
            {
              coordonnees: { x: 1.5, y: 4 },
              geoSystemeId: 'geo-systeme-id',
              id: '4'
            }
          ],
          subsidiaire: true
        }
      ],
      statutId: 'etape-statut-id',
      substances: [{ id: 'substance-id-1', ordre: 1 }],
      titreDemarcheId: 'demarche-id',
      titulaires: [{ id: 'titulaire-id' }],
      typeId: 'etape-type-id',
      documentIds: ['doc-id']
    })
  })
})
