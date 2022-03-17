<template>
  <div class="bg-alt">
    <div class="container pt">
      <div class="tablet-blobs mb flex-align-items-stretch">
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li v-if="hasEntreprises">
              <router-link
                id="cmn-menu-menu-a-dashboard"
                :to="{ name: 'dashboard' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('dashboard')"
              >
                Mes titres
              </router-link>
            </li>
            <li>
              <router-link
                id="cmn-menu-menu-a-titres"
                :to="{ name: 'titres' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('titres')"
              >
                Titres miniers et autorisations
              </router-link>
            </li>
            <li>
              <router-link
                id="cmn-menu-menu-a-demarches"
                :to="{ name: 'demarches' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('demarches')"
              >
                Démarches
              </router-link>
            </li>
            <li v-if="sections.travaux">
              <router-link
                id="cmn-menu-menu-a-travaux"
                :to="{ name: 'travaux' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('travaux')"
              >
                Travaux
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="sections.activites" class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li v-if="sections.activites">
              <router-link
                id="cmn-menu-menu-a-activites"
                :to="{ name: 'activites' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('activites')"
              >
                Activités
              </router-link>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li v-if="sections.administrations">
              <router-link
                id="cmn-menu-menu-a-administrations"
                :to="{ name: 'administrations' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('administrations')"
              >
                Administrations
              </router-link>
            </li>
            <li>
              <router-link
                id="cmn-menu-menu-a-entreprises"
                :to="{ name: 'entreprises' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('entreprises')"
              >
                Entreprises
              </router-link>
            </li>
            <li v-if="sections.utilisateurs">
              <router-link
                id="cmn-menu-menu-a-utilisateurs"
                :to="{ name: 'utilisateurs' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('utilisateurs')"
              >
                Utilisateurs
              </router-link>
            </li>
          </ul>
        </div>
        <div class="tablet-blob-1-4 border-l pl-s">
          <ul class="list-sans mb-0">
            <li>
              <router-link
                id="cmn-menu-menu-a-glossaire"
                :to="{ name: 'glossaire' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('glossaire')"
              >
                Glossaire
              </router-link>
            </li>
            <li>
              <router-link
                id="cmn-menu-menu-a-statistiques"
                :to="{ name: 'statistiques' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('statistiques')"
              >
                Statistiques
              </router-link>
            </li>
            <li v-if="sections.metas">
              <router-link
                id="cmn-menu-menu-a-metas"
                :to="{ name: 'metas' }"
                class="btn-menu text-decoration-none bold"
                @click="eventTrack('metas')"
              >
                Métas
              </router-link>
            </li>
            <li v-if="sections.journaux">
              <router-link
                id="cmn-menu-menu-a-journaux"
                :to="{ name: 'journaux' }"
                class="btn-menu text-decoration-none bold"
              >
                Journaux
              </router-link>
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

    hasEntreprises() {
      return this.$store.getters['user/hasEntreprises']
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
