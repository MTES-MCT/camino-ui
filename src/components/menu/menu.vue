<template>
  <div class="bg-alt">
    <div class="container pt">
      <div class="tablet-blobs mb flex-align-items-stretch">
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <router-link
                v-if="$route.name !== 'titres'"
                id="cmn-menu-menu-a-titres"
                :to="{ name: 'titres' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('titres')"
              >
                Titres miniers et autorisations
              </router-link>
              <div v-else class="bold color-neutral">
                Titres miniers et autorisations
              </div>
            </li>
            <li>
              <router-link
                v-if="$route.name !== 'demarches'"
                id="cmn-menu-menu-a-demarches"
                :to="{ name: 'demarches' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('demarches')"
              >
                Démarches
              </router-link>
              <div v-else class="bold color-neutral">Démarches</div>
            </li>
            <li>
              <router-link
                v-if="$route.name !== 'travaux'"
                id="cmn-menu-menu-a-travaux"
                :to="{ name: 'travaux' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('travaux')"
              >
                Travaux
              </router-link>
              <div v-else class="bold color-neutral">Travaux</div>
            </li>
          </ul>
        </div>
        <div v-if="sections.activites" class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li v-if="sections.activites">
              <router-link
                v-if="$route.name !== 'activites'"
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'activites' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('activites')"
              >
                Activités
              </router-link>
              <div v-else class="bold color-neutral">Activités</div>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li v-if="sections.administrations">
              <router-link
                v-if="$route.name !== 'administrations'"
                id="cmn-menu-menu-a-administrations"
                :to="{ name: 'administrations' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('administrations')"
              >
                Administrations
              </router-link>
              <div v-else class="bold color-neutral">Administrations</div>
            </li>
            <li>
              <router-link
                v-if="$route.name !== 'entreprises'"
                id="cmn-menu-menu-a-entreprises"
                :to="{ name: 'entreprises' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('entreprises')"
              >
                Entreprises
              </router-link>
              <div v-else class="bold color-neutral">Entreprises</div>
            </li>
            <li v-if="sections.utilisateurs">
              <router-link
                v-if="$route.name !== 'utilisateurs'"
                id="cmn-menu-menu-a-utilisateurs"
                :to="{ name: 'utilisateurs' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('utilisateurs')"
              >
                Utilisateurs
              </router-link>
              <div v-else class="bold color-neutral">Utilisateurs</div>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <router-link
                v-if="$route.name !== 'glossaire'"
                id="cmn-menu-menu-a-glossaire"
                :to="{ name: 'glossaire' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('glossaire')"
              >
                Glossaire
              </router-link>
              <div v-else class="bold color-neutral">Glossaire</div>
            </li>
            <li>
              <router-link
                v-if="
                  $route.name !== 'statistiques' &&
                  $route.name !== 'statistiques-globales' &&
                  $route.name !== 'statistiques-guyane'
                "
                id="cmn-menu-menu-a-statistiques"
                :to="{ name: 'statistiques' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('statistiques')"
              >
                Statistiques
              </router-link>
              <div v-else class="bold color-neutral">Statistiques</div>
            </li>
            <li v-if="sections.metas">
              <router-link
                v-if="$route.name !== 'metas'"
                id="cmn-menu-menu-a-metas"
                :to="{ name: 'metas' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('metas')"
              >
                Métas
              </router-link>
              <div v-else class="bold color-neutral">Métas</div>
            </li>
            <li v-if="sections.journaux">
              <router-link
                v-if="$route.name !== 'journaux'"
                id="cmn-menu-menu-a-journaux"
                :to="{ name: 'journaux' }"
                class="btn-menu text-decoration-none bold"
              >
                Journaux
              </router-link>
              <div v-else class="bold color-neutral">Journaux</div>
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
      return this.$store.state.user.element
    },

    sections() {
      return this.user && this.user.sections ? this.user.sections : {}
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
