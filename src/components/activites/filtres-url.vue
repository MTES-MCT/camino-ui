<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Filtres @activites:update="activitesUpdate" />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Filtres from './filtres.vue'
export default {
  components: {
    Url,
    Filtres
  },
  computed: {
    preferences() {
      return this.$store.state.titresActivites.preferences.filtres
    },
    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.titresActivites.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },
  methods: {
    activitesUpdate() {
      this.$emit('activites:update')
    },
    preferencesUpdate(params) {
      this.$store.dispatch('titresActivites/preferencesSet', {
        section: 'filtres',
        params
      })
    }
  }
}
</script>
