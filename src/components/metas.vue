<template>
  <liste
    nom="métas"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="metas"
    :preferences="preferences"
    :params="params"
    :total="metas.length"
    :metas-loaded="true"
    @preferences-update="preferencesUpdate"
    @url-load="urlLoad"
  >
  </liste>
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
      return this.$store.state.user.current
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

    metasLoaded() {
      return this.$store.state.metas.loaded.metas
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()
  },

  destroyed() {
    this.$store.commit('metas/reset')
  },

  methods: {
    async init() {
      // if (!this.user || !this.user.sections || !this.user.sections.metas) {
      //   await this.$store.dispatch('pageError')
      // } else {
      this.visible = true
      // }
    },

    urlLoad() {
      this.$store.dispatch('metas/urlLoad')
    },

    async preferencesUpdate(options) {
      console.log(options)
      await this.$store.dispatch(`metas/preferencesSet`, options)
    }
  }
}
</script>
