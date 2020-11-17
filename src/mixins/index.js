import { permissionsCheck, dateFormat } from '../utils'
import numberFormat from '../utils/number-format'

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
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}

export default mixins
