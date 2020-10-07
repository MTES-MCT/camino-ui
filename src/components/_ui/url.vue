<template>
  <div />
</template>

<script>
import Vue from 'vue'
export default {
  name: 'UiUrl',

  props: {
    values: { type: Object, required: true },
    params: { type: Object, required: true }
  },

  watch: {
    params: {
      handler: function(params, old) {
        this.update(params)
      },
      deep: true
    },

    $route: function(to, from) {
      this.init()
    }
  },

  created() {
    this.init()

    Vue.nextTick(() => {
      this.$emit('loaded')
    })
  },

  destroyed() {
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
      const paramsBuild = () =>
        Object.keys(this.params).reduce(
          ({ queryParams, eventParams }, id) => {
            const paramValue = this.params[id]
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

      const { queryParams, eventParams } = paramsBuild()

      if (Object.keys(queryParams).length) {
        this.update(queryParams)
      }

      if (Object.keys(eventParams).length) {
        this.$emit('params-update', eventParams)
      }
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
        const queryString = query[id] || null
        const paramString = this.stringify(id, params[id])
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
    },

    get(id, value) {
      if (!value) return null

      if (!(id in this.values)) return value

      return value || null
    },

    clean(id, value) {
      if (!value) return null

      if (!this.values[id] || !this.values[id].type) {
        return value
      }

      if (this.values[id].type === 'number') {
        if (this.values[id].max && value > this.values[id].max) {
          value = this.values[id].max
        } else if (this.values[id].min && value < this.values[id].min) {
          value = this.values[id].min
        }

        return value
      }

      if (
        (this.values[id].type === 'strings' ||
          this.values[id].type === 'numbers') &&
        this.values[id].elements
      ) {
        value = value
          .reduce((acc, v) => {
            if (this.values[id].elements.includes(v)) {
              acc.push(v)
            }

            return acc
          }, [])
          .sort()

        return value
      }

      if (this.values[id].type === 'tuple') {
        return !Number(value[0]) || !Number(value[1]) ? null : value.map(Number)
      }

      if (this.values[id].type === 'string') {
        return this.values[id].elements &&
          !this.values[id].elements.includes(value)
          ? null
          : value
      }

      if (this.values[id].type === 'objects') {
        // TODO: retirer les valeurs incorrectes

        return value.length ? value : null
      }

      return value
    },

    parse(id, value) {
      if (!value) return null

      if (!this.values[id] || !this.values[id].type) {
        return value
      }

      if (this.values[id].type === 'number') {
        value = Number(value)

        return isNaN(value) ? null : value
      }

      if (this.values[id].type === 'strings') {
        if (typeof value !== 'string') return null

        return value.split(',').sort()
      }

      if (this.values[id].type === 'numbers') {
        if (typeof value !== 'string') return null

        return value
          .split(',')
          .map(v => Number(v))
          .sort()
      }

      if (this.values[id].type === 'string') {
        return value
      }

      if (this.values[id].type === 'tuple') {
        if (typeof value !== 'string') return null

        return value.split(',').slice(0, 2)
      }

      if (this.values[id].type === 'objects') {
        return JSON.parse(value)
      }

      return value
    },

    stringify(id, value) {
      if (!(id in this.values)) return value

      if (!value) return null

      if (
        this.values[id].type === 'strings' ||
        this.values[id].type === 'tuple' ||
        this.values[id].type === 'numbers'
      ) {
        return value.length ? value.join(',') : null
      }

      if (this.values[id].type === 'number') {
        return value.toString()
      }

      if (this.values[id].type === 'objects') {
        if (!value.length) return null

        // entrée <=
        // [{ b: 2, a: 2 }, { a: 2, b: 1 }, { a: 1, b: 2 }]
        // sortie =>
        // [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 }]

        const values = value
          .reduce((objects, object) => {
            object = Object.keys(object)
              .sort()
              .reduce((o, k) => {
                if (object[k] !== '') {
                  o[k] = object[k]
                }

                return o
              }, {})

            if (Object.keys(object).length) {
              objects.push(JSON.stringify(object))
            }

            return objects
          }, [])
          .sort()

        if (!values.length) return null

        return `[${values.join(',')}]`
      }

      return value
    }
  }
}
</script>
