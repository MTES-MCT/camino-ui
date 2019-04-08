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
                  :checked="filtres.domaineIds.find(id => domaine.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle('domaineIds', $event)"
                >
                <Pill
                  :color="`bg-title-domaine-${domaine.id}`"
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
            @click="checkboxesSelect('domaineIds', 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('domaineIds', 'all')"
          >
            Tous
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('domaineIds', 'inverse')"
          >
            Inverse
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
                  :checked="filtres.typeIds.find(id => type.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle('typeIds', $event)"
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
            @click="checkboxesSelect('typeIds', 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('typeIds', 'all')"
          >
            Tous
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('typeIds', 'inverse')"
          >
            Inverse
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
                  :checked="filtres.statutIds.find(id => statut.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="checkboxToggle('statutIds', $event)"
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
            @click="checkboxesSelect('statutIds', 'none')"
          >
            Aucun
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('statutIds', 'all')"
          >
            Tous
          </button>
          <button
            ref="button"
            class="btn-border h5 px-s p-xs rnd-xs mb mr-xs"
            @click="checkboxesSelect('statutIds', 'inverse')"
          >
            Inverse
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

// const dedup = arr =>
//   Object.keys(
//     arr.reduce((res, element) => Object.assign(res, { [element]: true }), {})
//   )

export default {
  components: {
    Pill,
    Dot,
    Accordion
  },

  data() {
    return {
      filtres: {
        typeIds: [],
        domaineIds: [],
        statutIds: [],
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
    metasLoaded() {
      return this.$store.state.metas.loaded
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
    metasLoaded: {
      handler: function(isLoaded, wasLoaded) {
        if (isLoaded && !wasLoaded !== undefined && !wasLoaded) {
          Object.keys(this.filtres).forEach(name => {
            // récupère les paramètres d'url
            // ou des préférences utilisateur
            const value = this.$route.query[name]
              ? this.$route.query[name]
              : this.$store.state.user.preferences.filtres[name]

            // si il y a des paramètres
            this.filtres[name] = value ? value.split(',') : []
          })

          this.paramsUpdate()
          this.get()
        }
      },
      immediate: true
    },

    // lorsque les metas sont mises à jour
    // par exemple connexion / deconnexion utilisateur
    metas: {
      handler: function() {
        Object.keys(this.filtres).forEach(name => {
          // récupère les préférences utilisateur
          const value = this.$store.state.user.preferences.filtres[name]

          // si il y a des paramètres
          this.filtres[name] = value ? value.split(',') : []
        })

        this.paramsUpdate()
      },
      deep: true
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
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

        if (name !== 'typeIds') {
          if (index > -1) {
            ids.splice(index, 1)
            return ids
          }

          return [...ids, id]
        }

        // s'il s'agit d'une checkbox sur les types
        // ajoute
        const nom = this.$store.state.metas.types.find(type => type.id === id)
          .nom
        const typeIds = this.$store.state.metas.types
          .filter(type => type.nom === nom)
          .map(type => type.id)

        if (index > -1) {
          typeIds.forEach(i => {
            const index = ids.indexOf(i)
            ids.splice(index, 1)
          })

          return ids
        }

        return [...ids, ...typeIds]
      }

      this.filtres[name] = idsSet(e.target.value, this.filtres[name])
    },

    inputChange(name, e) {
      const values = e.target.value ? e.target.value.split(/[ ,]+/) : []

      this.filtres[name] = values
    },

    checkboxesSelect(name, action) {
      if (action === 'none') {
        this.filtres[name] = []
      }

      if (action === 'all') {
        this.filtres[name] = this.metas[`${name.slice(0, -3)}s`].map(
          ({ id }) => id
        )
      }

      if (action === 'inverse') {
        this.filtres[name] = this.metas[`${name.slice(0, -3)}s`].reduce(
          (ids, { id }) =>
            this.filtres[name].find(i => i === id) ? ids : [...ids, id],
          []
        )
      }
    },

    checkboxClean(name) {
      this.filtres[name] = this.filtres[name].filter(id =>
        this.metas[`${name.slice(0, -3)}s`].find(meta => meta.id === id)
      )
    },

    inputsErase() {
      Object.keys(this.filterInputs).forEach(name => {
        this.filtres[name] = []
      })
    },

    paramsUpdate() {
      const value = {}
      let query = Object.assign({}, this.$route.query)

      Object.keys(this.filtres).forEach(name => {
        const values = this.filtres[name]

        if (values.length) {
          value[name] = values.join(',')
          query = Object.assign({}, query, { [name]: value[name] })
        } else {
          value[name] = ''
          delete query[name]
        }
      })

      this.$store.dispatch('user/preferenceSet', { section: 'filtres', value })

      this.$router.push({ query })
    },

    validate() {
      this.$refs.button.focus()
      this.paramsUpdate()
      this.get()
      this.$refs.filters.close()
    },

    reset() {},

    get() {
      this.$store.dispatch('titres/get')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.$refs.filters.opened) {
        this.validate()
      }
    }
  }
}
</script>
