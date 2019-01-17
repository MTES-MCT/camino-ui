<template>
  <Accordion
    ref="filters"
    :sub="false"
    class="mb"
  >
    <template slot="title">
      Filtres
    </template>
    <div>
      <div class="tablet-blobs mt">
        <div class="tablet-blob-1-2 large-blob-1-3">
          <div class="mb hide">
            <h6>Localisation</h6>
            <input
              type="text"
              placeholder="Région, département, commune…"
              class="p-s"
            >
          </div>
          <div class="mb hide">
            <h6>Titulaire</h6>
            <input
              type="text"
              placeholder="Nom du titulaire…"
              class="p-s"
            >
          </div>
          <div class="mb">
            <h6>Noms</h6>
            <input
              :value="noms"
              type="text"
              placeholder="…"
              class="p-s"
              @blur="filterInput($event, 'noms')"
            >
          </div>
          <div class="mb">
            <h6>Substances</h6>
            <input
              :value="substances"
              type="text"
              placeholder="Or, Argent, Ag…"
              class="p-s"
              @blur="filterInput($event, 'substances')"
            >
          </div>
          <div class="mb">
            <h6>Entreprises</h6>
            <input
              :value="entreprises"
              type="text"
              placeholder="Nom ou siret"
              class="p-s"
              @blur="filterInput($event, 'entreprises')"
            >
          </div>
          <div class="mb">
            <h6>Références</h6>
            <input
              :value="references"
              type="text"
              placeholder="Référence DGEC, DEAL, DEB, BRGM, Ifremer, etc."
              class="p-s"
              @blur="filterInput($event, 'references')"
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
                  :checked="domaine.checked"
                  type="checkbox"
                  class="mr-s"
                  @change="filterToggle($event, 'domaines', 'id')"
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
                    :value="type.nom"
                    :checked="type.checked"
                    type="checkbox"
                    class="mr-s"
                    @change="filterToggle($event, 'types', 'nom')"
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
                    :checked="statut.checked"
                    type="checkbox"
                    class="mr-s"
                    @change="filterToggle($event, 'statuts', 'id')"
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
    domaines() {
      return this.$store.state.titres.domaines
    },
    types() {
      return (
        this.$store.state.titres.types &&
        this.$store.state.titres.types.reduce((res, cur) => {
          const e = res.find(e => e.nom === cur.nom)
          return e ? res : [...res, cur]
        }, [])
      )
    },
    statuts() {
      return this.$store.state.titres.statuts
    },
    substances() {
      return (
        this.$store.state.titres.substances &&
        this.$store.state.titres.substances.join(' ')
      )
    },
    entreprises() {
      return (
        this.$store.state.titres.entreprises &&
        this.$store.state.titres.entreprises.join(' ')
      )
    },
    references() {
      return (
        this.$store.state.titres.references &&
        this.$store.state.titres.references.join(' ')
      )
    },
    noms() {
      return (
        this.$store.state.titres.noms && this.$store.state.titres.noms.join(' ')
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    filterToggle(e, name, property) {
      this.$store.dispatch('titres/filterToggle', {
        name,
        value: e.target.value,
        property
      })
    },

    filterInput(e, name) {
      this.$store.dispatch('titres/filterInput', {
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
