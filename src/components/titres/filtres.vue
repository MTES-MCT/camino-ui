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
        domaines: this.$store.state.metas.titres.domaines,
        types: this.$store.state.metas.titres.types,
        statuts: this.$store.state.metas.titres.statuts
      }
    },

    filters() {
      return this.filtres.map(filtre => {
        if (filtre.type === 'checkboxes') {
          filtre.elements = this.metas[filtre.id].reduce(
            (elements, element) => {
              element.name = element.nom
              elements.push(element)

              return elements
            },
            []
          )
        }

        return filtre
      })
    },

    filtresLoaded() {
      return this.$store.state.user.titresFiltresLoaded
    },

    preferencesFiltres() {
      return this.$store.state.user.preferences.titres.filtres
    },

    preferencesFiltresLoaded() {
      return this.$store.state.user.titresFiltresLoaded
    }
  },

  watch: {
    // si les paramètre d'url changent (pe: bouton back du navigateur)
    // - met à jour les filtres
    // - met à jour les prefs utilisateur -> recharge les titres
    $route(to, from) {
      const changed = this.filtres.some(
        ({ id }) => (to.query[id] || null) !== this.preferencesFiltres[id]
      )

      if (changed && this.filtresLoaded) {
        this.filtresUpdate('url')
        this.preferencesUpdate()
      }
    },

    // si les metas changent (app init ou connexion / deconnexion utilisateur)
    // - met à jour les filtres
    // - met à jour les préfs utilisateur -> recharge les titres
    // - met à jour les paramètre d'url
    metas: {
      handler: function(metas, metasOld) {
        // si c'est le premier chargement de l'app
        // - source des filtres: paramètres d'url
        // sinon (pe: connexion / deconnexion utilisateur)
        // - source des filtres: prefs utilisateur
        const firstLoad = Object.keys(metasOld).some(id => !metasOld[id].length)
        const source = firstLoad ? 'url' : 'preferences'

        this.filtresUpdate(source)
        this.preferencesUpdate()
        this.urlUpdate()
      },
      deep: true
    }
  },

  created() {
    // si les metas sont chargées
    if (this.preferencesFiltresLoaded) {
      this.filtresUpdate('preferences')
      this.urlUpdate()
    }

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
      this.$refs.filters.close()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // formate les valeurs des filtres
      this.filtresValuesReduce()
      this.urlUpdate()
    },

    toggle(opened) {
      this.opened = opened
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.opened) {
        this.validate()
      }
    },

    // met à jour les filtres
    // in: source (String, optionnel) 'url' ou 'preferences'
    // si aucune source est définie, prend en priorité les valeurs définies
    // - dans l'url
    // - ou les préfs utilisateur
    filtresUpdate(source) {
      const valueFind = (filtreId, source) => {
        if (source === 'url') {
          return this.$route.query[filtreId]
        }

        if (source === 'preferences') {
          return this.preferencesFiltres[filtreId]
        }

        return this.$route.query[filtreId] || this.preferencesFiltres[filtreId]
      }

      this.filtres.forEach(filtre => {
        const value = valueFind(filtre.id, source)
        const values = value ? value.split(',') : []
        filtre.values = this.valuesReduce(filtre.id, filtre.type, values)
      })
    },

    // met à jour les préfs utilisateur
    // si elles changent,
    // ça met à jour les titres (via /titres/watch/filtres)
    preferencesUpdate() {
      this.filtres.forEach(({ id, values }) => {
        const value = values.sort().join(',') || null

        // si la préf utilisateur
        // - n'est pas définie
        // - ou, est différente du filtre
        // met à jour la préf utilisateur
        if (
          this.preferencesFiltres[id] === undefined ||
          this.preferencesFiltres[id] !== value
        ) {
          this.$store.dispatch('user/preferenceSet', {
            section: `titres.filtres.${id}`,
            value
          })
        }
      })

      this.$store.commit('user/titresFiltresLoaded')
    },

    // met à jour les paramètres d'url
    urlUpdate() {
      let changed = false
      const query = Object.assign({}, this.$route.query)

      this.filtres.forEach(({ id, values }) => {
        const value = values.length ? values.sort().join(',') : null

        const valueUpdated = value && query[id] !== value
        const valueDeleted = !value && query[id]

        if (valueUpdated) {
          query[id] = value
          changed = true
        } else if (valueDeleted) {
          delete query[id]
          changed = true
        }
      })

      if (changed) {
        this.$router.push({ query })
      }
    },

    // formate les valeurs des filtres dont le type est 'checkboxes'
    filtresValuesReduce() {
      this.filtres.forEach(filtre => {
        filtre.values = this.valuesReduce(filtre.id, filtre.type, filtre.values)
      })
    },

    // pour les filtres dont le type est 'checkboxes
    // - ne conserve que les valeurs qui sont présentes dans les métas
    valuesReduce(id, type, values) {
      const checkboxesValuesFilter = (filtreId, values) =>
        values.filter(value =>
          this.metas[filtreId].map(({ id }) => id).includes(value)
        )

      if (type === 'checkboxes') {
        values = checkboxesValuesFilter(id, values)
      }

      return values
    }
  }
}
</script>
