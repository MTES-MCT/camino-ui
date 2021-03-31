<template>
  <div />
</template>

<script>
import { paramsBuild, queryUpdate, queryClean, paramsCompare } from './url.js'
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
      handler: async function (newParams, oldParams) {
        const hasChanged = paramsCompare(newParams, oldParams, this.values)
        console.log('url - watch - params:', hasChanged, newParams, oldParams)

        if (hasChanged) {
          await this.update(newParams)
        }
      },
      deep: true
    }

    // '$route.query': async function () {
    //   // await this.update()
    //   // let hasChanged = false
    //   // Object.keys(this.values).forEach(id => {
    //   //   const paramString = this.params[id] || null
    //   //   const queryString = this.$route.query[id] || null
    //   //   if (paramString !== queryString) {
    //   //     hasChanged = true
    //   //     console.log(
    //   //       'url - watch - $route.query:',
    //   //       hasChanged,
    //   //       Object.keys(this.values),
    //   //       id,
    //   //       paramString,
    //   //       queryString
    //   //     )
    //   //   }
    //   // })
    //   // if (hasChanged) {
    //   //   // await this.init()
    //   // }
    // }
  },

  async created() {
    await this.init()

    nextTick(() => {
      this.$emit('loaded')
    })
  },

  async unmounted() {
    const { query, updated } = queryClean(this.$route.query, this.values)
    console.log('url - unmounted:', updated, query)

    if (updated) {
      const res = await this.$router.replace({ query })

      console.log('url - unmounted - res:', res, this.$route.query)
    }
  },

  methods: {
    async init() {
      const { queryParams, params } = paramsBuild(
        this.params,
        this.$route.query,
        this.values
      )

      console.log('url - init:', this.params, queryParams, params)

      if (Object.keys(queryParams).length) {
        await this.update(queryParams)
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

      console.log(
        'url - update:',
        status,
        Object.keys(this.values),
        query,
        this.$route.query
      )
      let res
      if (status === 'updated') {
        res = await this.$router.push({ query })
      } else if (status === 'created') {
        res = await this.$router.replace({ query })
      }

      console.log('url - update - res:', res, this.$route.query)
    }
  }
}
</script>
