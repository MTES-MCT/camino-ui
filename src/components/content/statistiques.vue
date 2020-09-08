<template>
  <div>
    <Loader v-if="!loaded" />
    <div
      v-else
      class="content"
    >
      <h1 class="mb-xl">
        Statistiques
      </h1>
      <hr class="mb-xl">
      <div
        id="engagement"
        class="mb-xxl"
      >
        <h2>
          Engagement général sur le site
        </h2>
        <span class="separator" />
        <p>Les données retenues ici témoignent du comportement général des utilisateurs sur le site et de leur engagement auprès du service</p>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-6 text-center">
            <p class="h0-graph mb-0 mt-xxl">
              {{ nbSearch }}
            </p>
            <p class="bold">
              recherches ce mois-ci
            </p>
          </div>
          <div class="desktop-blob-2-3">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('nombre de recherches par mois')"
                :options="_options('nombre de recherches par mois')"
                :svg="_svg('nombre de recherches par mois')"
              />
              <p class="graph-title">
                Le nombre de recherches mensuelles est l'indicateur clé de l'utilisation du service de "cadastre minier"
              </p>
            </div>
          </div>
          <div class="desktop-blob-1-6 text-center">
            <p class="h0-graph mb-0">
              {{ Math.round(statistiques.nbAction) }}
            </p>
            <p class="bold">
              nombre moyen d'actions effectuées par un utilisateur sur le site
            </p>
            <p class="h0-graph mb-0">
              {{ statistiques.timeSession }}
            </p>
            <p class="bold">
              temps de session moyen sur camino par chacun des utilisateurs
            </p>
          </div>
        </div>
      </div>

      <div
        id="amelioration"
        class="mb-xxl"
      >
        <h2>
          Amélioration continue et accès aux données publiques
        </h2>
        <span class="separator" />
        <p>En tant que secteur régulé par l'État, la publication en ligne des données minières doit permettre leur amélioration et leur utilisation par la communauté</p>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-6 text-center">
            <p class="h0-graph mb-0 mt-xxl">
              {{ nbMajTitres }}
            </p>
            <p class="bold">
              mise à jour de titres miniers par l'administration et les entreprises du secteur ce mois-ci
            </p>
          </div>
          <div class="desktop-blob-2-3">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('nombre de mises à jour par mois')"
                :options="_options('nombre de mises à jour par mois')"
                :svg="_svg('nombre de mises à jour par mois')"
              />
              <p class="graph-title">
                Le nombre de mises à jour mensuelles du cadastre par les différents services de l'administration ou par les professionnels du secteur reflète l'intensité de l'activité d'instruction et administrative sur le domaine minier en France. Une mise à jour peut être l'ajout d'un titre, une modification de son statut ou des documents concernant son instruction.
              </p>
            </div>
          </div>
          <div class="desktop-blob-1-6 text-center">
            <p class="h0-graph mb-0">
              {{ statistiques.nbDonwload }}
            </p>
            <p class="bold">
              téléchargements de pièces relatives à la bonne instruction des titres et autorisations miniers ce mois-ci
            </p>
            <p class="h0-graph mb-0">
              {{ statistiques.nbErreur }}
            </p>
            <p class="bold">
              erreurs corrigées sur les bases de données de l'État grâce à la participation des utilisateurs
            </p>
            <p class="h0-graph mb-0">
              {{ statistiques.nbReutilisation }}
            </p>
            <p class="bold">
              réutilisations connues des données ouvertes distribuées
            </p>
          </div>
        </div>
      </div>

      <div
        id="gains"
        class="mb-xxl"
      >
        <h2>
          Gains de la dématérialisation sur l'instruction minière
        </h2>
        <span class="separator" />
        <p>La dématérialisation des démarches relatives à l'instruction minière doit permettre un gain de temps pour ceux qui les effectuent et ceux qui les instruisent</p>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ nbDemarches }}
            </p>
            <p class="bold">
              démarches effectuées en ligne cette années
            </p>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ statistiques.titresActivitesBeneficesEntreprise }}
            </p>
            <p class="bold">
              jours de travail sans valeur ajoutée économisés par les entreprises en Guyane
            </p>
            <p>
              La dématérialisation d’un rapport trimestriel d’activité de production d’or en Guyane permet en moyenne l’économie de 2 heures de travail de saisie ou de déplacement pour son dépôt physique à l’administration.
            </p>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ statistiques.titresActivitesBeneficesAdministration }}
            </p>
            <p class="bold">
              jours de travail à faible valeur ajoutée économisés par l’administration
            </p>
            <p>
              La dématérialisation d’un rapport trimestriel d’activité de production d’or en Guyane permet en moyenne l’économie d’une heure de travail de traitement et re-saisie de données par un agent de l’administration. Le gain de temps est réinvesti sur l’accompagnement et le contrôle de l’activité.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import SvgChart from '../_common/graph/svg-chart.vue'

export default {
  name: 'CaminoStatistiques',

  components: { Loader, SvgChart },

  data() {
    return {
      graph: [
        {
          name: 'nombre de recherches par mois',
          options: {
            default: false,
            xMin: 0,
            xMax: 0,
            yMin: 0,
            yMax: 0,
            line: {
              smoothing: 0.15,
              flattening: 0.5
            },
            legend: {
              x: true,
              y: true,
              valuesVisible: true,
              xName: 'Mois',
              yName: 'Nombre de recherches',
              xRetrait: 100,
              yRetrait: 100,
              xMarge: 50,
              yMarge: 40,
              xPas: 1,
              yPas: 1,
              xCenterCoef: 5,
              yCenterRetrait: 10,
              xColor: 'silver',
              yColor: 'silver'
            }
          },
          dataset: {
            id: 'nbSearchArray',
            colors: {
              path: 'rgba(55, 165, 230, 1.0)',
              circles: 'orange',
              values: 'orange'
            },
            font: {
              family: 'Verdana',
              size: '15'
            },
            values: [],
            legend: []
          }
        },
        {
          name: 'nombre de mises à jour par mois',
          options: {
            default: false,
            xMin: 0,
            xMax: 0,
            yMin: 0,
            yMax: 0,
            line: {
              smoothing: 0.15,
              flattening: 0.5
            },
            legend: {
              x: true,
              y: true,
              valuesVisible: true,
              xName: 'Mois',
              yName: 'Nombre de mises à jour',
              xRetrait: 100,
              yRetrait: 100,
              xMarge: 50,
              yMarge: 40,
              xPas: 1,
              yPas: 1,
              xCenterCoef: 5,
              yCenterRetrait: 10,
              xColor: 'silver',
              yColor: 'silver'
            }
          },
          dataset: {
            id: 'nbSearchArray',
            colors: {
              path: 'rgba(55, 165, 230, 1.0)',
              circles: 'orange',
              values: 'orange'
            },
            font: {
              family: 'Verdana',
              size: '15'
            },
            values: [],
            legend: []
          }
        }
      ],
      svg: {
        w: 1000,
        h: 600
      }
    }
  },

  computed: {
    statistiques() {
      return this.$store.state.statistiques
    },

    nbSearch() {
      const nbSearchArray = this.statistiques.nbSearchArray
      return nbSearchArray[nbSearchArray.length - 1].value
    },

    nbMajTitres() {
      const nbMajTitresArray = this.statistiques.nbMajTitresArray
      return nbMajTitresArray[nbMajTitresArray.length - 1].value
    },

    nbDemarches() {
      return this.statistiques.nbDemarche
    },

    loaded() {
      return !!this.statistiques.loaded
    }
  },

  created() {
    this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get')
    },

    currentOption(name) {
      return this.graph.find(g => g.name === name).options
    },

    currentDataset(name) {
      return this.graph.find(g => g.name === name).dataset
    },

    legendRetraitX(name) {
      const legendRetraitX = this.currentOption(name).legend.x
        ? this.currentOption(name).legend.xRetrait
        : 0
      return -this.currentOption(name).xMin > 0 ? 0 : legendRetraitX
    },

    legendRetraitY(name) {
      const legendRetraitY = this.currentOption(name).legend.y
        ? this.currentOption(name).legend.yRetrait
        : 0
      return -this.currentOption(name).yMin > 0 ? 0 : legendRetraitY
    },

    maxValY(name) {
      return Math.max(
        ...this.currentDataset(name).values.map(v => v[1])
      ).toString()
    },

    legendMargeX(name) {
      return this.maxValY(name).length * 15
    },

    pasY(name) {
      let unit = this.maxValY(name)
      let pas = 1
      let taille = 1
      while (unit.length > 1) {
        unit = Math.floor(parseInt(unit) / 10).toString()
        taille *= 10
        pas = parseInt(unit) < 5 ? 5 : parseInt(unit) < 10 ? 10 : 1
      }
      return (pas * taille) / 10
    },

    _svg(name) {
      const w = this.svg.w
      const h = this.svg.h
      const wr = w - this.legendRetraitX(name)
      const hr = h - this.legendRetraitY(name)
      return { w, h, wr, hr }
    },

    _options(name) {
      const options = this.currentOption(name)
      options.legend.retraitX = this.legendRetraitX(name)
      options.legend.retraitY = this.legendRetraitY(name)
      if (!options.default) {
        options.legend.xMarge = this.legendMargeX(name)
        options.legend.yPas = this.pasY(name)
      }
      return options
    },

    _dataset(name) {
      let nbArray
      if (name === 'nombre de recherches par mois') {
        nbArray = this.statistiques.nbSearchArray
      }
      if (name === 'nombre de mises à jour par mois') {
        nbArray = this.statistiques.nbMajTitresArray
      }

      // nbXXXArray est de la forme
      // [
      //   { month: '2018-09', value: '0' },
      //   ...
      //   { month: '2020-08', value: '5706' }
      // ]

      // on veut obtenir
      // datasets = [{id:...,values:[[0,0],...[xPas*Index,'5706']],legend:['2018-09',...,'2020-08']}]

      const dataset = { ...this.currentDataset(name) }

      let pas = -this.currentOption(name).legend.xPas
      const values = nbArray.map(el => {
        const value = [2]
        value[0] = pas += this.currentOption(name).legend.xPas
        value[1] = parseInt(el.value)
        return value
      })

      const legend = nbArray.map(el => el.month)

      dataset.values = values
      dataset.legend[0] = legend

      return dataset
    }
  }
}
</script>
