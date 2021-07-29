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
        {{ demarcheType.nom }}
      </span>
    </h6>

    <Preview
      :etape="etape"
      :demarche-type="demarcheType"
      :titre-type-type="titreTypeType"
      :domaine-id="domaineId"
      :titre-nom="titre.nom"
      :titre-id="titre.id"
      :opened="opened"
    />
  </div>
</template>

<script>
import Preview from './etape/preview.vue'
import Loader from './_ui/loader.vue'

export default {
  components: { Preview, Loader },

  data() {
    return {
      opened: true
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },
    etapeId() {
      return this.$route.params.id
    },
    etape() {
      return this.$store.state.titreEtape.element
    },
    loaded() {
      return !!this.etape
    },
    demarche() {
      return this.etape.demarche
    },
    demarcheType() {
      return this.demarche ? this.demarche.type : ''
    },
    titre() {
      return this.demarche ? this.demarche.titre : ''
    },
    domaineId() {
      return this.titre ? this.titre.domaine.id : ''
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
      if (this.$route.name === 'etape' && id) {
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
      await this.$store.dispatch('titreEtape/get', this.$route.params.id)
    }
  }
}
</script>
