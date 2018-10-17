<template>
  <div class="bg-bg">
    <div class="container pt">
      <div class="tablet-blobs">

        <div class="tablet-blob-1-3">
          <ul class="list-sans">
            <li>
              <router-link
                :key="user.id"
                :to="{ name: 'utilisateur', params: { id: user.id }}"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
            >{{ user.prenom }} {{ user.nom }}</router-link></li>
            <li><a href="" /></li>
            <li><a href="" /></li>
            <li>
              <button 
                class="btn-transparent text-decoration-none bold p-0" 
                @click="logout"
              >Deconnexion</button>
            </li>
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
    user () {
      return this.$store.state.user.current
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
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
