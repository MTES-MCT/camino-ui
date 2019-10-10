<template>
  <Filters
    :filters.sync="filters"
    title="Filtres"
    button="Valider"
    @filters:validate="validate"
  />
</template>

<script>
import Filters from '../ui/filters.vue'
import filtres from './filtres.js'

export default {
  components: {
    Filters
  },

  data() {
    return {
      filtres
    }
  },

  computed: {
    metas() {
      return {
        domaines: this.$store.state.metas.domaines,
        types: this.$store.state.metas.types,
        statuts: this.$store.state.metas.statuts
      }
    },

    loaded() {
      return this.$store.state.loaded
    },

    preferencesFiltres() {
      return this.$store.state.user.preferences.filtres
    },

    filters() {
      return this.filtres.map(filtre => {
        if (filtre.type === 'checkboxes') {
          filtre.elements = this.metas[filtre.id].reduce(
            (elements, element) => {
              element.name = element.nom
              if (
                filtre.id !== 'types' ||
                // pour le filtre 'types', plusieurs ids correspondent à un même nom
                // ne conserve que le premier id
                !elements.find(({ nom }) => nom === element.nom)
              ) {
                elements.push(element)
              }

              return elements
            },
            []
          )
        }

        return filtre
      })
    }
  },

  watch: {
    // si les paramètre d'url changent (pe: bouton back du navigateur)
    // - met à jour les filtres depuis les paramètre d'url
    // - met à jour les prefs utilisateur
    $route(to, from) {
      const changed = this.filtres.some(
        ({ id }) => to.query[id] !== this.preferencesFiltres[id]
      )

      if (changed) {
        this.filtresSet('url')
        this.preferencesSet()
      }
    },

    // si les metas changent (appInit ou connexion / deconnexion utilisateur)
    // - met à jour les filtres
    // - met à jour les préfs utilisateur
    // - met à jour les paramètre d'url
    metas: {
      handler: function(metas, metasOld) {
        if (this.loaded) {
          const firstLoad = Object.keys(metasOld).some(
            id => !metasOld[id].length
          )

          // si les metas sont chargées pour la première fois
          // - source des valeurs de filtres: paramètre d'url
          // sinon (pe: connexion / deconnexion utilisateur)
          // - source des valeurs de filtres: prefs utilisateur
          const source = firstLoad ? 'url' : 'preferences'

          this.filtresSet(source)
          this.preferencesSet()
          this.urlSet()
        }
      },
      deep: true
    }
  },

  created() {
    // si les metas sont chargées
    if (this.loaded) {
      this.filtresSet()
      this.preferencesSet()
      this.urlSet()
    }

    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    validate() {
      // formate les valeus des filtres
      this.filtresValuesReduce()
      // met à jour l'url
      this.urlSet()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.$refs.filters.opened) {
        this.validate()
      }
    },

    // met à jour les filtres
    // in: (String) source (optionel): 'url' ou 'preferences'
    // si aucune source est définie, prend en priorité les valeurs définies
    // - dans l'url
    // - ou les préfs utilisateur
    filtresSet(source) {
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
    preferencesSet() {
      this.filtres.forEach(({ id, values }) => {
        // valeur du filtre
        const value = values.sort().join(',') || null

        // si la valeur du filtre dans les préfs utilisateurs
        // - n'est pas définie
        // - ou, elle est différente de la valeur dans le composant
        // met à jour les préfs utilisateur
        // avec la valeur du filtre dans le composant
        if (
          this.preferencesFiltres[id] === undefined ||
          this.preferencesFiltres[id] !== value
        ) {
          this.$store.dispatch('user/preferenceSet', {
            section: `filtres.${id}`,
            value: value
          })
        }
      })
    },

    // met à jour les paramètres d'url
    urlSet() {
      let queryUpdated = false
      const query = Object.assign({}, this.$route.query)

      this.filtres.forEach(({ id, values }) => {
        const value = values.length ? values.sort().join(',') : null
        const valueUpdated = value && query[id] !== value
        const valueDeleted = !value && query[id]

        if (valueUpdated || valueDeleted) {
          queryUpdated = true
        }

        if (valueUpdated) {
          query[id] = value
        } else if (valueDeleted) {
          delete query[id]
        }
      })

      if (queryUpdated) {
        this.$router.push({ query })
      }
    },

    // formate les valeus des filtres dont
    // - le type est 'checkboxes'
    // - ou l'id est 'types'
    filtresValuesReduce() {
      this.filtres.forEach(filtre => {
        filtre.values = this.valuesReduce(filtre.id, filtre.type, filtre.values)
      })
    },

    // pour les filtres dont le type est 'checkboxes
    // - ne conserve que les valeurs qui sont présentes dans les métas
    // pour le filtre dont l'id est 'types'
    // - ajoute ou supprime les ids des éléments partageant le même nom
    valuesReduce(id, type, values) {
      const checkboxesValuesFilter = (filtreId, values) =>
        values.filter(value =>
          this.metas[filtreId].map(({ id }) => id).includes(value)
        )

      const typesValuesReduce = values =>
        values.reduce((acc, value) => {
          const typeNom = this.metas.types.find(({ id }) => id === value).nom
          const typeIds = this.metas.types
            .filter(({ nom }) => nom === typeNom)
            .map(({ id }) => id)

          return typeIds.indexOf(value) === 0 ? acc.concat(typeIds) : acc
        }, [])

      if (type === 'checkboxes') {
        if (id === 'types') {
          values = typesValuesReduce(values)
        }

        values = checkboxesValuesFilter(id, values)
      }

      return values
    }
  }
}
</script>
