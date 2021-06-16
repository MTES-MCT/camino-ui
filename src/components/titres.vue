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

    <Preview
      :titres="titres"
      :initialized="initialized"
      :vue-id="vueId"
      :total="total"
      @vueSet="vueSet"
    />
  </div>
</template>

<script>
import Filtres from './titres/filtres.vue'
import Preview from './titres/preview.vue'

export default {
  name: 'Titres',

  components: { Filtres, Preview },

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
      if (!this.loading) {
        await this.$store.dispatch('titres/vueSet', vueId)

        if (this.$matomo) {
          this.$matomo.trackEvent('titres-vue', 'titres-vueId', vueId)
        }
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
