<template>
  <Liste
    nom="métas"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="metas"
    :params="params"
    :total="metas.length"
    :initialized="initialized"
    @params-update="paramsUpdate"
  />
</template>

<script>
import Liste from './_common/liste.vue'
import { metasColonnes, metasLignesBuild } from './metas/table'

export default {
  name: 'Metas',

  components: { Liste },

  data() {
    return {
      colonnes: metasColonnes,
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

    metas() {
      return this.$store.getters['metas/elements']
    },

    preferences() {
      return this.$store.state.metas.preferences
    },

    params() {
      return this.$store.state.metas.params
    },

    lignes() {
      return metasLignesBuild(this.metas)
    },

    initialized() {
      return this.$store.state.metas.initialized
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()
  },

  unmounted() {
    this.$store.commit('metas/reset')
  },

  methods: {
    async init() {
      if (!this.user || !this.user.sections || !this.user.sections.metas) {
        await this.$store.dispatch('pageError')
      } else {
        this.visible = true
      }
    },

    async paramsUpdate(options) {
      await this.$store.dispatch(`metas/paramsSet`, options)
    }
  }
}
</script>
