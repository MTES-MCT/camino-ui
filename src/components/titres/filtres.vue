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
      const checkboxesElementsFind = metaId => {
        return this.metas[metaId].reduce((elements, element) => {
          element.name = element.nom
          elements.push(element)

          return elements
        }, [])
      }

      return Object.keys(this.filtres).map(id => {
        const filtre = this.filtres[id]
        filtre.id = id

        if (this.filtres[id].type === 'checkboxes') {
          filtre.elements = checkboxesElementsFind(
            this.checkboxesMetaIdFind(id)
          )
        }

        return filtre
      })
    },

    preferences() {
      return this.$store.state.titres.preferences.filtres
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
    const params = Object.keys(this.filtres).reduce((params, id) => {
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
      const params = Object.keys(this.filtres).reduce((params, id) => {
        params[id] =
          this.filtres[id].type === 'checkboxes'
            ? this.checkboxesValueClean(id, this.filtres[id].value)
            : this.filtres[id].value

        return params
      }, {})

      this.preferencesUpdate(params)
      this.titresUpdate()
    },

    titresUpdate() {
      this.$emit('titres:update')
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
        const value =
          this.filtres[id].type === 'checkboxes'
            ? this.checkboxesValueClean(id, params[id])
            : params[id]

        this.filtres[id].value = value
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
      const values = value ? value.split(',') : []
      const metaId = this.checkboxesMetaIdFind(id)

      return values
        .filter(v => this.metas[metaId].map(({ id }) => id).includes(v))
        .sort()
        .join(',')
    },

    checkboxesMetaIdFind(id) {
      return id.replace(/Ids/g, '')
    }
  }
}
</script>
