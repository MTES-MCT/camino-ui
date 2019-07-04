<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="desktop-blobs">
      <div class="desktop-blob-2-3">
        <h1>Titres miniers et autorisations</h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="permissionsCheck(['super'])"
          class="btn-border rnd-xs py-s px-m full-x flex mb-s"
          @click="addPopupOpen"
        >
          Ajouter un titre <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <TitresFiltres />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <p>
          {{ titres.length }} résultat{{ titres.length > 1 ? 's' : '' }}
        </p>
      </div>
      <div
        class="tablet-blob-1-2 flex"
      >
        <div class="flex-right mt--s mb-s flex">
          <titres-csv-download
            v-if="titres.length"
            :titres="titres"
            class="mr-s mb-s"
          />

          <titres-geojson-download
            v-if="titres.length"
            :titres="titres"
            class="mr-s mb-s"
          />

          <div class="flex">
            <div
              v-for="v in vues"
              :key="v.id"
              class="pill-list mb-s"
              :class="{ active: vueId === v.id }"
            >
              <button
                class="btn-border px-m py-s"
                @click="urlSet(v.id)"
              >
                <i
                  :class="`icon-${v.icon}`"
                  class="icon-24"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Component
      :is="vue.component"
      v-if="vueId"
      :titres="titres"
    />
  </Card>
</template>

<script>
import Card from './ui/card.vue'
import Loader from './ui/loader.vue'
import EditPopup from './titre/edit-popup.vue'
import TitresTable from './titres/table.vue'
import TitresMap from './titres/map.vue'
import TitresFiltres from './titres/filtres.vue'
import TitresCsvDownload from './titres/csv-download.vue'
import TitresGeojsonDownload from './titres/geojson-download.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitresFiltres,
    TitresCsvDownload,
    TitresGeojsonDownload
  },

  data() {
    return {
      filtersOpened: false,
      vues: [
        {
          id: 'liste',
          component: TitresTable,
          icon: 'list'
        },
        {
          id: 'carte',
          component: TitresMap,
          icon: 'globe'
        }
      ]
    }
  },

  computed: {
    titres() {
      return this.$store.state.titres.list
    },

    loaded() {
      return !!this.titres
    },

    user() {
      return this.$store.state.user.current
    },

    userLoaded() {
      return this.$store.state.user.loaded
    },

    vueId() {
      return this.$store.state.user.preferences.titres.vueId
    },

    vue() {
      return this.vues.find(c => c.id === this.vueId)
    },

    filtres() {
      return this.$store.state.user.preferences.filtres
    },

    metasLoaded() {
      return this.$store.state.loaded
    }
  },

  watch: {
    $route: function(to, from) {
      if (to.query.vue && to.query.vue !== from.query.vue) {
        this.vueSet(to.query.vue)
      } else if (!to.query.vue) {
        this.init()
      }
    },

    user: function(to, from) {
      this.get()
    },

    filtres: {
      handler: function(to, from) {
        this.get()
      },
      deep: true
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const vueId = this.$route.query.vue || this.vueId

      if (!this.$route.query.vue) {
        this.urlSet(vueId)
      }

      if (this.vueId !== vueId) {
        this.vueSet(vueId)
      }
    },

    get() {
      if (this.userLoaded && this.metasLoaded) {
        this.$store.dispatch('titres/get')
      }
    },

    vueSet(value) {
      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.vueId',
        value
      })
    },

    urlSet(value) {
      this.urlParamSet('vue', value)
    },

    addPopupOpen() {
      const titre = { references: [] }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          titre,
          domaines: this.$store.state.metas.domaines,
          creation: true
        }
      })
    }
  }
}
</script>
