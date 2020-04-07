import { permissionsCheck, numberFormat } from '../utils'

var mixins = {
  methods: {
    permissionsCheck(permissions) {
      return (
        !!this.$store.state.user.current &&
        !!this.$store.state.user.current.permission &&
        permissionsCheck(this.$store.state.user.current.permission, permissions)
      )
    },

    numberFormat(number) {
      return numberFormat(number)
    }
  }
}

export default mixins
