<template>
  <Loader v-if="!loaded" class="content" />
  <div v-else class="content">
    <div id="etat" class="mb-xxl mt">
      <h2>État du domaine minier sur les granulats marins en temps réel</h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Elles sont susceptibles d’évoluer chaque jour au grès des
        décisions et de la fin de validité des titres et autorisations.
      </p>
      <p>
        Les surfaces cumulées concernées par un titre ou une autorisation
        n’impliquent pas qu’elles sont effectivement explorées ou exploitées sur
        tout ou partie de l'année. Les travaux miniers font l’objet de
        déclarations ou d’autorisations distinctes portant sur une partie
        seulement de la surface des titres miniers.
      </p>
      <div class="mb-xxl">
        <h3>Titres d’exploration</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresInstructionPrw }}
            </p>
            <div v-if="statistiquesGranulatsMarins.titresInstructionPrw > 1">
              <p class="bold text-center">
                Demandes en cours d'instruction (initiale et prolongation)
              </p>
            </div>
            <div v-else>
              <p class="bold text-center">
                Demande en cours d'instruction (initiale et prolongation)
              </p>
            </div>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresValPrw }}
            </p>
            <p class="bold text-center">Permis exclusifs de recherches</p>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ numberFormat(statistiquesGranulatsMarins.surfaceExploration) }}
              ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploration
            </p>
          </div>
        </div>
      </div>
      <div class="mb-xxl">
        <h3>Titres d’exploitation</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresDmiCxw }}
            </p>
            <div v-if="statistiquesGranulatsMarins.titresDmiCxw > 1">
              <p class="bold text-center">
                Demandes initiales de concession
              </p>
            </div>
            <div v-else>
              <p class="bold text-center">
                Demande initiale de concession
              </p>
            </div>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{ statistiquesGranulatsMarins.titresValCxw }}
            </p>
            <div v-if="statistiquesGranulatsMarins.titresValCxw > 1">
              <p class="bold text-center">
                Concessions valides
              </p>
            </div>
            <div v-else>
              <p class="bold text-center">
                Concession valide
              </p>
            </div>
          </div>
          <div class="tablet-blob-1-3">
            <p class="h0 text-center">
              {{
                numberFormat(statistiquesGranulatsMarins.surfaceExploitation)
              }}
              ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploitation
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2>Production annuelle de granulats marins</h2>
    <span class="separator" />
    <p class="mb-xl">
      Les données affichées ici sont celles contenues dans la base de donnée
      Camino. Elles sont stabilisées pour l’année n-1.
    </p>

    <div class="tablet-float-blobs clearfix">
      <div class="tablet-float-blob-2-3 relative mb-xl">
        <BarChart
          :data="
            statsBarFormat(
              'granulatsExtrait',
              'volumeGranulatsExtrait',
              'masseGranulatsExtrait',
              'Volume de production annuelle de granulats marins en m³',
              'Tonnage produit',
              2010
            )
          "
          :suggestedMax="suggestedMax(['granulatsExtrait'], 2010)"
        />
      </div>
    </div>

    <div class="flex">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="mr-xs"
        :class="{ active: tabActive === tab.id }"
      >
        <div class="p-m btn-tab rnd-t-s" @click="tabToggle(tab.id)">
          {{ tab.nom }}
        </div>
      </div>
    </div>

    <div class="line-neutral mb" />
    <GranulatsMarinsActivite
      :statistique-granulats-marins="statistiques[tabActive]"
      :en-construction="tabs.find(t => t.id === tabActive).enConstruction"
      class="mb-xxl"
    />
    <div id="evolution" class="mb-xxl">
      <h2>
        Évolution du nombre de titres et de leur surface par année
      </h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Ces données concernent exclusivement le territoire français.
      </p>
      <h3>
        Permis Exclusif de Recherche (PER) : Évolution du nombre de titres et de
        leur surface octroyés
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPrw.quantite }}
          </p>
          <p>permis exclusifs de recherches octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresPrw',
                'quantite',
                'surface',
                'Permis de recherches octroyés',
                'Surface des permis de recherches (ha)'
              )
            "
            :suggestedMax="
              suggestedMax(['titresPrw', 'titresPxw', 'titresCxw'])
            "
          />
        </div>
      </div>
      <h3>
        Permis d'exploitation (PER) : Évolution du nombre de titres et de leur
        surface par année
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPxw.quantite }}
          </p>
          <p>permis d’exploitation octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresPxw',
                'quantite',
                'surface',
                'Permis d\'exploitation octroyés',
                'Surface des permis d\'exploitation (ha)'
              )
            "
            :suggestedMax="
              suggestedMax(['titresPrw', 'titresPxw', 'titresCxw'])
            "
          />
        </div>
      </div>
      <h3>
        Concessions : Évolution du nombre de titres et de leur surface par année
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresCxw.quantite }}
          </p>
          <p>concessions octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresCxw',
                'quantite',
                'surface',
                'Concessions octroyées',
                'Surfaces cumulées des titres pouvant faire l\'objet d\'une activité d\'exploitation (ha)'
              )
            "
            :suggestedMax="
              suggestedMax(['titresPrw', 'titresPxw', 'titresCxw'])
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import GranulatsMarinsActivite from './granulats-marins-activite.vue'
import BarChart from '../_charts/bar.vue'

export default {
  name: 'TableauBordGranulatsMarins',

  components: { Loader, GranulatsMarinsActivite, BarChart },

  data() {
    return {
      loaded: false,
      tabActive: 0
    }
  },

  computed: {
    statistiquesGranulatsMarins() {
      return this.$store.state.statistiques.granulatsMarins
    },

    statistiques() {
      return this.statistiquesGranulatsMarins.annees.reduce(
        (acc, statsAnnee) => {
          acc[statsAnnee.annee] = statsAnnee

          return acc
        },
        {}
      )
    },

    anneeCurrent() {
      return new Date().getFullYear()
    },

    tabs() {
      return Array.from(Array(this.anneeCurrent - 2010 + 1).keys())
        .map(e => {
          return {
            id: this.anneeCurrent - e,
            nom: (this.anneeCurrent - e).toString(),
            enConstruction: e <= 1 // sont en construction l'année en cours et la précédente
          }
        })
        .reverse()
    }
  },

  async created() {
    this.tabToggle(this.anneeCurrent - 1)
    await this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get', 'granulatsMarins')

      if (!this.loaded) {
        this.loaded = true
      }
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    },

    graphAnnees(start) {
      return start
        ? this.statistiquesGranulatsMarins.annees.filter(
            annee => annee.annee >= start
          )
        : this.statistiquesGranulatsMarins.annees
    },

    statsBarFormat(id, bar, line, labelBar, labelLine, start) {
      return this.graphAnnees(start).reduce(
        (acc, statsAnnee) => {
          acc.id = id
          acc.labels.push(statsAnnee.annee)
          acc.datasets[0].data.push(statsAnnee[id][bar])
          acc.datasets[1].data.push(statsAnnee[id][line])

          return acc
        },
        {
          id: '',
          labels: [],
          datasets: [
            {
              type: 'bar',
              label: labelBar,
              yAxisID: 'bar',
              legendPosition: 'left',
              data: [],
              backgroundColor: 'rgb(118, 182, 189)'
            },
            {
              type: 'line',
              label: labelLine,
              yAxisID: 'line',
              legendPosition: 'right',
              data: [],
              backgroundColor: 'rgba(55, 111, 170, 0.2)',
              borderColor: 'rgb(55, 111, 170)'
            }
          ]
        }
      )
    },

    // Valeur max des abscisses : doit être la même pour certains graphes afin de comparer visuelement les données
    // = max des quantités tous graph confondus parmis les ids sur l'ensemble des années requises si supérieur à 10, sinon 10
    // ids : liste des id à prendre en compte
    // start : année de départ de la liste
    suggestedMax(ids, start) {
      const quantiteMax = Math.max(
        ...this.graphAnnees(start).map(annee =>
          Math.max(...ids.map(id => annee[id].quantite))
        )
      )

      return quantiteMax > 10 ? quantiteMax : 10
    }
  }
}
</script>
