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
    },

    fileNameCreate(name, ext) {
      const d = new Date()
      const dd = d
        .getDate()
        .toString()
        .padStart(2, '0')
      const mm = (d.getMonth() + 1).toString().padStart(2, '0')
      const yyyy = d.getFullYear()
      const hh = d
        .getHours()
        .toString()
        .padStart(2, '0')
      const mi = d
        .getMinutes()
        .toString()
        .padStart(2, '0')
      return `${yyyy}${mm}${dd}-${hh}h${mi}-${name}.${ext}`
    }
  }
}

export default mixins
