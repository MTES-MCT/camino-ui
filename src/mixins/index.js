var mixins = {
  methods: {
    permissions(permissions) {
      return (
        this.$store.state.user.current &&
        this.$store.state.user.current.permissions
          .map(p => p.id)
          .some(e => permissions.includes(e))
      )
    }
  }
}

export default mixins
