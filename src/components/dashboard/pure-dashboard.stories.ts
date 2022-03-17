import PureDashboard from './pure-dashboard.vue'
import { Meta, Story } from '@storybook/vue3'

const meta: Meta = {
  title: 'Components/PureDashboard',
  component: PureDashboard,
  argTypes: {
    getEntreprisesTitres: { name: 'function', required: true },
    displayActivites: { name: 'boolean' }
  }
}
export default meta

type Props = {
  getEntreprisesTitres: () => Promise<unknown[]>
  displayActivites: boolean
}

const entreprises = [
  {
    id: 'nrBiyeRZbRlaNUhvhSOsXEEX',
    slug: 'm-ar-220222-2022',
    nom: '220222',
    type: {
      id: 'arm',
      typeId: 'ar',
      domaineId: 'm',
      type: {
        id: 'ar',
        nom: 'autorisation de recherches',
        description:
          "Cette autorisation minière donne un droit de prospection destiné à caractériser un gisement pressenti. Ensuite le titulaire pourra éventuellement faire valoir son droit d’inventeur. Il s’agit généralement de périmètres n'excédant pas quelques kilomètres carrés. Elle se décline pour :\r\n- la géothermie , la durée n'excédant pas trois ans ;\r\n- dans les zones spéciales de carrières pour une durée de trois ans renouvelable sans limite pour la même durée.\r\n- pour les minéraux et métaux, en Guyane, afin d’effectuer des travaux de recherches avec l’accord du propriétaire du sol. Cette autorisation porte exclusivement sur le domaine privé forestier de l’Etat. Elle est accordée par l’Office National des Forêts, mandataire de l’Etat, sous la conduite du préfet.",
        ordre: 2
      },
      domaine: {
        id: 'm',
        nom: 'minéraux et métaux'
      },
      titresCreation: null,
      contenuIds: [
        {
          elementId: 'mecanise',
          sectionId: 'arm'
        },
        {
          elementId: 'franchissements',
          sectionId: 'arm'
        }
      ]
    },
    domaine: {
      id: 'm',
      nom: 'minéraux et métaux'
    },
    coordonnees: {
      x: -52.375533070510286,
      y: 4.066841449742672
    },
    statut: {
      id: 'dmi',
      nom: 'demande initiale',
      couleur: 'warning'
    },
    substances: [
      {
        id: 'auru',
        nom: 'or'
      }
    ],
    activitesEnConstruction: null,
    activitesAbsentes: null,
    activitesDeposees: null,
    titulaires: [
      {
        id: 'fr-793025370',
        nom: 'NINOR',
        adresse: 'CARREFOUR DU LARIVOT',
        codePostal: '97351',
        commune: 'MATOURY',
        legalSiren: '793025370',
        legalEtranger: null
      }
    ],
    amodiataires: [],
    pays: [
      {
        regions: [
          {
            nom: 'Guyane',
            departements: [
              {
                nom: 'Guyane'
              }
            ]
          }
        ]
      }
    ],
    references: []
  },
  {
    id: 'mlWyShEGu8v7eYmsUhfiAMbs',
    slug: 'm-ax-amadis-5-2022',
    nom: 'Amadis 5',
    type: {
      id: 'axm',
      typeId: 'ax',
      domaineId: 'm',
      type: {
        id: 'ax',
        nom: "autorisation d'exploitation",
        description:
          "Cette autorisation minière donne un droit d’exploitation d’un gisement de minerais ou de métaux sur une zone n'excédant pas un kilomètre carré dans les départements et régions d’outre-mer. Sa durée de validité est de 4 ans renouvelable une fois.",
        ordre: 4
      },
      domaine: {
        id: 'm',
        nom: 'minéraux et métaux'
      },
      titresCreation: null,
      contenuIds: null
    },
    domaine: {
      id: 'm',
      nom: 'minéraux et métaux'
    },
    coordonnees: {
      x: -53.90095961691949,
      y: 5.067649535503341
    },
    statut: {
      id: 'val',
      nom: 'valide',
      couleur: 'success'
    },
    substances: [
      {
        id: 'auru',
        nom: 'or'
      }
    ],
    activitesEnConstruction: null,
    activitesAbsentes: null,
    activitesDeposees: null,
    titulaires: [
      {
        id: 'fr-838049344',
        nom: "CHAMB'OR",
        adresse: 'CARREFOUR DU LARIVOT',
        codePostal: '97351',
        commune: 'MATOURY',
        legalSiren: '838049344',
        legalEtranger: null
      }
    ],
    amodiataires: [],
    pays: [
      {
        regions: [
          {
            nom: 'Guyane',
            departements: [
              {
                nom: 'Guyane'
              }
            ]
          }
        ]
      }
    ],
    references: [
      {
        type: {
          nom: 'DEAL'
        },
        nom: '01/2022'
      },
      {
        type: {
          nom: 'DEAL'
        },
        nom: 'X21-09'
      }
    ]
  }
]

const Template: Story<Props> = (args: Props) => ({
  components: { PureDashboard },
  setup() {
    return { args }
  },
  template: '<PureDashboard v-bind="args" />'
})

export const Ok = Template.bind({})
Ok.args = {
  getEntreprisesTitres: () => Promise.resolve(entreprises),
  displayActivites: true
}

export const OkWithoutActivities = Template.bind({})
OkWithoutActivities.args = {
  getEntreprisesTitres: () => Promise.resolve(entreprises),
  displayActivites: false
}
export const Loading = Template.bind({})
Loading.args = {
  getEntreprisesTitres: () => new Promise<unknown[]>(resolve => {}),
  displayActivites: true
}
export const WithError = Template.bind({})
WithError.args = {
  getEntreprisesTitres: () => Promise.reject(new Error('because reasons')),
  displayActivites: true
}
