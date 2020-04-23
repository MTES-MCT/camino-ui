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
      return this.$store.state.titresDemarches.metas
    },

    filters() {
      return this.filtres.map(filtre => {
        if (filtre.type === 'checkboxes') {
          const metaId = this.metaIdFind(filtre.id)
          filtre.elements = this.metas[metaId]
        } else if (filtre.id === 'etapesInclues') {
          filtre.elements = this.metas.etapesTypes
        }

        return filtre
      })
    },

    preferences() {
      return this.$store.state.titresDemarches.preferences.filtres
    }
  },

  watch: {
    // si les metas changent (app init ou connexion / deconnexion utilisateur)
    metas: {
      handler: function() {
        this.validate()
      },
      deep: true
    }
  },

  created() {
    this.filtresUpdate(this.preferences)
    this.demarchesUpdate()

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

      this.preferencesUpdate(params)
      this.demarchesUpdate()
    },

    demarchesUpdate() {
      this.$emit('demarches:update')
    },

    toggle(opened) {
      this.opened = opened
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.opened) {
        this.validate()
      }
    },

    filtresUpdate(params) {
      Object.keys(params).forEach(id => {
        let value
        const filtre = this.filtres.find(filtre => filtre.id === id)

        if (filtre.type === 'checkboxes') {
          value = this.checkboxesValueClean(id, params[id])
        } else {
          value = params[id]
        }

        filtre.value = value
      })
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titresDemarches/preferencesSet', {
        section: 'filtres',
        params
      })
    },

    checkboxesValueClean(id, value) {
      const metaId = this.metaIdFind(id)

      return value
        .filter(v => this.metas[metaId].map(({ id }) => id).includes(v))
        .sort()
    },

    metaIdFind(id) {
      return id.replace(/Ids/g, '')
    }
  }
}
</script>
