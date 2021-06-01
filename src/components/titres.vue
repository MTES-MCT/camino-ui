<template>
  <div>
    <div class="desktop-blobs">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m">Titres miniers et autorisations</h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="titresDemandeCreation"
          class="btn small rnd-xs py-s px-m full-x flex"
          @click="titreDemandeOpen"
        >
          <span class="mt-xxs">Demander un titre…</span>
          <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <Filtres :initialized="initialized" />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="titres.length"
          :formats="['geojson', 'csv', 'xlsx', 'ods']"
          section="titres"
          class="flex-right full-x downloads"
        />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div
          v-for="v in vues"
          :key="v.id"
          class="mr-xs"
          :class="{ active: vueId === v.id }"
        >
          <button
            v-if="vueId !== v.id"
            class="p-m btn-tab rnd-t-s"
            @click="vueClick(v.id)"
          >
            <i :class="`icon-${v.icon}`" class="icon-24" />
          </button>
          <div v-else class="p-m span-tab rnd-t-s">
            <i :class="`icon-${v.icon}`" class="icon-24" />
          </div>
        </div>
        <div class="pl-m pt-m h5 bold">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line-neutral width-full" />
    <template v-if="initialized">
      <Map v-if="vueId === 'carte'" :titres="titres" />

      <Table v-else-if="vueId === 'table'" :titres="titres" :total="total" />
    </template>
    <div v-else class="table-view mb-xxl mt">…</div>
  </div>
</template>

<script>
import Downloads from './_common/downloads.vue'
import Table from './titres/table-pagination.vue'
import Map from './titres/map.vue'
import Filtres from './titres/filtres.vue'

export default {
  name: 'Titres',

  components: { Filtres, Downloads, Map, Table },

  data() {
    return {
      vues: [
        { id: 'carte', icon: 'globe' },
        { id: 'table', icon: 'list' }
      ]
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    titres() {
      return this.$store.state.titres.elements
    },

    metas() {
      return {
        domaines: this.$store.state.titres.metas.domaines,
        types: this.$store.state.titres.metas.types,
        statuts: this.$store.state.titres.metas.statuts
      }
    },

    initialized() {
      return this.$store.state.titres.initialized
    },

    preferences() {
      return this.$store.state.titres.params
    },

    vueId() {
      return this.$store.state.titres.vueId
    },

    titresCreation() {
      return this.$store.state.user.metas.domaines.some(d =>
        d.titresTypes.some(dtt => dtt.titresCreation)
      )
    },

    titresDemandeCreation() {
      return this.$store.state.user.metas.entreprisesTitresCreation.length
    },

    total() {
      return this.$store.state.titres.total
    },

    resultat() {
      const res =
        this.total > this.titres.length
          ? `${this.titres.length} / ${this.total}`
          : this.titres.length

      return `${res} résultat${this.titres.length > 1 ? 's' : ''}`
    },

    loading() {
      return this.$store.state.loading.includes('titres')
    }
  },

  watch: {
    user: 'init',

    '$route.query': {
      handler: function () {
        this.$store.dispatch('titres/routeUpdate')
      }
    }
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('titres/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titres/init')
    },

    async vueSet(vueId) {
      await this.$store.dispatch('titres/vueSet', vueId)

      if (this.$matomo) {
        this.$matomo.trackEvent('titres-vue', 'titres-vueId', vueId)
      }
    },

    vueClick(vueId) {
      if (!this.loading) {
        this.vueSet(vueId)
      }
    },

    titreDemandeOpen() {
      this.$router.push({ name: 'titre-creation' })
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
