<template>
  <div class="bg-bg">
    <div class="container pt">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3">
          <ul class="list-sans">
            <li>
              <RouterLink
                id="cmn-menu-menu-a-titres"
                :to="{ name: 'titres' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
              >
                Titres miniers et autorisations
              </RouterLink>
            </li>
            <li>
              <RouterLink
                v-if="sections.activites"
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'activites' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
              >
                Activités
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
            <li>
              <RouterLink
                id="cmn-menu-menu-a-entreprises"
                :to="{ name: 'entreprises' }"
                class="btn-transparent text-decoration-none bold"
                active-class="active"
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

  methods: {}
}
</script>
