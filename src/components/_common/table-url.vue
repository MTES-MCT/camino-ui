<template>
  <div>
    <Url
      :params="urlParams"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Table
      :colonnes="colonnes"
      :lignes="lignes"
      :preferences="preferences"
      :total="total"
      @elements:update="elementsUpdate"
      @preferences:update="preferencesUpdate"
    />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Table from './table.vue'

export default {
  components: {
    Url,
    Table
  },

  props: {
    colonnes: { type: Array, required: true },
    lignes: { type: Array, required: true },
    preferences: { type: Object, required: true },
    total: { type: Number, required: true },
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
