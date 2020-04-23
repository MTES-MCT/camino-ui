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
      required: true
    }
  },

  watch: {
    values: {
      handler: function(values, old) {
        const params = Object.keys(values).reduce((params, id) => {
          params[id] = this.valueStringify(id, values[id])

          return params
        }, {})

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
      const paramsBuild = values =>
        Object.keys(values).reduce(
          ({ urlParams, eventParams }, id) => {
            const queryValue = this.queryValueClean(
              id,
              this.queryValueGet(id, this.$route.query[id])
            )

            const paramValue = this.valueStringify(id, values[id])

            if (!queryValue && paramValue) {
              urlParams[id] = paramValue
            } else if (queryValue && queryValue !== this.$route.query[id]) {
              urlParams[id] = queryValue
            }

            if (queryValue && queryValue !== paramValue) {
              eventParams[id] = this.queryValueParse(id, queryValue)
            }

            return { urlParams, eventParams }
          },
          { urlParams: {}, eventParams: {} }
        )

      const { urlParams, eventParams } = paramsBuild(this.values)

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

      if (this.params[id] && this.params[id].type === 'number') {
        return Number(value)
      }

      return value || null
    },

    queryValueClean(id, value) {
      if (!value) return null

      if (!this.params[id] || !this.params[id].type) {
        return value
      } else if (this.params[id].type === 'number') {
        value = Number(value)
        if (!value) {
          value = null
        } else if (this.params[id].max && value > this.params[id].max) {
          value = this.params[id].max
        } else if (this.params[id].min && value < this.params[id].min) {
          value = this.params[id].min
        }
      } else if (this.params[id].type === 'array' && this.params[id].elements) {
        value = value
          .split(',')
          .reduce((acc, v) => {
            if (this.params[id].elements.includes(v)) {
              acc.push(v)
            }

            return acc
          }, [])
          .join(',')
      } else if (this.params[id].type === 'string') {
        value = value.toString()

        if (
          this.params[id].elements &&
          !this.params[id].elements.includes(value)
        ) {
          value = null
        }
      } else if (this.params[id].type === 'tuple') {
        const values = value.split(',')
        if (!Number(values[0]) || !Number(values[1])) {
          value = null
        }
      } else return value
    },

    queryValueParse(id, value) {
      if (!this.params[id] || !this.params[id].type) {
        return value
      }

      if (this.params[id].type === 'number') {
        return Number(value)
      }

      if (this.params[id].type === 'array') {
        return value.split(',').sort()
      }

      if (this.params[id].type === 'string') {
        return value.toString()
      }

      if (this.params[id].type === 'tuple') {
        return value.split(',')
      }
    },

    valueStringify(id, value) {
      if (!(id in this.params)) return value

      if (!value) return null

      if (
        this.params[id].type === 'array' ||
        this.params[id].type === 'tuple'
      ) {
        return value.length ? value.slice().join(',') : null
      }

      if (this.params[id].type === 'number') {
        return Number(value)
      }

      return value.toString()
    },

    update(params) {
      const query = Object.keys(this.$route.query).reduce((query, id) => {
        query[id] = this.queryValueGet(id, this.$route.query[id])

        return query
      }, {})

      let status

      Object.keys(params).forEach(id => {
        if ((query[id] || null) !== params[id]) {
          status = query[id] ? 'updated' : 'created'

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
