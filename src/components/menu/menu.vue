<template>
  <div class="bg-alt">
    <div class="container pt">
      <div class="tablet-blobs mb flex-align-items-stretch">
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                v-if="$route.name !== 'titres'"
                id="cmn-menu-menu-a-titres"
                :to="{ name: 'titres' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('titres')"
              >
                Titres miniers et autorisations
              </RouterLink>
              <div v-else class="bold color-neutral">
                Titres miniers et autorisations
              </div>
            </li>
            <li>
              <RouterLink
                v-if="$route.name !== 'demarches'"
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'demarches' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('demarches')"
              >
                Démarches
              </RouterLink>
              <div v-else class="bold color-neutral">Démarches</div>
            </li>
          </ul>
        </div>
        <div v-if="sections.activites" class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li v-if="sections.activites">
              <RouterLink
                v-if="$route.name !== 'activites'"
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'activites' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('activites')"
              >
                Activités
              </RouterLink>
              <div v-else class="bold color-neutral">Activités</div>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                v-if="$route.name !== 'entreprises'"
                id="cmn-menu-menu-a-entreprises"
                :to="{ name: 'entreprises' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('entreprises')"
              >
                Entreprises
              </RouterLink>
              <div v-else class="bold color-neutral">Entreprises</div>
            </li>
            <li v-if="sections.utilisateurs">
              <RouterLink
                v-if="$route.name !== 'utilisateurs'"
                id="cmn-menu-menu-a-utilisateurs"
                :to="{ name: 'utilisateurs' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('utilisateurs')"
              >
                Utilisateurs
              </RouterLink>
              <div v-else class="bold color-neutral">Utilisateurs</div>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <RouterLink
                v-if="$route.name !== 'glossaire'"
                id="cmn-menu-menu-a-glossaire"
                :to="{ name: 'glossaire' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('glossaire')"
              >
                Glossaire
              </RouterLink>
              <div v-else class="bold color-neutral">Glossaire</div>
            </li>
            <li>
              <RouterLink
                v-if="
                  $route.name !== 'statistiques' &&
                  $route.name !== 'statistiques-globales' &&
                  $route.name !== 'statistiques-guyane'
                "
                id="cmn-menu-menu-a-statistiques"
                :to="{ name: 'statistiques' }"
                class="btn-menu text-decoration-none bold"
                @click.native="eventTrack('statistiques')"
              >
                Statistiques
              </RouterLink>
              <div v-else class="bold color-neutral">Statistiques</div>
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
    eventTrack(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent('menu-sections', 'menu-section', id)
      }
    }
  }
}
</script>
