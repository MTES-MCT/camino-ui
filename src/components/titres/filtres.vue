<template>
  <Accordion
    ref="filters"
    :sub="false"
    class="mb-s"
  >
    <template slot="title">
      Filtres
    </template>

    <div class="px-m">
      <div class="tablet-blobs mt">
        <div class="tablet-blob-1-2 large-blob-1-3">
          <div
            v-for="filtre in filtres.filter(({type}) => type === 'input')"
            :key="filtre.id"
            class="mb"
          >
            <h6>{{ filtre.name }}</h6>

            <input
              :value="filtre.values.join(' ')"
              type="text"
              :placeholder="filtre.placeholder"
              class="p-s"
              @blur="inputChange(filtre.id, $event)"
            >
          </div>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb"
            @click="inputsErase"
          >
            Tout effacer
          </button>
        </div>

        <div
          v-for="filtre in filtres.filter(({type}) => type === 'checkbox')"
          :key="filtre.id === 'types' ? filtre.nom : filtre.id"
          class="tablet-blob-1-2 large-blob-1-3 mb"
        >
          <h6>{{ filtre.name }}</h6>
          <ul class="list-sans">
            <li
              v-for="element in filtre.id === 'types' ? checkboxesTypesReduce(metas[filtre.id]) : metas[filtre.id]"
              :key="element.id"
            >
              <label>
                <input
                  :value="element.id"
                  :checked="filtres.find(({id}) => id === filtre.id).values.find(id => element.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle(filtre.id, $event)"
                >
                <component
                  :is="filtre.component"
                  :element="element"
                />
              </label>
            </li>
          </ul>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect(filtre.id, 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect(filtre.id, 'all')"
          >
            Tous
          </button>
        </div>
      </div>

      <button
        ref="button"
        class="btn-flash p-s rnd-xs full-x mb"
        @click="validate"
      >
        Valider
      </button>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../ui/accordion.vue'
import FiltresDomaines from './filtres-domaines.vue'
import FiltresStatuts from './filtres-statuts.vue'
import FiltresTypes from './filtres-types.vue'

export default {
  components: {
    Accordion
  },

  data() {
    return {
      filtres: [
        {
          id: 'types',
          type: 'checkbox',
          values: [],
          component: FiltresTypes
        },
        {
          id: 'domaines',
          type: 'checkbox',
          values: [],
          component: FiltresDomaines
        },
        {
          id: 'statuts',
          type: 'checkbox',
          values: [],
          component: FiltresStatuts
        },
        {
          id: 'substances',
          type: 'input',
          values: [],
          name: 'Substances',
          placeholder: 'Or, Argent, Ag, …'
        },
        {
          id: 'noms',
          type: 'input',
          values: [],
          name: 'Nom',
          placeholder: '…'
        },
        {
          id: 'entreprises',
          type: 'input',
          values: [],
          name: 'Entreprises',
          placeholder: 'Nom ou siret'
        },
        {
          id: 'references',
          type: 'input',
          values: [],
          name: 'Références',
          placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
        },
        {
          id: 'territoires',
          type: 'input',
          values: [],
          name: 'Territoires',
          placeholder: 'Commune, département, région, …'
        }
      ]
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

    userPreferencesFiltres() {
      return this.$store.state.user.preferences.filtres
    }
  },

  watch: {
    // si les paramètre d'url correspondant aux filtres changent
    // (pe: bouton back du navigateur)
    // - met à jour les filtres
    // - met à jour les prefs utilisateur
    $route(to, from) {
      const changed = this.filtres.some(
        ({ id }) => to.query[id] !== this.userPreferencesFiltres[id]
      )

      if (changed) {
        this.filtresSet('fromRoute')
        this.preferencesSet()
      }
    },

    metas: {
      handler: function(metas, metasOld) {
        if (this.loaded) {
          const firstLoad = Object.keys(metasOld).some(
            id => !metasOld[id].length
          )

          // si les metas sont chargées pour la première fois
          // - initialise les filtres depuis les paramètre de route
          if (firstLoad) {
            this.filtresSet('fromRoute')
            this.preferencesSet()
          }

          // si les metas sont mises à jour
          // (par exemple connexion / deconnexion utilisateur)
          // - met à jour les filtres depuis les préférences utilisateur
          else {
            this.preferencesSet()
            this.filtresSet('fromPreferences')
            this.urlSet()
          }
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
    filtresSet(source) {
      const valueSet = (source, id) => {
        if (source === 'fromRoute') {
          return this.$route.query[id]
        }
        if (source === 'fromPreferences') {
          return this.userPreferencesFiltres[id]
        }

        return this.$route.query[id] || this.userPreferencesFiltres[id]
      }

      const filtreSet = (id, value) => {
        const filtre = this.filtres.find(filtre => filtre.id === id)
        filtre.values = value ? value.split(',') : []

        // supprime du filtre si la valeur n'est pas présente dans les metas
        if (this.metas[id]) {
          filtre.values = filtre.values.filter(filtreId =>
            this.metas[id].find(meta => meta.id === filtreId)
          )
        }
      }

      this.filtres.forEach(({ id }) => {
        // récupère les paramètres d'url
        // ou des préférences utilisateur
        // assigne les paramètres au filtre
        filtreSet(id, valueSet(source, id))
      })
    },

    preferencesSet() {
      this.filtres.forEach(({ id, type }) => {
        const filtre = this.filtres.find(filtre => filtre.id === id)
        // les préférences de filtres actuelles de l'utilisateurs
        const userPreferencesFiltresIds =
          this.userPreferencesFiltres[id] &&
          this.userPreferencesFiltres[id]
            .split(',')
            .sort()
            .join(',')

        const filtresIdsNew =
          type === 'checkbox'
            ? // si le filtre est une checkbox
              // - supprime les ids qui ne sont plus dans les métas
              this.metas[id]
                .filter(meta => filtre.values.find(value => value === meta.id))
                .map(({ id }) => id)
                .sort()
                .join(',')
            : filtre.values.sort().join(',') || null

        // si
        // - les preférences utilisateur ne sont pas définies
        // - ou elles sont différentes des filtres,
        // met à jour les préférences utilisateur
        if (
          userPreferencesFiltresIds === undefined ||
          filtresIdsNew !== userPreferencesFiltresIds
        ) {
          this.$store.dispatch('user/preferenceSet', {
            section: `filtres.${id}`,
            value: filtresIdsNew
          })
        }
      })
    },

    urlSet() {
      const query = Object.assign({}, this.$route.query)

      this.filtres.forEach(({ id }) => {
        const filtre = this.filtres.find(filtre => filtre.id === id)
        const value = filtre.values.length ? filtre.values.join(',') : null

        if (value) {
          query[id] = value
        } else {
          delete query[id]
        }
      })

      this.$router.push({ query })
    },

    checkboxesTypesReduce(types) {
      // pour les types, plusieurs id correspondent à un même nom
      return types.reduce((res, type) => {
        const e = res.find(e => e.nom === type.nom)
        return e ? res : [...res, type]
      }, [])
    },

    checkboxToggle(id, e) {
      const filtre = this.filtres.find(filtre => filtre.id === id)
      const idsSet = (value, values) => {
        const index = values.indexOf(value)

        if (id !== 'types') {
          // si la checkbox était false
          if (index > -1) {
            values.splice(index, 1)
            return values
          }

          // sinon ajoute la checkbox
          return [...values, value]
        }

        // s'il s'agit d'une checkbox sur les types
        const nom = this.metas.types.find(type => type.id === value).nom
        const types = this.metas.types
          .filter(type => type.nom === nom)
          .map(type => type.id)

        // si la checkbox était false
        if (index > -1) {
          types.forEach(i => {
            const index = values.indexOf(i)
            values.splice(index, 1)
          })

          return values
        }

        // sinon ajoute la checkbox
        return [...values, ...types]
      }

      filtre.values = idsSet(e.target.value, filtre.values)
    },

    inputChange(id, e) {
      const filtre = this.filtres.find(filtre => filtre.id === id)
      const values = e.target.value
        ? e.target.value.match(/\w+|"(?:\\"|[^"])+"/g)
        : []

      filtre.values = values
    },

    checkboxesSelect(id, action) {
      const filtre = this.filtres.find(filtre => filtre.id === id)
      if (action === 'none') {
        filtre.values = []
      }

      if (action === 'all') {
        filtre.values = this.metas[id].map(({ id }) => id)
      }

      if (action === 'inverse') {
        filtre.values = this.metas[id].reduce(
          (ids, { id }) =>
            filtre.values.find(i => i === id) ? ids : [...ids, id],
          []
        )
      }
    },

    inputsErase() {
      this.filtres
        .filter(({ type }) => type === 'input')
        .forEach(filtre => {
          filtre.values = []
        })
    },

    validate() {
      this.$refs.button.focus()
      this.urlSet()
      this.$refs.filters.close()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.$refs.filters.opened) {
        this.validate()
      }
    }
  }
}
</script>
