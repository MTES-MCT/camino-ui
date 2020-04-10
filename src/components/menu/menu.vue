<template>
  <div class="bg-bg">
    <div class="container pt">
      <div class="tablet-blobs mb flex-align-items-stretch">
        <div class="tablet-blob-1-3 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                id="cmn-menu-menu-a-titres"
                :to="{ name: 'titres' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
                @click.native="trackMatomo('titres')"
              >
                Titres miniers et autorisations
              </RouterLink>
            </li>
            <li>
              <RouterLink
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'demarches' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
              >
                Demarches
              </RouterLink>
            </li>
          </ul>
        </div>
        <div v-if="sections.activites" class="tablet-blob-1-3 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                v-if="sections.activites"
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'activites' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
                @click.native="trackMatomo('activites')"
              >
                Activités
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-3 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                id="cmn-menu-menu-a-entreprises"
                :to="{ name: 'entreprises' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
                @click.native="trackMatomo('entreprises')"
              >
                Entreprises
              </RouterLink>
            </li>
            <li>
              <RouterLink
                v-if="sections.utilisateurs"
                id="cmn-menu-menu-a-utilisateurs"
                :to="{ name: 'utilisateurs' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
                @click.native="trackMatomo('utilisateurs')"
              >
                Utilisateurs
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',

  computed: {
    user() {
      return this.$store.state.user.current
    },

    sections() {
      return this.user ? this.user.sections : {}
    },

    menu() {
      return this.$store.state.menu
    }
  },

  methods: {
    trackMatomo(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent('menu-sections', 'menu-section', id)
      }
    }
  }
}
</script>
