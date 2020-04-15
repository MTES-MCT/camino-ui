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
          ({ urlParams, eventParams }, id) => {
            const value = this.queryValueClean(
              id,
              this.queryValueGet(id, this.$route.query[id])
            )

            if (!value && params[id]) {
              urlParams[id] = params[id]
            } else if (value && value !== this.$route.query[id]) {
              urlParams[id] = value
            }

            if (value && value !== this.params[id]) {
              eventParams[id] = value
            }

            return { urlParams, eventParams }
          },
          { urlParams: {}, eventParams: {} }
        )

      const { urlParams, eventParams } = paramsBuild(this.params)

      if (Object.keys(urlParams).length) {
        this.update(urlParams)
      }

      if (Object.keys(eventParams).length) {
        this.$emit('params:update', eventParams)
      }
    },

    queryValueGet(id, value) {
      if (!value) return null

      if (!(id in this.params)) return value

      if (this.values[id] && this.values[id].type === 'number') {
        value = Number(value)
      }

      return value
    },

    queryValueClean(id, value) {
      if (!value) return null

      if (!this.values[id] || !this.values[id].type) {
        return value
      } else if (this.values[id].type === 'number') {
        value = Number(value)
        if (!value) {
          value = null
        } else if (this.values[id].max && value > this.values[id].max) {
          value = this.values[id].max
        } else if (this.values[id].min && value < this.values[id].min) {
          value = this.values[id].min
        }
      } else if (this.values[id].type === 'array' && this.values[id].values) {
        const values = value.split(',')
        value = values
          .reduce((acc, v) => {
            if (this.values[id].values.includes(v)) {
              acc.push(v)
            }

            return acc
          }, [])
          .join(',')
      } else if (this.values[id].type === 'string') {
        value = value.toString()

        if (this.values[id].values && !this.values[id].values.includes(value)) {
          value = null
        }
      } else if (this.values[id].type === 'tuple') {
        const values = value.split(',')
        if (!Number(values[0]) || !Number(values[1])) {
          value = null
        }
      }

      return value
    },

    update(params) {
      const query = Object.keys(this.$route.query).reduce((query, id) => {
        query[id] = this.queryValueGet(id, this.$route.query[id])

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
