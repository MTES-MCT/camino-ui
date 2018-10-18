import { permissionsCheck } from '../utils'

var mixins = {
  methods: {
    permissions(p) {
      return (
        this.$store.state.user.current &&
        permissionsCheck(this.$store.state.user.current.permission, p)
      )
    }
  }
}

export default mixins
