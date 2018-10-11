<template>
  <div class="bg-bg">
    <div class="container py">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3">
          <ul class="list-sans">
            <li>{{ utilisateur.id }}</li>
          </ul>
        </div>

        <div class="tablet-blob-1-3">
          <ul class="list-sans">
            <li><a 
              href="#" 
              class="decoration-none"
            >Profil</a></li>
            <li><a href="" /></li>
            <li><a href="" /></li>
            <li><button @click="logout">Deconnexion</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserMenu',

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
