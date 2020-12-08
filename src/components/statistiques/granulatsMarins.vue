<template>
  <Loader v-if="!loaded" class="content" />
  <div v-else class="content">
    <div id="etat" class="mb-xxl mt">
      <h2>État du domaine minier en Guyane en temps réel</h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Elles sont susceptibles d’évoluer chaque jour au grès des
        décisions et de la fin de validité des titres et autorisations. Ces
        données concernent exclusivement le territoire guyanais.
      </p>
      <p>
        Les surfaces cumulées concernées par un titre ou une autorisation
        d’exploration et ou d’exploitation n’impliquent pas qu’elles sont
        effectivement explorées ou exploitées sur tout ou partie de l'année. Les
        travaux miniers font l’objet de déclarations ou d’autorisations
        distinctes portant sur une partie seulement des titres miniers.
      </p>
      <div class="mb-xxl">
        <h3>Autorisations et titres d’exploration</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresArm }}
            </p>
            <p class="bold text-center">Autorisations de recherche</p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresPrm }}
            </p>
            <p class="bold text-center">Permis exclusifs de recherches</p>
          </div>
          <div class="tablet-blob-1-4" />
          <div class="tablet-blob-1-4">
            <p class="h1 bold color-brand text-center">
              {{ numberFormat(statistiquesGuyane.surfaceExploration) }} ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploration
            </p>
          </div>
        </div>
      </div>
      <div class="mb-xxl">
        <h3>Autorisations et titres d’exploitation</h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresAxm }}
            </p>
            <p class="bold text-center">Autorisations d'exploitation</p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresPxm }}
            </p>
            <p class="bold text-center">Permis d'exploitation</p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiquesGuyane.titresCxm }}
            </p>
            <p class="bold text-center">Concessions</p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h1 bold color-brand text-center">
              {{ numberFormat(statistiquesGuyane.surfaceExploitation) }} ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres pouvant faire l'objet d'une activité
              d’exploitation
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2>Indicateurs annuels de production et d’activité minière légales</h2>
    <span class="separator" />
    <p class="mb-xl">
      Les données affichées ici sont celles contenues dans la base de donnée
      Camino. Elles sont stabilisées pour l’année n-2 mais sont susceptibles
      d’évoluer jusqu’à la cloture de la collecte des déclarations
      règlementaires de l’année précédente et l'année en cours. Ces données
      concernent exclusivement le territoire guyanais.
    </p>

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
    <GuyaneActivite
      :statistique-guyane="statistiques[tabActive]"
      :en-construction="tabs.find(t => t.id === tabActive).enConstruction"
      class="mb-xxl"
    />
    <div id="evolution" class="mb-xxl">
      <h2>
        Évolution de l’activité sur le domaine minier de Guyane sur les 5
        dernières années
      </h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Les données antérieures à 2018 reprises d’anciens systèmes
        peuvent ne pas être exhautives. Ces données concernent exclusivement le
        territoire guyanais.
      </p>
      <div class="hide">
        <h3>Évolution de la production annuelle d’or nette</h3>
        <hr />
        <div class="tablet-float-blobs clearfix">
          <div class="tablet-float-blob-1-3 mb-xl mt">
            <p class="h0 text-center">
              {{ numberFormat(statistiques[anneeCurrent - 1].orNet) }} kg
            </p>
            <p>
              Production d’or nette (après affinage) issue des mines en Guyane
              l'an dernier
            </p>
          </div>
          <div class="tablet-float-blob-2-3 relative mb-xl">
            <LineChart
              :data="statsLineFormat('orNet', 'Or net extrait en Kg')"
            />
          </div>
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des autorisations de recherche
        octroyées
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresArm.quantite }}
          </p>
          <p>autorisations de recherches octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresArm',
                'Autorisations de recherche octroyées',
                'Surface des autorisations de recherche (ha)'
              )
            "
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des permis de recherches octroyés
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPrm.quantite }}
          </p>
          <p>permis exclusifs de recherches octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresPrm',
                'Permis de recherches octroyés',
                'Surface des permis de recherches (ha)'
              )
            "
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des autorisations d'exploitation
        octroyées
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresAxm.quantite }}
          </p>
          <p>autorisations d’exploitation octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresAxm',
                'Autorisations d\'exploitation octroyées',
                'Surface des autorisations de recherche (ha)'
              )
            "
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des permis d'exploitation octroyés
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresPxm.quantite }}
          </p>
          <p>permis d’exploitation octroyés l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresPxm',
                'Permis d\'exploitation octroyés',
                'Surface des permis d\'exploitation (ha)'
              )
            "
          />
        </div>
      </div>
      <h3>Évolution du nombre et des surfaces des concessions octroyées</h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].titresCxm.quantite }}
          </p>
          <p>concessions octroyées l’an dernier</p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <BarChart
            :data="
              statsBarFormat(
                'titresCxm',
                'Concessions octroyés',
                'Surface des concessions (ha)'
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import GuyaneActivite from './guyane-activite.vue'
import BarChart from '../_charts/bar.vue'
import LineChart from '../_charts/line.vue'

export default {
  name: 'TableauBordGuyane',

  components: { Loader, GuyaneActivite, LineChart, BarChart },

  data() {
    return {
      loaded: false,
      tabActive: 0
    }
  },

  computed: {
    statistiquesGuyane() {
      return this.$store.state.statistiques.guyane
    },

    statistiques() {
      return this.statistiquesGuyane.annees.reduce((acc, statsAnnee) => {
        acc[statsAnnee.annee] = statsAnnee

        return acc
      }, {})
    },

    anneeCurrent() {
      return new Date().getFullYear()
    },

    tabs() {
      return [
        {
          id: this.anneeCurrent - 2,
          nom: (this.anneeCurrent - 2).toString()
        },
        {
          id: this.anneeCurrent - 1,
          nom: (this.anneeCurrent - 1).toString(),
          enConstruction: true
        },
        {
          id: this.anneeCurrent,
          nom: this.anneeCurrent.toString(),
          enConstruction: true
        }
      ]
    }
  },

  async created() {
    this.tabToggle(this.anneeCurrent - 2)
    await this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get', 'guyane')

      if (!this.loaded) {
        this.loaded = true
      }
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    },

    statsLineFormat(id, label) {
      return this.statistiquesGuyane.annees.reduce(
        (acc, statsAnnee) => {
          acc.labels.push(statsAnnee.annee)
          acc.datasets[0].data.push(statsAnnee[id])

          return acc
        },
        {
          labels: [],
          datasets: [
            {
              label,
              data: [],
              backgroundColor: 'rgba(118, 182, 189, 0.2)',
              borderColor: 'rgb(118, 182, 189)'
            }
          ]
        }
      )
    },

    statsBarFormat(id, labelBar, labelLine) {
      return this.statistiquesGuyane.annees.reduce(
        (acc, statsAnnee) => {
          acc.labels.push(statsAnnee.annee)
          acc.datasets[0].data.push(statsAnnee[id].surface)
          acc.datasets[1].data.push(statsAnnee[id].quantite)

          return acc
        },
        {
          labels: [],
          datasets: [
            {
              type: 'line',
              label: labelLine,
              yAxisID: 'line',
              data: [],
              backgroundColor: 'rgba(55, 111, 170, 0.2)',
              borderColor: 'rgb(55, 111, 170)'
            },
            {
              label: labelBar,
              yAxisID: 'bar',
              data: [],
              backgroundColor: 'rgb(118, 182, 189)'
            }
          ]
        }
      )
    }
  }
}
</script>
