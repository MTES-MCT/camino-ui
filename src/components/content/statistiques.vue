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
          <div class="desktop-blob-1-6">
            <p class="h0-graph text-center mb-0">
              {{ nbSearch }}
            </p>
            <p class="text-center">
              RECHERCHES CE MOIS-CI
            </p>
          </div>
          <div class="desktop-blob-2-3">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :datasets="_datasets"
                :options="_options"
                :svg="_svg"
              />
              <p class="graph-title">
                Le nombre de recherches mensuelles est l'indicateur clé de l'utilisation du service de "cadastre numérique"
              </p>
            </div>
          </div>
          <div class="desktop-blob-1-6">
            <p class="h0-graph text-center mb-0">
              {{ Math.round(statistiques.nbAction) }}
            </p>
            <p class="text-center">
              NOMBRE MOYEN D'ACTIONS EFFECTUÉES PAR UN UTILISATEUR SUR LE SITE
            </p>
            <p class="h0-graph text-center mb-0">
              {{ statistiques.timeSession }}
            </p>
            <p class="text-center">
              TEMPS DE SESSION MOYEN SUR CAMINO PAR CHACUN DES UTILISATEURS
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
        <p>En tant que que secteur régulé par l'État, la publication en ligne des données minières doit permettre leur amélioration et leur utilisation par la communauté</p>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-6">
            <p class="h0-graph text-center mb-0">
              {{ nbMajTitres }}
            </p>
            <p class="text-center">
              MAJ DE TITRES MINIERS PAR L'ADMINISTRATION ET LES ENTREPRISES DU SECTEUR CE MOIS-CI
            </p>
          </div>
          <div class="desktop-blob-2-3">
            tableau
          </div>
          <div class="desktop-blob-1-6">
            <p class="h0-graph text-center mb-0">
              {{ statistiques.nbDonwload }}
            </p>
            <p class="text-center">
              TÉLÉCHARGEMENTS DE PIÈCES RELATIVES À LA BONNE INSTRUCTION DES TITRES ET CONCESSIONS MINIÈRES CE MOIS-CI
            </p>
            <p class="h0-graph text-center mb-0">
              150
            </p>
            <p class="text-center">
              ERREURS CORRIGÉES SUR LES BASES DE DONNÉES DE L'ÉTAT GRÂCE À LA PARTICIPATION DES UTILISATEURS
            </p>
            <p class="h0-graph text-center mb-0">
              6
            </p>
            <p class="text-center">
              RÉUTILISATIONS CONNUES DES DONNÉES OUVERTES DISTRIBUÉES
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
          <div class="desktop-blob-1-3">
            <p class="h0-graph text-center mb-0">
              9999
            </p>
            <p class="text-center">
              DÉMARCHES EFFECTUÉES EN LIGNE CETTE ANNÉE
            </p>
          </div>
          <div class="desktop-blob-1-3">
            <p class="h0-graph text-center mb-0">
              {{ statistiques.titresActivitesBeneficesEntreprise }}
            </p>
            <p class="bold text-center ">
              jours de travail sans valeur ajoutée économisés par les entreprises en Guyane
            </p>
            <p>
              La dématérialisation d’un rapport trimestriel d’activité de production d’or en Guyane permet en moyenne l’économie de 2 heures de travail de saisie ou de déplacement pour son dépôt physique à l’administration.
            </p>
          </div>
          <div class="desktop-blob-1-3">
            <p class="h0-graph text-center mb-0">
              {{ statistiques.titresActivitesBeneficesAdministration }}
            </p>
            <p class="bold text-center ">
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
          yPas: 1000,
          xCenterCoef: 5,
          yCenterRetrait: 10,
          xColor: 'silver',
          yColor: 'silver'
        }
      },
      datasets: [
        {
          id: 'nbSearchArray',
          name: 'nombre de recherches par mois',
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

    legendRetraitX() {
      let legendRetraitX = this.options.legend.x
        ? this.options.legend.xRetrait
        : 0
      legendRetraitX = -this.options.xMin > 0 ? 0 : legendRetraitX
      return legendRetraitX
    },

    legendRetraitY() {
      let legendRetraitY = this.options.legend.y
        ? this.options.legend.yRetrait
        : 0
      legendRetraitY = -this.options.yMin > 0 ? 0 : legendRetraitY
      return legendRetraitY
    },

    maxValY() {
      return Math.max(
        ...this._datasets.map(d => Math.max(...d.values.map(v => v[1])))
      ).toString()
    },

    legendMargeX() {
      return this.maxValY.length * 15
    },

    pasY() {
      let unit = this.maxValY
      let pas = 1
      let taille = 1
      while (unit.length > 1) {
        unit = Math.floor(parseInt(unit) / 10).toString()
        taille *= 10
        pas = unit < 5 ? 5 : unit < 10 ? 10 : 1
      }
      return (pas * taille) / 10
    },

    _options() {
      const options = this.options
      options.legend.retraitX = this.legendRetraitX
      options.legend.retraitY = this.legendRetraitY
      if (!this.options.default) {
        options.legend.xMarge = this.legendMargeX
        options.legend.yPas = this.pasY
      }
      return options
    },

    _datasets() {
      const nbSearchArray = this.statistiques.nbSearchArray

      // nbSearchArray est de la forme
      // [
      //   { month: '2018-09', value: '0' },
      //   ...
      //   { month: '2020-08', value: '5706' }
      // ]

      // on veut obtenir
      // datasets = [{id:...,values:[[0,0],...[xPas*Index,'5706']],legend:['2018-09',...,'2020-08']}]

      const datasets = this.datasets
      const dataset = datasets[0]

      let pas = -this.options.legend.xPas
      const values = nbSearchArray.map(el => {
        const value = [2]
        value[0] = pas += this.options.legend.xPas
        value[1] = parseInt(el.value)
        return value
      })

      const legend = nbSearchArray.map(el => el.month)

      dataset.values = values
      dataset.legend[0] = legend

      datasets[0] = dataset

      return datasets
    },

    _svg() {
      const w = this.svg.w
      const h = this.svg.h
      const wr = w - this.legendRetraitX
      const hr = h - this.legendRetraitY
      return { w, h, wr, hr }
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
    }
  }
}
</script>
