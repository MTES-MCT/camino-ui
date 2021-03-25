<template>
  <div />
</template>

<script>
import { nextTick } from 'vue'
import { paramsBuild, queryUpdate, queryClean } from './url.js'

export default {
  name: 'UiUrl',

  props: {
    values: { type: Object, required: true },
    params: { type: Object, required: true }
  },

  emits: ['loaded', 'params-update'],

  watch: {
    params: {
      handler: function (params) {
        this.update(params)
      },
      deep: true
    },

    $route: function () {
      this.init()
    }
  },

  created() {
    this.init()

    nextTick(() => {
      this.$emit('loaded')
    })
  },

  unmounted() {
    const { query, updated } = queryClean(this.$route.query, this.values)

    if (updated) {
      this.$router.replace({ query })
    }
  },

  methods: {
    init() {
      const { query, params } = paramsBuild(
        this.params,
        this.$route.query,
        this.values
      )

      if (Object.keys(query).length) {
        this.update(query)
      }

      if (Object.keys(params).length) {
        this.$emit('params-update', params)
      }
    },

    update(params) {
      const { query, status } = queryUpdate(
        params,
        this.$route.query,
        this.values
      )

      if (status === 'updated') {
        this.$router.push({ query })
      } else if (status === 'created') {
        this.$router.replace({ query })
      }
    }
  }
}
</script>
