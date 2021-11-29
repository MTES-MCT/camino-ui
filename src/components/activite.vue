<template>
  <h2>Activité</h2>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <router-link
        :to="{ name: 'titre', params: { id: activite.titre.slug } }"
        class="cap-first"
      >
        {{ activite.titre.nom }}
      </router-link>
    </h6>

    <Preview
      :key="activite.id"
      :activite="activite"
      :route="route"
      :opened-activite="openedActivite"
      :opened-titre-activite="openedTitreActivite"
      class="mb"
      @close:titre="titreClose"
      @close:activite="titreActiviteClose"
      @toggle:titre="toggleTitre"
      @toggle:activite="toggleTitreActivite"
      @popup="popupOpen"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Preview from './activite/preview.vue'
import RemovePopup from './activite/remove-popup.vue'

export default {
  components: { Loader, Preview },

  computed: {
    activite() {
      return this.$store.state.titreActivite.element
    },

    user() {
      return this.$store.state.user.element
    },

    loaded() {
      return !!this.activite
    },

    openedActivite() {
      return this.$store.state.titre.opened.activites[this.activite.id]
    },

    openedTitreActivite() {
      return this.$store.state.titreActivite.opened
    },

    route() {
      return { name: 'titreActivite', id: this.activite.slug }
    }
  },

  watch: {
    '$route.params.id': function (id) {
      if (this.$route.name === 'activite' && id) {
        this.get()
      }
    },

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeUnmount() {
    this.$store.commit('titreActivite/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreActivite/get', this.$route.params.id)
    },

    titreClose() {
      this.$store.commit('titre/close', {
        section: 'activites',
        id: this.activite.id
      })
    },

    titreActiviteClose() {
      this.$store.commit('titreActivite/close')
    },

    toggleTitre() {
      this.$store.commit('titre/toggle', {
        section: 'activites',
        id: this.activite.id
      })
    },

    toggleTitreActivite() {
      this.$store.commit('titreActivite/toggle')
    },

    popupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          activiteId: this.activite.id,
          typeNom: this.activite.type.nom,
          annee: this.activite.annee,
          periodeNom: this.activite.periode.nom,
          route: this.route
        }
      })
    }
  }
}
</script>
