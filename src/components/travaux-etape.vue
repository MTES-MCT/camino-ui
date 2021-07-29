<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <router-link
        :to="{ name: 'titre', params: { id: titre.slug } }"
        class="cap-first"
      >
        {{ titre.nom }}
      </router-link>
      <span class="color-neutral"> | </span>
      <span class="cap-first">
        {{ travauxType.nom }}
      </span>
    </h6>

    <Preview
      :travaux-etape="travauxEtape"
      :travaux-type="travauxType"
      :titre-type-type="titreTypeType"
      :titre-nom="titre.nom"
      :titre-id="titre.id"
      :opened="opened"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Preview from './travaux-etape/preview.vue'

export default {
  components: { Loader, Preview },

  data() {
    return {
      opened: true
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },
    travauxEtape() {
      return this.$store.state.titreTravauxEtape.element
    },
    loaded() {
      return !!this.travauxEtape
    },
    travaux() {
      return this.travauxEtape.travaux
    },
    travauxType() {
      return this.travaux ? this.travaux.type : ''
    },
    titre() {
      return this.travaux ? this.travaux.titre : ''
    },
    titreType() {
      return this.titre ? this.titre.type : ''
    },
    titreTypeType() {
      return this.titreType ? this.titreType.type : {}
    }
  },
  watch: {
    '$route.params.id': function (id) {
      if (this.$route.name === 'travaux-etape' && id) {
        this.get()
      }
    },
    user: 'get'
  },

  async created() {
    await this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreTravauxEtape/get', this.$route.params.id)
    }
  }
}
</script>
