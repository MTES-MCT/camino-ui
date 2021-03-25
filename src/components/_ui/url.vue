<template>
  <div />
</template>

<script>
import { paramsBuild, queryUpdate, queryClean } from './url.js'
import { nextTick } from '@vue/runtime-core'

export default {
  name: 'UiUrl',

  props: {
    values: { type: Object, required: true },
    params: { type: Object, required: true }
  },

  emits: ['loaded', 'params-update'],

  watch: {
    params: {
      handler: async function (params) {
        await this.update(params)
      },
      deep: true
    },

    '$route.query': async function () {
      // await this.update()
      // let hasChanged = false
      // Object.keys(this.values).forEach(id => {
      //   const paramString = this.params[id] || null
      //   const queryString = this.$route.query[id] || null
      //   if (paramString !== queryString) {
      //     hasChanged = true
      //     console.log(
      //       'url - watch - $route.query:',
      //       hasChanged,
      //       Object.keys(this.values),
      //       id,
      //       paramString,
      //       queryString
      //     )
      //   }
      // })
      // if (hasChanged) {
      //   // await this.init()
      // }
    }
  },

  async created() {
    await this.init()

    nextTick(() => {
      this.$emit('loaded')
    })
  },

  async unmounted() {
    const { query, updated } = queryClean(this.$route.query, this.values)

    if (updated) {
      await this.$router.replace({ query })
    }
  },

  methods: {
    async init() {
      console.log('init', this.params)
      const { query, params } = paramsBuild(
        this.params,
        this.$route.query,
        this.values
      )

      if (Object.keys(query).length) {
        await this.update(query)
      }

      if (Object.keys(params).length) {
        this.$emit('params-update', params)
      }
    },

    async update(params) {
      const { query, status } = queryUpdate(
        params,
        this.$route.query,
        this.values
      )

      if (status === 'updated') {
        await this.$router.push({ query })
      } else if (status === 'created') {
        await this.$router.replace({ query })
      }
    }
  }
}
</script>
