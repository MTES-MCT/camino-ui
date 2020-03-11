<template>
  <div />
</template>

<script>
export default {
  name: 'UiUrl',

  props: {
    params: {
      type: Object,
      required: true
    },
    values: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    params: {
      handler: function(params) {
        this.update(params)
      },
      deep: true
    }
  },

  created() {
    this.init()
  },

  destroyed() {
    const { query, updated } = Object.keys(this.$route.query).reduce(
      ({ query, updated }, id) => {
        if (this.params[id]) {
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
      const paramsBuild = params =>
        Object.keys(params).reduce(
          ({ updateParams, eventParams }, id) => {
            const value = this.queryValueGet(id, this.$route.query[id])

            if (!value && params[id]) {
              updateParams[id] = params[id]
            } else if (value && value !== this.params[id]) {
              eventParams[id] = value
            }

            return { updateParams, eventParams }
          },
          { updateParams: {}, eventParams: {} }
        )

      const { updateParams, eventParams } = paramsBuild(this.params)

      if (Object.keys(updateParams).length) {
        this.update(updateParams)
      }

      if (Object.keys(eventParams).length) {
        this.$emit('params:update', eventParams)
      }
    },

    queryValueGet(id, value) {
      if (!value) return null

      if (Number(value)) {
        value = Number(value)
      }

      // if (this.values[id] && !this.values[id].includes(value)) return null

      return value
    },

    update(params) {
      const query = Object.keys(this.$route.query).reduce((query, id) => {
        const value = this.queryValueGet(id, this.$route.query[id])
        query[id] = value

        return query
      }, {})

      let status

      Object.keys(params).forEach(id => {
        if ((query[id] || null) !== (params[id] || null)) {
          status = query[id] || status === 'updated' ? 'updated' : 'created'

          if (params[id]) {
            query[id] = params[id]
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
