<template>
  <Loader
    v-if="!loaded"
    class="content"
  />
  <div
    v-else
    class="content"
  >
    <div
      id="etat"
      class="mb-xxl"
    >
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
      <h3>
        Autorisations et titres d’exploration
      </h3>
      <div class="desktop-blobs">
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ statistiques[anneeCurrent].titresArm }}
          </p>
          <p class="bold">
            Autorisations de recherche valides
          </p>
        </div>
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ statistiques[anneeCurrent].titresPrm }}
          </p>
          <p class="bold">
            Permis de recherche valides
          </p>
        </div>
        <div class="desktop-blob-1-4 text-center" />
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ surfaceExploration }} ha
          </p>
          <p class="bold">
            Surfaces cumulées des titres concernés par une activité
            d’exploration sur l’année en cours.
          </p>
        </div>
      </div>
      <h3>
        Autorisatiovlns et titres d’exploitation
      </h3>
      <div class="desktop-blobs">
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ statistiques[anneeCurrent].titresAxm }}
          </p>
          <p class="bold">
            Autorisations d'exploitation valides
          </p>
        </div>
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ statistiques[anneeCurrent].titresPxm }}
          </p>
          <p class="bold">
            Permis d'exploitation valides
          </p>
        </div>
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ statistiques[anneeCurrent].titresCxm }}
          </p>
          <p class="bold">
            Concessions valides
          </p>
        </div>
        <div class="desktop-blob-1-4 text-center">
          <p class="h0">
            {{ surfaceExploitation }} ha
          </p>
          <p class="bold">
            Surfaces cumulées des titres concernés par une activité
            d’exploitation sur l’année en cours.
          </p>
        </div>
      </div>
    </div>

    <h2>
      Indicateurs annuels de production et d’activité minière
    </h2>
    <span class="separator" />
    <p>
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
        <div
          class="p-m btn-tab rnd-t-s"
          @click="tabToggle(tab.id)"
        >
          {{ tab.nom }}
        </div>
      </div>
    </div>

    <div class="line-neutral mb" />
    <GuyaneActivite :statistique-guyane="statistiques[tabActive]" />
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
        peuvent ne pas être exhautives. Ces données concernent exclusivement le
        territoire guyanais.
      </p>
      <p class="bold mt-xxl">
        Evolution de la production annuelle d’or nette
      </p>
      <div class="desktop-float-blobs mb-xl clearfix">
        <div class="desktop-float-blob-2-3 relative">
          <LineChart :data="statsFormat('productionOr', 'Or net extrait en Kg')" />
        </div>
        <div class="desktop-float-blob-1-3 text-center">
          <p class="h0">
            {{ productionOrEvo }} kg
          </p>
          <p>
            Production d’or nette (après affinage) issue des mines en Guyane.
          </p>
        </div>
      </div>
      <p class="bold mt-xxl">
        Évolution du nombre et des surfaces des autorisations de recherche valides
      </p>
      <div class="desktop-float-blobs mb-xl clearfix">
        <div class="desktop-float-blob-2-3 relative">
          <LineChart :data="statsFormat('titresArm', 'autorisations de recherche valides')" />
        </div>
        <div class="desktop-float-blob-1-3 text-center">
          <p class="h0">
            {{ getEvo('titresArm') }}
          </p>
          <p>
            autorisations de recherches octroyées l’an dernier.
          </p>
        </div>
      </div>
      <p class="bold mt-xxl">
        Évolution du nombre et des surfaces des permis de recherche valides
      </p>
      <div class="desktop-float-blobs mb-xl clearfix">
        <div class="desktop-float-blob-2-3 relative">
          <LineChart :data="statsFormat('titresPrm', 'PER valides')" />
        </div>
        <div class="desktop-float-blob-1-3 text-center">
          <p class="h0">
            {{ getEvo('titresPrm') }}
          </p>
          <p>
            permis exclusifs de recherches octroyés l’an dernier.
          </p>
        </div>
      </div>
      <p class="bold mt-xxl">
        Évolution du nombre et des surfaces des autorisation d'exploitation valides
      </p>
      <div class="desktop-float-blobs mb-xl clearfix">
        <div class="desktop-float-blob-2-3 relative">
          <LineChart :data="statsFormat('titresAxm', 'autorisation d\'exploitation valides')" />
        </div>
        <div class="desktop-float-blob-1-3 text-center">
          <p class="h0">
            {{ getEvo('titresAxm') }}
          </p>
          <p>
            autorisations d’exploitation octroyées l’an dernier.
          </p>
        </div>
      </div>
      <p class="bold mt-xxl">
        Évolution du nombre et des surfaces des permis d'exploitation valides
      </p>
      <div class="desktop-float-blobs mb-xl clearfix">
        <div class="desktop-float-blob-2-3 relative">
          <LineChart :data="statsFormat('titresPxm', 'permis d\'exploitation valides')" />
        </div>
        <div class="desktop-float-blob-1-3 text-center">
          <p class="h0">
            {{ getEvo('titresPxm') }}
          </p>
          <p>
            permis d’exploitation octroyés l’an dernier.
          </p>
        </div>
      </div>
      <p class="bold mt-xxl">
        Évolution du nombre et des surfaces des concessions valides
      </p>
      <div class="desktop-float-blobs mb-xl clearfix">
        <div class="desktop-float-blob-2-3 relative">
          <LineChart :data="statsFormat('titresCxm', 'Concessions valides')" />
        </div>
        <div class="desktop-float-blob-1-3 text-center">
          <p class="h0">
            {{ getEvo('titresCxm') }}
          </p>
          <p>
            concessions octroyées l’an dernier.
          </p>
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
      return Intl.NumberFormat('FR-fr').format(
        this.statistiques[this.anneeCurrent].surfaceExploration
      )
    },

    surfaceExploitation() {
      return Intl.NumberFormat('FR-fr').format(
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
    },

    productionOrEvo() {
      const evo =
        this.statistiques[this.anneeCurrent].productionOr -
        this.statistiques[this.anneeCurrent - 1].productionOr

      if (evo > 0) {
        return `+${evo}`
      }

      return evo.toString()
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

    getEvo(id) {
      const evo =
        this.statistiques[this.anneeCurrent][id] -
        this.statistiques[this.anneeCurrent - 1][id]

      if (evo > 0) {
        return `+${evo}`
      }

      return evo.toString()
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    },

    statsFormat(id, label) {
      return this.statistiquesGuyane.reduce(
        (acc, statsAnnee) => {
          console.log(statsAnnee, id)
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
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)'
            }
          ]
        }
      )
    }
  }
}
</script>
