<template>
  <div />
</template>

<script>
import { nextTick } from 'vue'
import { paramsBuild, valueGet, valueParse, valueStringify } from './url.js'

export default {
  name: 'UiUrl',

  props: {
    values: { type: Object, required: true },
    params: { type: Object, required: true }
  },

  emits: ['loaded', 'params-update'],

  watch: {
    params: {
      handler: function (params, old) {
        this.update(params)
      },
      deep: true
    },

    $route: function (to, from) {
      if (to.query.vue !== from.query.vue) {
        this.init()
      }
    }
  },

  created() {
    this.init()

    nextTick(() => {
      this.$emit('loaded')
    })
  },

  unmounted() {
    const { query, updated } = Object.keys(this.$route.query).reduce(
      ({ query, updated }, id) => {
        if (this.values[id]) {
          updated = true
        } else {
          query[id] = this.$route.query[id]
        }

        return { query, updated }
      },
      { query: {}, updated: false }
    )

    if (updated) {
      this.$router.replace({ query })
    }
  },

  methods: {
    init() {
      const { queryParams, eventParams } = paramsBuild(
        this.params,
        this.values,
        this.$route.query
      )

      if (Object.keys(queryParams).length) {
        this.update(queryParams)
      }

      if (Object.keys(eventParams).length) {
        this.$emit('params-update', eventParams)
      }
    },

    update(params) {
      const query = Object.keys(this.$route.query).reduce((query, id) => {
        query[id] = valueStringify(
          id,
          valueParse(
            id,
            valueGet(id, this.$route.query[id], this.values),
            this.values
          ),
          this.values
        )

        return query
      }, {})

      let status = 'unchanged'

      Object.keys(params).forEach(id => {
        const queryString = query[id] || null
        const paramString = valueStringify(id, params[id], this.values)
        // on compare avec null si le paramètre n'est pas dans la query
        if (queryString !== paramString) {
          status = queryString || status === 'updated' ? 'updated' : 'created'

          if (paramString) {
            query[id] = paramString
          } else {
            delete query[id]
          }
        }
      })

      if (status === 'updated') {
        this.$router.push({ query })
      } else if (status === 'created') {
        this.$router.replace({ query })
      }
    }
  }
}
</script>
