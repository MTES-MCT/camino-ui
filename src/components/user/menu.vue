<template>
  <div class="bg-alt">
    <div class="container pt">
      <div class="tablet-blobs mb flex-align-items-stretch">
        <div class="tablet-blob-1-3 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                id="cmn-user-menu-a-utilisateur"
                :key="user.id"
                :to="{ name: 'utilisateur', params: { id: user.id } }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
                @click.native="eventTrack('profil')"
              >
                {{ user.prenom || '–' }} {{ user.nom || '–' }}
                <div
                  v-if="user.entreprise"
                  class="h5 color-neutral"
                >
                  {{ user.entreprise.nom }}
                </div>
              </RouterLink>
            </li>
            <li>
              <button
                id="cmn-user-menu-button-deconnexion"
                class="btn-transparent text-decoration-none bold p-0"
                @click="logout"
              >
                Deconnexion
              </button>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-3 pl-s" />

        <div class="tablet-blob-1-3 pl-s" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',

  computed: {
    user() {
      return this.$store.state.user.current
    },
    menu() {
      return this.$store.state.menu
    }
  },

  methods: {
    logout() {
      this.eventTrack('deconnexion')
      if (this.menu.component && this.menu.component.name === 'MenuUser') {
        this.$store.commit('menuClose')
      }
      this.$store.dispatch('user/logout')
    },

    eventTrack(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent('menu-utilisateur', 'menu-utilisateur', id)
      }
    }
  }
}
</script>
