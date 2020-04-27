<template>
  <div />
</template>

<script>
export default {
  name: 'UiUrl',

  props: {
    // TODO: renommer en fields
    params: {
      type: Object,
      required: true
    },

    // TODO: renommer en params
    values: {
      type: Object,
      required: true
    }
  },

  watch: {
    values: {
      handler: function(values, old) {
        this.update(values)
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
          ({ queryParams, eventParams }, id) => {
            const paramValue = params[id]
            const queryValue = this.clean(
              id,
              this.parse(id, this.get(id, this.$route.query[id]))
            )
            const paramString = this.stringify(id, paramValue)
            const queryString = this.stringify(id, queryValue)

            if (!queryString && paramString) {
              queryParams[id] = paramValue
            } else if (queryString && queryString !== this.$route.query[id]) {
              // si le paramètre d'URL a été nettoyé, on le met à jour dans l'URL
              queryParams[id] = queryValue
            }

            if (queryString && queryString !== paramString) {
              eventParams[id] = queryValue
            }

            return { queryParams, eventParams }
          },
          { queryParams: {}, eventParams: {} }
        )

      const { queryParams, eventParams } = paramsBuild(this.values)

      if (Object.keys(queryParams).length) {
        this.update(queryParams)
      }

      if (Object.keys(eventParams).length) {
        this.$emit('params:update', eventParams)
      }
    },

    get(id, value) {
      if (!value) return null

      if (!(id in this.params)) return value

      return value || null
    },

    clean(id, value) {
      if (!value) return null

      if (!this.params[id] || !this.params[id].type) {
        return value
      }

      if (this.params[id].type === 'number') {
        if (this.params[id].max && value > this.params[id].max) {
          value = this.params[id].max
        } else if (this.params[id].min && value < this.params[id].min) {
          value = this.params[id].min
        }

        return value
      }

      if (this.params[id].type === 'array' && this.params[id].elements) {
        value = value
          .reduce((acc, v) => {
            if (this.params[id].elements.includes(v)) {
              acc.push(v)
            }

            return acc
          }, [])
          .sort()

        return value
      }

      if (this.params[id].type === 'tuple') {
        return !Number(value[0]) || !Number(value[1]) ? null : value
      }

      if (this.params[id].type === 'string') {
        return this.params[id].elements &&
          !this.params[id].elements.includes(value)
          ? null
          : value
      }

      if (this.params[id].type === 'objects') {
        // TODO: retirer les valeurs incorrectes

        return value.length ? value : null
      }

      return value
    },

    parse(id, value) {
      if (!value) return null

      if (!this.params[id] || !this.params[id].type) {
        return value
      }

      if (this.params[id].type === 'number') {
        value = Number(value)

        return isNaN(value) ? null : value
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

      if (this.params[id].type === 'objects') {
        return JSON.parse(value)
      }

      return value
    },

    stringify(id, value) {
      if (!(id in this.params)) return value

      if (!value) return null

      if (
        this.params[id].type === 'array' ||
        this.params[id].type === 'tuple'
      ) {
        return value.length ? value.join(',') : null
      }

      if (this.params[id].type === 'number') {
        return value.toString()
      }

      if (this.params[id].type === 'objects') {
        if (!value.length) return null

        // entrée <=
        // [{ b: 2, a: 2 }, { a: 2, b: 1 }, { a: 1, b: 2 }]
        // sortie =>
        // [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 }]

        value = value
          .map(a =>
            JSON.stringify(
              Object.keys(a)
                .sort()
                .reduce((o, k) => {
                  o[k] = a[k]

                  return o
                }, {})
            )
          )
          .sort()

        return `[${value.join(',')}]`
      }

      return value
    },

    update(params) {
      const query = Object.keys(this.$route.query).reduce((query, id) => {
        query[id] = this.stringify(
          id,
          this.parse(id, this.get(id, this.$route.query[id]))
        )

        return query
      }, {})

      let status = 'unchanged'

      Object.keys(params).forEach(id => {
        // on compare avec null si le paramètre n'est pas dans la query
        const queryString = query[id] || null

        const paramString = this.stringify(id, params[id])

        if (queryString !== paramString) {
          status = queryString ? 'updated' : 'created'

          if (params[id]) {
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
