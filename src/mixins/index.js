import { permissionsCheck } from '../utils'

var mixins = {
  methods: {
    permissionsCheck(permissions) {
      return (
        this.$store.state.user.current &&
        permissionsCheck(this.$store.state.user.current.permission, permissions)
      )
    }
  }
}

export default mixins
