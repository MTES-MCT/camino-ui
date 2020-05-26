<template>
  <div>
    <Url
      :params="urlParams"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Filtres
      :filtres="filtres"
      :preferences="preferences"
      :metas="metas"
      @elements:update="elementsUpdate"
      @preferences:update="preferencesUpdate"
    />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Filtres from './filtres.vue'

export default {
  components: { Url, Filtres },

  props: {
    filtres: { type: Array, required: true },
    preferences: { type: Object, required: true },
    metas: { type: Object, required: true },
    params: { type: Array, required: true }
  },

  computed: {
    urlParams() {
      const paramsIds = Object.keys(this.preferences)

      return this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  methods: {
    elementsUpdate() {
      this.$emit('elements:update')
    },

    preferencesUpdate(params) {
      this.$emit('preferences:update', params)
    }
  }
}
</script>
