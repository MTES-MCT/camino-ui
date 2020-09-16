<template>
  <Loader v-if="!loaded" class="content" />
  <div v-else class="content">
    <div id="etat" class="mb-xxl mt">
      <h2>
        État du domaine minier en Guyane
      </h2>
      <span class="separator" />
      <p>
        Les données affichées ici sont celles contenues dans la base de donnée
        Camino. Elles sont susceptibles d’évoluer chaque jour au grès des
        décisions et de la fin de validité des titres et autorisations. Ces
        données concernent exclusivement le territoire guyanais. Les surfaces
        cumulées concernées par un titre ou une autorisation d’exploration et ou
        d’exploitation n’impliquent pas qu’elles sont effectivement explorées ou
        exploitées sur tout ou partie de l'année. Les travaux miniers sur les
        titres miniers font l’objet de déclarations ou d’autorisations
        distinctes.
      </p>
      <div class="mb-xxl">
        <h3>
          Autorisations et titres d’exploration
        </h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiques[anneeCurrent].titresArm }}
            </p>
            <p class="bold text-center">
              Autorisations de recherche valides
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiques[anneeCurrent].titresPrm }}
            </p>
            <p class="bold text-center">
              Permis de recherche valides
            </p>
          </div>
          <div class="tablet-blob-1-4" />
          <div class="tablet-blob-1-4">
            <p class="h1 bold color-brand text-center">
              {{ surfaceExploration }} ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres concernés par une activité
              d’exploration.
            </p>
          </div>
        </div>
      </div>
      <div class="mb-xxl">
        <h3>
          Autorisations et titres d’exploitation
        </h3>
        <hr />
        <div class="tablet-blobs">
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiques[anneeCurrent].titresAxm }}
            </p>
            <p class="bold text-center">
              Autorisations d'exploitation valides
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiques[anneeCurrent].titresPxm }}
            </p>
            <p class="bold text-center">
              Permis d'exploitation valides
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h0 text-center">
              {{ statistiques[anneeCurrent].titresCxm }}
            </p>
            <p class="bold text-center">
              Concessions valides
            </p>
          </div>
          <div class="tablet-blob-1-4">
            <p class="h1 bold color-brand text-center">
              {{ surfaceExploitation }} ha
            </p>
            <p class="bold text-center">
              Surfaces cumulées des titres concernés par une activité
              d’exploitation.
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2>
      Indicateurs annuels de production et d’activité minière
    </h2>
    <span class="separator" />
    <p class="mb-xl">
      Les données affichées ici sont celles contenues dans la base de donnée
      Camino. Elles sont stabilisées pour l’année n-2 mais sont susceptibles
      d’évoluer jusqu’à la cloture de la collecte des déclarations
      règlementaires de l’année précédente pour l’année n-1. Ces données
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

    <div class="line-neutral mb-xl" />
    <GuyaneActivite :statistique-guyane="statistiques[tabActive]" />
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
      <h3>
        Évolution de la production annuelle d’or nette
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1].productionOr }} kg
          </p>
          <p>
            Production d’or nette (après affinage) issue des mines en Guyane
            l'an dernier
          </p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <LineChart
            :data="statsFormat('productionOr', 'Or net extrait en Kg')"
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des autorisations de recherche
        valides
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1]['titresArm'] }}
          </p>
          <p>
            autorisations de recherches octroyées l’an dernier
          </p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <LineChart
            :data="
              statsFormat('titresArm', 'autorisations de recherche valides')
            "
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des permis de recherche valides
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1]['titresPrm'] }}
          </p>
          <p>
            permis exclusifs de recherches octroyés l’an dernier
          </p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <LineChart :data="statsFormat('titresPrm', 'PER valides')" />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des autorisation d'exploitation
        valides
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1]['titresAxm'] }}
          </p>
          <p>
            autorisations d’exploitation octroyées l’an dernier
          </p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <LineChart
            :data="
              statsFormat('titresAxm', 'autorisation d\'exploitation valides')
            "
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des permis d'exploitation valides
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1]['titresPxm'] }}
          </p>
          <p>
            permis d’exploitation octroyés l’an dernier
          </p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <LineChart
            :data="statsFormat('titresPxm', 'permis d\'exploitation valides')"
          />
        </div>
      </div>
      <h3>
        Évolution du nombre et des surfaces des concessions valides
      </h3>
      <hr />
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl mt">
          <p class="h0 text-center">
            {{ statistiques[anneeCurrent - 1]['titresCxm'] }}
          </p>
          <p>
            concessions octroyées l’an dernier
          </p>
        </div>
        <div class="tablet-float-blob-2-3 relative mb-xl">
          <LineChart :data="statsFormat('titresCxm', 'Concessions valides')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import GuyaneActivite from './guyane-activite.vue'
import LineChart from '../_charts/line.vue'

export default {
  name: 'TableauBordGuyane',

  components: { Loader, GuyaneActivite, LineChart },

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
      return this.statistiquesGuyane.reduce((acc, statsAnnee) => {
        acc[statsAnnee.annee] = statsAnnee

        return acc
      }, {})
    },

    anneeCurrent() {
      return new Date().getFullYear()
    },

    surfaceExploration() {
      return this.numberFormat(
        this.statistiques[this.anneeCurrent].surfaceExploration
      )
    },

    surfaceExploitation() {
      return this.numberFormat(
        this.statistiques[this.anneeCurrent].surfaceExploitation
      )
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

    statsFormat(id, label) {
      return this.statistiquesGuyane.reduce(
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
    }
  }
}
</script>
