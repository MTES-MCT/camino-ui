import { etapeSaveFormat } from './titre-etape-save'

// dateFormat
describe('etapeSaveFormat', () => {
  test("formate une étape pour l'enregistrer", () => {
    expect(
      etapeSaveFormat({
        id: 'etape-id',
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
        incertitudes: {},
        justificatifs: ['toto']
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
      justificatifs: [{ id: 'toto' }]
    })

    expect(
      etapeSaveFormat({
        id: 'etape-id',
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
                  'geo-systeme-id': [1.5, 1],
                  'geo-systeme-id-2': [null, null]
                }
              },
              {
                references: {
                  'geo-systeme-id': [null, null],
                  'geo-systeme-id-2': [1.5, 1]
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
              opposable: true
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
      }
    })

    expect(
      etapeSaveFormat({
        id: 'etape-id',
        titreDemarcheId: 'demarche-id',
        typeId: 'etape-type-id',
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
                references: { 'geo-systeme-id': [1.5, null] },
                lot: undefined,
                subsidiaire: undefined
              },
              {
                references: { 'geo-systeme-id': [1.5, 1] },
                lot: undefined,
                subsidiaire: undefined
              },
              {
                description: undefined,
                references: ['1,5;3', '1,5;4'],
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
        incertitudes: { amodiataires: true }
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
              geoSystemeId: 'geo-systeme-id'
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
              geoSystemeId: 'geo-systeme-id'
            }
          ],
          subsidiaire: true
        }
      ],
      statutId: 'etape-statut-id',
      substances: [{ id: 'substance-id-1', ordre: 1 }],
      titreDemarcheId: 'demarche-id',
      titulaires: [{ id: 'titulaire-id' }],
      typeId: 'etape-type-id'
    })
  })
})
