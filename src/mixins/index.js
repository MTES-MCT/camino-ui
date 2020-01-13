import { permissionsCheck, numberFormat } from '../utils'

var mixins = {
  methods: {
    permissionsCheck(permissions) {
      return (
        !!this.$store.state.user.current &&
        permissionsCheck(this.$store.state.user.current.permission, permissions)
      )
    },

    numberFormat(number) {
      return numberFormat(number)
    },

    urlParamSet(id, value) {
      const query = Object.assign({}, this.$route.query)

      if (query[id] !== value) {
        if (value) {
          query[id] = value
        } else {
          delete query[id]
        }

        if (this.$route.query[id]) {
          this.$router.push({ query })
        } else {
          this.$router.replace({ query })
        }
      }
    }
  }
}

export default mixins
