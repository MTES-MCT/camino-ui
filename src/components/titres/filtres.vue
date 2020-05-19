<template>
  <Filters
    ref="filters"
    :filters.sync="filters"
    title="Filtres"
    button="Valider"
    @filters:validate="validate"
    @filters:toggle="toggle"
  />
</template>

<script>
import Filters from '../_ui/filters.vue'
import filtres from './filtres.js'

export default {
  components: {
    Filters
  },

  data() {
    return {
      filtres,
      opened: false
    }
  },

  computed: {
    metas() {
      return {
        domaines: this.$store.state.titres.metas.domaines,
        types: this.$store.state.titres.metas.types,
        statuts: this.$store.state.titres.metas.statuts
      }
    },

    filters() {
      return this.filtres.map(filtre => {
        if (filtre.type === 'checkboxes') {
          const metaId = this.metaIdFind(filtre.id)
          filtre.elements = this.metas[metaId]
        }

        return filtre
      })
    },

    preferences() {
      return this.$store.state.titres.preferences.filtres
    },

    apiParams() {
      return this.$store.state.titres.params
    }
  },

  watch: {
    // si les metas changent (app init ou connexion / deconnexion utilisateur)
    metas: {
      handler: function(metas, metasOld) {
        this.validate()
      },
      deep: true
    }
  },

  created() {
    const params = this.filtres.reduce((params, { id }) => {
      params[id] = this.preferences[id] || null

      return params
    }, {})

    this.filtresUpdate(params)
    this.titresUpdate()

    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    validate() {
      // les champs textes sont mis à jour onBlur
      // pour les prendre en compte lorsqu'on valide en appuyant sur "entréee"
      // met le focus sur le bouton de validation (dans la méthode close())
      if (this.$refs.filters) {
        this.$refs.filters.close()
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })

      // formate les valeurs des filtres
      const params = this.filtres.reduce((params, filtre) => {
        if (filtre.type === 'checkboxes') {
          params[filtre.id] = this.checkboxesValueClean(filtre.id, filtre.value)
        } else {
          params[filtre.id] = filtre.value
        }

        return params
      }, {})

      this.eventTrack(params)
      this.preferencesUpdate(params)
      this.titresUpdate()
    },

    titresUpdate() {
      this.$emit('titres:update')
    },

    toggle(opened) {
      this.opened = opened
      if (opened) {
        this.eventTrack()
      }
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.opened) {
        this.validate()
      }
    },

    filtresUpdate(params) {
      Object.keys(params).forEach(id => {
        const filtre = this.filtres.find(filtre => filtre.id === id)
        let value

        if (filtre.type === 'checkboxes') {
          value = this.checkboxesValueClean(id, params[id])
        } else {
          value = params[id]
        }

        filtre.value = value
      })
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'filtres',
        params
      })
    },

    // pour les filtres dont le type est 'checkboxes'
    // - ne conserve que les valeurs qui sont présentes dans les métas
    checkboxesValueClean(id, value) {
      const metaId = this.metaIdFind(id)

      return value
        .filter(v => this.metas[metaId].map(({ id }) => id).includes(v))
        .sort()
    },

    metaIdFind(id) {
      return id.replace(/Ids/g, '')
    },

    eventTrack(params) {
      if (this.$matomo) {
        if (params) {
          const events = this.apiParams.reduce((events, { type, id }) => {
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
              'titres-filtres',
              `titres-filtres-${id}`,
              value
            )
          })

          Object.keys(params).forEach(id => {
            if (params[id]) {
              this.$matomo.trackSiteSearch(JSON.stringify(params[id]), id)
            }
          })
        } else {
          this.$matomo.trackEvent('titres', 'filtres', 'filtres-titres')
        }
      }
    }
  }
}
</script>
