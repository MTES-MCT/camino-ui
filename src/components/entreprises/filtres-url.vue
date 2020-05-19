<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Filtres @entreprises:update="entreprisesUpdate" />
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
      return this.$store.state.entreprises.preferences.filtres
    },
    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.entreprises.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },
  methods: {
    entreprisesUpdate() {
      this.$emit('entreprises:update')
    },
    preferencesUpdate(params) {
      this.$store.dispatch('entreprises/preferencesSet', {
        section: 'filtres',
        params
      })
    }
  }
}
</script>
