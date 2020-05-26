<template>
  <liste
    nom="démarches"
    :filtres="filtres"
    :colonnes="colonnes"
    :lignes="lignes"
    :elements="demarches"
    :preferences="preferences"
    :metas="metas"
    :params="params"
    :total="total"
    :loaded="metasLoaded"
    @elements:update="demarchesUpdate"
    @preferences:update="preferencesUpdate"
  >
    <Downloads
      v-if="demarches.length"
      :formats="['csv', 'xlsx', 'ods']"
      section="demarches"
      class="flex-right full-x"
    />
  </liste>
</template>

<script>
import Liste from './_common/liste.vue'
import Downloads from './_common/downloads.vue'

import filtres from './demarches/filtres'

import { demarchesColonnes, demarchesLignesBuild } from './demarches/table'

export default {
  name: 'Demarches',

  components: { Liste, Downloads },

  data() {
    return {
      colonnes: demarchesColonnes,
      metasLoaded: false,
      visible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    demarches() {
      return this.$store.state.titresDemarches.list
    },

    total() {
      return this.$store.state.titresDemarches.total
    },

    preferences() {
      return this.$store.state.titresDemarches.preferences
    },

    metas() {
      return this.$store.state.titresDemarches.metas
    },

    params() {
      return this.$store.state.titresDemarches.params
    },

    lignes() {
      return demarchesLignesBuild(this.demarches)
    },

    filtres() {
      return filtres.map(filtre => {
        if (filtre.type === 'checkboxes') {
          const metaId = filtre.id.replace(/Ids/g, '')
          filtre.elements = this.metas[metaId]
        } else if (
          filtre.id === 'etapesInclues' ||
          filtre.id === 'etapesExclues'
        ) {
          filtre.elements = this.metas.etapesTypes
        }

        return filtre
      })
    }
  },

  watch: {
    user: 'metasGet'
  },

  created() {
    this.metasGet()
  },

  methods: {
    async metasGet() {
      await this.$store.dispatch(`titresDemarches/metasGet`)
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    },

    async demarchesUpdate() {
      if (this.metasLoaded) {
        await this.$store.dispatch(`titresDemarches/get`)
      }
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch(`titresDemarches/preferencesSet`, options)
    }
  }
}
</script>

