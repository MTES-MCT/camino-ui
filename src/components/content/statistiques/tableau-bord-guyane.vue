<template>
  <div>
    <div
      class="content"
    >
      <hr class="mb-xl">
      <div
        id="etat"
        class="mb-xxl"
      >
        <h2>
          Etat du domaine minier en Guyane en temps réel
        </h2>
        <span class="separator" />
        <p>
          Les données affichées ici sont celles contenues dans la base de donnée
          Camino. Elles sont susceptibles d’évoluer chaque jour au grès des
          décisions et de la fin de validité des titres et autorisations. Ces
          données concernent exclusivement le territoire guyanais. Les surfaces
          cumulées concernées par un titre ou une autorisation d’exploration et
          ou d’exploitation n’impliquent pas qu’elles sont effectivement
          explorées ou exploitées sur tout ou partie de l'année. Les travaux
          miniers sur les titres miniers font l’objet de déclarations ou
          d’autorisations distinctes.
        </p>
        <h3>
          Autorisations et titres d’exploration
        </h3>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ arm }}
            </p>
            <p class="bold">
              ARM valides
            </p>
          </div>
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ prm }}
            </p>
            <p class="bold">
              PER valides
            </p>
          </div>
          <div class="desktop-blob-1-4 text-center" />
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ Intl.NumberFormat().format(surfaceExploration) }} ha
            </p>
            <p class="bold">
              Surfaces cumulées des titres concernés par une activité
              d’exploration sur l’année en cours.
            </p>
          </div>
        </div>
        <h3>
          Autorisations et titres d’exploitation
        </h3>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ axm }}
            </p>
            <p class="bold">
              AEX valides
            </p>
          </div>
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ pxm }}
            </p>
            <p class="bold">
              PEX valides
            </p>
          </div>
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ cxm }}
            </p>
            <p class="bold">
              concessions valides
            </p>
          </div>
          <div class="desktop-blob-1-4 text-center">
            <p class="h0-graph mb-0">
              {{ Intl.NumberFormat().format(surfaceExploitation) }} ha
            </p>
            <p class="bold">
              Surfaces cumulées des titres concernés par une activité
              d’exploitation sur l’année en cours.
            </p>
          </div>
        </div>
      </div>
      <div class="desktop-blobs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="mr-xs"
          :class="{ active: tabActive !== tab.id }"
        >
          <div
            class="btn-menu text-decoration-none bold"
            @click="tabToggle(tab.id)"
          >
            <h1 class="mb-xl mr-xl">
              {{ tab.nom }}
            </h1>
          </div>
        </div>
      </div>
      <IndicateursActiviteGuyane
        v-if="tabActive === this.anneeCurrent - 2"
        :statistique-guyane="getStatistiqueGuyane(this.anneeCurrent - 2)"
      />
      <IndicateursActiviteGuyane
        v-if="tabActive === this.anneeCurrent - 1"
        :statistique-guyane="getStatistiqueGuyane(this.anneeCurrent - 1)"
      />
      <div
        id="evolution"
        class="mb-xxl"
      >
        <h2>
          Evolution de l’activité sur le domaine minier de Guyane sur les 5
          dernières années
        </h2>
        <span class="separator" />
        <p>
          Les données affichées ici sont celles contenues dans la base de donnée
          Camino. Les données antérieures à 2018 reprises d’anciens systèmes
          peuvent ne pas être exhautives. Ces données concernent exclusivement
          le territoire guyanais.
        </p>
        <p class="bold mt-xxl">
          Evolution de la production annuelle d’or nette
        </p>
        <div class="desktop-blobs mb-xl">
          <div class="desktop-blob-2-3 text-center">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('productionOr')"
                :options="_options('productionOr')"
                :svg="_svg('productionOr')"
              />
            </div>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ productionOrEvo }} kg
            </p>
            <p>
              Production d’or nette (après affinage) issue des mines en Guyane.
            </p>
          </div>
        </div>
        <p class="bold mt-xxl">
          Évolution du nombre et des surfaces des ARM valides
        </p>
        <div class="desktop-blobs mb-xl">
          <div class="desktop-blob-2-3 text-center">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('titresArm')"
                :options="_options('titresArm')"
                :svg="_svg('titresArm')"
              />
            </div>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ armEvo }}
            </p>
            <p>
              autorisations de recherches octroyées l’an dernier.
            </p>
          </div>
        </div>
        <p class="bold mt-xxl">
          Évolution du nombre et des surfaces des PER valides
        </p>
        <div class="desktop-blobs mb-xl">
          <div class="desktop-blob-2-3 text-center">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('titresPrm')"
                :options="_options('titresPrm')"
                :svg="_svg('titresPrm')"
              />
            </div>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ prmEvo }}
            </p>
            <p>
              permis exclusifs de recherches octroyés l’an dernier.
            </p>
          </div>
        </div>
        <p class="bold mt-xxl">
          Évolution du nombre et des surfaces des AEX valides
        </p>
        <div class="desktop-blobs mb-xl">
          <div class="desktop-blob-2-3 text-center">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('titresAxm')"
                :options="_options('titresAxm')"
                :svg="_svg('titresAxm')"
              />
            </div>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ axmEvo }}
            </p>
            <p>
              autorisations d’exploitation octroyées l’an dernier.
            </p>
          </div>
        </div>
        <p class="bold mt-xxl">
          Évolution du nombre et des surfaces des PEX valides
        </p>
        <div class="desktop-blobs mb-xl">
          <div class="desktop-blob-2-3 text-center">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('titresPxm')"
                :options="_options('titresPxm')"
                :svg="_svg('titresPxm')"
              />
            </div>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ pxmEvo }}
            </p>
            <p>
              permis d’exploitation octroyés l’an dernier.
            </p>
          </div>
        </div>
        <p class="bold mt-xxl">
          Évolution du nombre et des surfaces des concessions valides
        </p>
        <div class="desktop-blobs mb-xl">
          <div class="desktop-blob-2-3 text-center">
            <div
              ref="graphContainer"
              class="graph-container"
            >
              <SvgChart
                :dataset="_dataset('titresCxm')"
                :options="_options('titresCxm')"
                :svg="_svg('titresCxm')"
              />
            </div>
          </div>
          <div class="desktop-blob-1-3 text-center">
            <p class="h0-graph mb-0">
              {{ cxmEvo }}
            </p>
            <p>
              concessions octroyées l’an dernier.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndicateursActiviteGuyane from './indicateurs-activite-guyane.vue'
import SvgChart from '../../_common/graph/svg-chart.vue'

export default {
  name: 'TableauBordGuyane',

  components: { IndicateursActiviteGuyane, SvgChart },

  data() {
    return {
      graph: [
        {
          name: 'productionOr',
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
              xName: 'année',
              yName: "Production d'or nette (kg)",
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
            id: 'productionOr',
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
          name: 'titresArm',
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
              xName: 'année',
              yName: 'ARM valides',
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
            id: 'titresArm',
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
          name: 'titresPrm',
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
              xName: 'année',
              yName: 'PER valides',
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
            id: 'titresPrm',
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
          name: 'titresAxm',
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
              xName: 'année',
              yName: 'AEX valides',
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
            id: 'titresAxm',
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
          name: 'titresPxm',
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
              xName: 'année',
              yName: 'PEX valides',
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
            id: 'titresPxm',
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
          name: 'titresCxm',
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
              xName: 'année',
              yName: 'Concessions valides',
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
            id: 'titresCxm',
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
      },
      tabActive: 0
    }
  },

  computed: {
    statistiquesGuyane() {
      return this.$store.state.statistiques.statistiquesGuyane
    },

    anneeCurrent() {
      return new Date().getFullYear()
    },

    anneeTbCurrent() {
      return this.statistiquesGuyane.anneesStatistiquesGuyane.find(
        anneeStatistique => anneeStatistique.annee === this.anneeCurrent
      )
    },

    arm() {
      return this.getData('titresArm')
    },

    prm() {
      return this.getData('titresPrm')
    },

    axm() {
      return this.getData('titresAxm')
    },

    pxm() {
      return this.getData('titresPxm')
    },

    cxm() {
      return this.getData('titresCxm')
    },

    surfaceExploration() {
      return this.getData('surfaceExploration')
    },

    surfaceExploitation() {
      return this.getData('surfaceExploitation')
    },

    tabs() {
      return [
        {
          id: this.anneeCurrent - 2,
          nom: (this.anneeCurrent - 2).toString()
        },
        {
          id: this.anneeCurrent - 1,
          nom: (this.anneeCurrent - 1).toString() + ' - en construction'
        }
      ]
    },

    productionOrEvo() {
      const evo =
        this.getData('productionOr') -
        this.getData('productionOr', this.anneeCurrent - 1)
      if (evo > 0) {
        return `+${evo}`
      }
      return evo.toString()
    },

    armEvo() {
      return this.getEvo('titresArm')
    },

    prmEvo() {
      return this.getEvo('titresPrm')
    },

    axmEvo() {
      return this.getEvo('titresAxm')
    },

    pxmEvo() {
      return this.getEvo('titresPxm')
    },

    cxmEvo() {
      return this.getEvo('titresCxm')
    }
  },

  created() {
    this.tabToggle(this.anneeCurrent - 2)
  },

  methods: {
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
      if (unit.length === 1) {
        return 1
      }
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
      const options = { ...this.currentOption(name) }
      options.legend.retraitX = this.legendRetraitX(name)
      options.legend.retraitY = this.legendRetraitY(name)
      if (!options.default) {
        options.legend.xMarge = this.legendMargeX(name)
        options.legend.yPas = this.pasY(name)
      }
      return options
    },

    _dataset(name) {
      const counts = this.statistiquesGuyane.map(statistique => {
        const annee = statistique.annee.toString()
        const value = statistique[name]
        return { annee, value }
      })

      const dataset = this.currentDataset(name)
      // const dataset = { ...this.currentDataset(name) }

      let pas = -this.currentOption(name).legend.xPas
      const values = counts.map(el => {
        const value = [2]
        value[0] = pas += this.currentOption(name).legend.xPas
        value[1] = parseInt(el.value)
        return value
      })

      const legend = counts.map(el => el.annee)

      dataset.values = values
      dataset.legend[0] = legend

      return dataset
    },

    getData(id, annee) {
      annee = annee || this.anneeCurrent
      return Object.entries(this.getStatistiqueGuyane(annee)).find(
        statistiqueGuyane => statistiqueGuyane[0] === id
      )[1]
    },

    getStatistiqueGuyane(annee) {
      return this.statistiquesGuyane.find(
        statistique => statistique.annee === annee
      )
    },

    getEvo(id) {
      const evo = this.getData(id) - this.getData(id, this.anneeCurrent - 1)
      if (evo > 0) {
        return `+${evo}`
      }
      return evo.toString()
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    }
  }
}
</script>
