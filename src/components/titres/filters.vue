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
            v-for="(filterInput, key) in filterInputs"
            :key="key"
            class="mb"
          >
            <h6>{{ filterInput.name }}</h6>

            <input
              :value="filterInput.values.join(' ')"
              type="text"
              :placeholder="filterInput.placeholder"
              class="p-s"
              @blur="filterInputSet($event, key)"
            >
          </div>
        </div>
        <div class="tablet-blob-1-2 large-blob-1-3">
          <h6>Domaines</h6>
          <ul class="list-sans">
            <li
              v-for="domaine in domaines"
              :key="domaine.id"
            >
              <label>
                <input
                  :value="domaine.id"
                  :checked="filterCheckboxes.domaines.ids.find(id => domaine.id === id)"
                  type="checkbox"
                  class="mr-s"
                  @change="filterCheckboxToggle($event, 'domaines', 'id')"
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
        </div>
        <div class="tablet-blob-1-2 large-blob-1-3">
          <div class="mb">
            <h6>Types</h6>
            <ul class="list-sans">
              <li
                v-for="type in types"
                :key="type.nom"
              >
                <label>
                  <input
                    :value="type.id"
                    :checked="filterCheckboxes.types.ids.find(id => type.id === id)"
                    type="checkbox"
                    class="mr-s"
                    @change="filterCheckboxToggle($event, 'types')"
                  >
                  <span class="cap-first">
                    {{ type.nom }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="tablet-blob-1-2 large-blob-1-3">
          <div class="mb">
            <h6>Statuts</h6>
            <ul class="list-sans">
              <li
                v-for="statut in statuts"
                :key="statut.id"
              >
                <label>
                  <input
                    :value="statut.id"
                    :checked="filterCheckboxes.statuts.ids.find(id => statut.id === id)"
                    type="checkbox"
                    class="mr-s"
                    @change="filterCheckboxToggle($event, 'statuts', 'id')"
                  >
                  <Dot :color="`bg-${statut.couleur}`" />
                  <span class="cap-first">
                    {{ statut.nom }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        ref="button"
        class="btn-flash p-s rnd-xs full-x mb"
        @click="get"
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

  computed: {
    filterInputs() {
      return this.$store.state.titres.filterInputs
    },

    filterCheckboxes() {
      return this.$store.state.titres.filterCheckboxes
    },

    domaines() {
      return this.$store.state.metas.domaines
    },
    types() {
      return (
        this.$store.state.metas.types &&
        this.$store.state.metas.types.reduce((res, cur) => {
          const e = res.find(e => e.nom === cur.nom)
          return e ? res : [...res, cur]
        }, [])
      )
    },
    statuts() {
      return this.$store.state.metas.statuts
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    filterCheckboxToggle(e, name) {
      const filterCheckboxToggle = (name, id) => {
        this.$store.dispatch('titres/filterCheckboxToggle', {
          name,
          id
        })
      }

      if (name === 'types') {
        const nom = this.$store.state.metas.types.find(
          type => type.id === e.target.value
        ).nom
        const ids = this.$store.state.metas.types
          .filter(type => type.nom === nom)
          .map(type => type.id)

        ids.forEach(id => {
          filterCheckboxToggle(name, id)
        })
      } else {
        filterCheckboxToggle(name, e.target.value)
      }
    },

    filterInputSet(e, name) {
      this.$store.dispatch('titres/filterInputSet', {
        name,
        value: e.target.value
      })
    },

    get() {
      this.$refs.button.focus()
      this.$store.dispatch('titres/get')
      this.$refs.filters.close()
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.$refs.filters.opened) {
        this.get()
      }
    }
  }
}
</script>
