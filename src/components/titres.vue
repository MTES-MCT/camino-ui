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

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-2 flex mb-s">
        <TitresDownloadCsv
          v-if="titres.length"
          :titres="titres"
          class="mr-s flex-right"
        />

        <TitresDownloadGeojson
          v-if="titres.length"
          :titres="titres"
        />
      </div>

      <div class="tablet-blob-1-2 flex">
        <div
          v-for="v in vues"
          :key="v.id"
          class="mr-xs"
          :class="{ active: vueId === v.id }"
        >
          <button
            v-if="vueId !== v.id"
            class="p-m btn-tab rnd-t-xs"
            @click="urlSet(v.id)"
          >
            <i
              :class="`icon-${v.icon}`"
              class="icon-24"
            />
          </button>
          <div
            v-else
            class="p-m span-tab rnd-t-xs"
          >
            <i
              :class="`icon-${v.icon}`"
              class="icon-24"
            />
          </div>
        </div>
        <div class="p-m">
          {{ titres.length }} résultat{{ titres.length > 1 ? 's' : '' }}
        </div>
      </div>
    </div>

    <div class="card-border" />

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
import TitreEditPopup from './titre/edit-popup.vue'
import TitresTable from './titres/table.vue'
import TitresMap from './titres/map.vue'
import TitresFiltres from './titres/filtres.vue'
import TitresDownloadCsv from './titres/download-csv.vue'
import TitresDownloadGeojson from './titres/download-geojson.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitresFiltres,
    TitresDownloadCsv,
    TitresDownloadGeojson
  },

  data() {
    return {
      filtersOpened: false,
      vues: [
        {
          id: 'carte',
          component: TitresMap,
          icon: 'globe'
        },
        {
          id: 'liste',
          component: TitresTable,
          icon: 'list'
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

    vueId() {
      return this.$store.state.user.preferences.titres.vueId
    },

    vue() {
      return this.vues.find(c => c.id === this.vueId)
    },

    filtres() {
      return this.$store.state.user.preferences.filtres
    },

    userLoaded() {
      return this.$store.state.user.loaded
    },

    metasLoaded() {
      return this.$store.state.metas.titresLoaded
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

    userLoaded: function(to, from) {
      this.get()
    },

    metasLoaded: function(to, from) {
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
    this.get()
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
      if (this.metasLoaded && this.userLoaded) {
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
        component: TitreEditPopup,
        props: {
          titre,
          creation: true
        }
      })
    }
  }
}
</script>
