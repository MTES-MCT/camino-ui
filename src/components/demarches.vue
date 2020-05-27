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
      await this.$store.dispatch('titresDemarches/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    },

    async demarchesUpdate() {
      if (this.metasLoaded) {
        await this.$store.dispatch('titresDemarches/get')

        this.eventTrack()
      }
    },

    async preferencesUpdate(options) {
      await this.$store.dispatch('titresDemarches/preferencesSet', options)
      if (options.section === 'filtres') {
        this.eventTrack(options.params)
      }
    },

    eventTrack(params) {
      if (this.$matomo) {
        const events = this.params.reduce((events, { type, id, value }) => {
          if (type === 'string' && params[id]) {
            events.push({ id, value: params[id] })
          } else if (type === 'strings' && params[id]) {
            const values = params[id]
            values.forEach(value => {
              events.push({ id, value })
            })
          }
          return events
        }, [])
        events.forEach(({ id, value }) => {
          this.$matomo.trackEvent(
            'demarches-filtres',
            `demarches-filtres-${id}`,
            value
          )
        })
        Object.keys(params).forEach(id => {
          if (params[id] && params[id].length !== 0) {
            if (id === 'etapesInclues' || id === 'etapesExclues') {
              this.$matomo.trackSiteSearch(
                JSON.stringify(params[id].map(e => e.typeId)),
                id
              )
            } else {
              this.$matomo.trackSiteSearch(JSON.stringify(params[id]), id)
            }
          }
        })
      }
    }
  }
}
</script>

