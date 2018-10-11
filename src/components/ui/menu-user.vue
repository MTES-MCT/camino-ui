<template>
  <div>
    <div class="container">
      {{ utilisateur.id }}
      <ul class="list-sans">
        <li><a href="#">Profil</a></li>
        <li><a href="" /></li>
        <li><a href="" /></li>
        <li><button @click="logout">Deconnexion</button></li>
      </ul>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'MenuUser',

  computed: {
    utilisateur () {
      return this.$store.state.utilisateur
    },
    menu () {
      return this.$store.state.menu
    }
  },

  methods: {
    logout () {
      if (this.menu.component && this.menu.component.name === 'MenuUser') {
        this.$store.commit('menuClose')
      }
      this.$store.dispatch('utilisateur/logout')
    }
  }
}
</script>
