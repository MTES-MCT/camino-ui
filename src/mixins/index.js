var mixins = {
  methods: {
    permissions(permissions) {
      return this.$store.state.utilisateur.permissions
        .map(p => p.id)
        .some(e => permissions.includes(e))
    }
  }
}

export default mixins
