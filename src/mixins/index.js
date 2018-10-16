import { permissions } from '../utils'

var mixins = {
  methods: {
    permissions(p) {
      return (
        this.$store.state.user.current &&
        permissions(this.$store.state.user.current.permission, p)
      )
    }
  }
}

export default mixins
