<template>
  <Accordion
    ref="filters"
    :sub="false"
    class="mb"
  >
    <template slot="title">
      Filtres
    </template>

    <div class="px-m">
      <div class="tablet-blobs mt">
        <div class="tablet-blob-1-2 large-blob-1-3">
          <div
            v-for="(filterInput, name) in filterInputs"
            :key="name"
            class="mb"
          >
            <h6>{{ filterInput.name }}</h6>

            <input
              :value="filtres[name].join(' ')"
              type="text"
              :placeholder="filterInput.placeholder"
              class="p-s"
              @blur="inputChange(name, $event)"
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

        <div class="tablet-blob-1-2 large-blob-1-3 mb">
          <h6>Domaines</h6>
          <ul class="list-sans">
            <li
              v-for="domaine in metas.domaines"
              :key="domaine.id"
            >
              <label>
                <input
                  :value="domaine.id"
                  :checked="filtres.domaines.find(id => domaine.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle('domaines', $event)"
                >
                <Pill
                  :color="`bg-titre-domaine-${domaine.id}`"
                  class="mr-xs mono"
                >
                  {{ domaine.id }}
                </Pill>
                <span class="cap-first">
                  {{ domaine.nom }}
                </span>
              </label>
            </li>
          </ul>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('domaines', 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('domaines', 'all')"
          >
            Tous
          </button>
        </div>

        <div class="tablet-blob-1-2 large-blob-1-3 mb">
          <h6>Types</h6>
          <ul class="list-sans">
            <li
              v-for="type in checkboxesTypesReduce(metas.types)"
              :key="type.nom"
            >
              <label>
                <input
                  :value="type.id"
                  :checked="filtres.types.find(id => type.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle('types', $event)"
                >
                <span class="cap-first">
                  {{ type.nom }}
                </span>
              </label>
            </li>
          </ul>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('types', 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('types', 'all')"
          >
            Tous
          </button>
        </div>

        <div class="tablet-blob-1-2 large-blob-1-3 mb">
          <h6>Statuts</h6>
          <ul class="list-sans">
            <li
              v-for="statut in metas.statuts"
              :key="statut.id"
            >
              <label>
                <input
                  :value="statut.id"
                  :checked="filtres.statuts.find(id => statut.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle('statuts', $event)"
                >
                <Dot :color="`bg-${statut.couleur}`" />
                <span class="cap-first">
                  {{ statut.nom }}
                </span>
              </label>
            </li>
          </ul>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('statuts', 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('statuts', 'all')"
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
import Dot from '../ui/dot.vue'
import Pill from '../ui/pill.vue'
import Accordion from '../ui/accordion.vue'

export default {
  components: {
    Pill,
    Dot,
    Accordion
  },

  data() {
    return {
      filtres: {
        types: [],
        domaines: [],
        statuts: [],
        substances: [],
        noms: [],
        entreprises: [],
        references: [],
        territoires: []
      },

      filterInputs: {
        noms: { name: 'Nom', placeholder: '…' },
        entreprises: {
          name: 'Entreprises',
          placeholder: 'Nom ou siret'
        },
        substances: {
          name: 'Substances',
          placeholder: 'Or, Argent, Ag, …'
        },
        references: {
          name: 'Références',
          placeholder: 'Référence DGEC, DEAL, DEB, BRGM, Ifremer, …'
        },
        territoires: {
          name: 'Territoires',
          placeholder: 'Commune, département, région, …'
        }
      }
    }
  },

  computed: {
    loaded() {
      return this.$store.state.loaded
    },

    metas() {
      return {
        domaines: this.$store.state.metas.domaines,
        types: this.$store.state.metas.types,
        statuts: this.$store.state.metas.statuts
      }
    }
  },

  watch: {
    // si les paramètre d'url correspondant aux filtres changent
    // (pe: bouton back du navigateur)
    // - met à jour les prefs utilisateur
    // - met à jour les titres
    $route(to, from) {
      const changed = Object.keys(this.filtres).some(
        id =>
          to.query[id] !==
          (this.$store.state.user.preferences.filtres[id] || undefined)
      )

      if (changed) {
        this.init(true)
      }
    },

    metas: {
      handler: function(metas, metasOld) {
        const firstTime = Object.keys(metasOld).some(id => !metasOld[id].length)

        // si les metas sont chargées
        // - initialise les filtres
        if (firstTime) {
          this.init(true)
        }

        // si les metas sont mises à jour
        // (par exemple connexion / deconnexion utilisateur)
        // - met à jour les filtres
        else {
          Object.keys(this.filtres).forEach(name => {
            // récupère les préférences utilisateur
            const value = this.$store.state.user.preferences.filtres[name]

            // si il y a des paramètres
            this.filtreSet(name, value)
          })

          this.urlSet()
        }
      },
      deep: true
    }
  },

  created() {
    if (this.loaded) {
      this.init()
      this.urlSet()
    }

    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    init(routeOnly) {
      Object.keys(this.filtres).forEach(name => {
        // récupère les paramètres d'url
        // ou des préférences utilisateur
        const value = routeOnly
          ? this.$route.query[name]
          : this.$route.query[name] ||
            this.$store.state.user.preferences.filtres[name]

        // assigne les paramètres au filtre
        this.filtreSet(name, value)
      })

      this.preferencesSet()
    },

    checkboxesTypesReduce(types) {
      // pour les types, plusieurs id correspondent à un même nom
      return types.reduce((res, type) => {
        const e = res.find(e => e.nom === type.nom)
        return e ? res : [...res, type]
      }, [])
    },

    checkboxToggle(name, e) {
      const idsSet = (id, ids) => {
        const index = ids.indexOf(id)

        if (name !== 'types') {
          // si la checkbox était false
          if (index > -1) {
            ids.splice(index, 1)
            return ids
          }

          // sinon ajoute la checkbox
          return [...ids, id]
        }

        // s'il s'agit d'une checkbox sur les types
        const nom = this.$store.state.metas.types.find(type => type.id === id)
          .nom
        const types = this.$store.state.metas.types
          .filter(type => type.nom === nom)
          .map(type => type.id)

        // si la checkbox était false
        if (index > -1) {
          types.forEach(i => {
            const index = ids.indexOf(i)
            ids.splice(index, 1)
          })

          return ids
        }

        // sinon ajoute la checkbox
        return [...ids, ...types]
      }

      this.filtres[name] = idsSet(e.target.value, this.filtres[name])
    },

    inputChange(name, e) {
      const values = e.target.value
        ? e.target.value.match(/\w+|"(?:\\"|[^"])+"/g)
        : []

      this.filtres[name] = values
    },

    checkboxesSelect(name, action) {
      if (action === 'none') {
        this.filtres[name] = []
      }

      if (action === 'all') {
        this.filtres[name] = this.metas[name].map(({ id }) => id)
      }

      if (action === 'inverse') {
        this.filtres[name] = this.metas[name].reduce(
          (ids, { id }) =>
            this.filtres[name].find(i => i === id) ? ids : [...ids, id],
          []
        )
      }
    },

    filtreSet(name, value) {
      this.filtres[name] = value ? value.split(',') : []

      // supprime du filtre si la valeur n'est pas présente dans les metas
      if (this.metas[name]) {
        this.filtres[name] = this.filtres[name].filter(filtreId =>
          this.metas[name].find(meta => meta.id === filtreId)
        )
      }
    },

    inputsErase() {
      Object.keys(this.filterInputs).forEach(name => {
        this.filtres[name] = []
      })
    },

    urlSet() {
      const query = Object.assign({}, this.$route.query)

      Object.keys(this.filtres).forEach(id => {
        const value = this.filtres[id].length
          ? this.filtres[id].join(',')
          : null

        if (value) {
          query[id] = value
        } else {
          delete query[id]
        }
      })

      this.$router.push({ query })
    },

    preferencesSet() {
      this.$store.dispatch('user/preferenceSet', {
        section: 'filtres',
        value: Object.keys(this.filtres).reduce(
          (values, id) =>
            Object.assign(values, { [id]: this.filtres[id].join(',') || null }),
          {}
        )
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
