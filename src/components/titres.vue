<template>
  <Card>
    <div class="desktop-blobs">
      <div class="desktop-blob-2-3">
        <h1>Titres miniers et autorisations</h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="modification"
          class="btn-border rnd-xs py-s px-m full-x flex mb-s"
          @click="addPopupOpen"
        >
          Ajouter un titre <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <Url
      :params="preferences"
      :values="urlValues"
      @params:update="preferencesUpdate"
    />

    <TitresFiltres
      v-if="metasLoaded"
      @titres:update="titresUpdate"
    />
    <div
      v-else
      class="py-s px-m mb-s"
    >
      …
    </div>

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
          :class="{ active: preferences.vueId === v.id }"
        >
          <button
            v-if="preferences.vueId !== v.id"
            class="p-m btn-tab rnd-t-xs"
            @click="preferencesUpdate({ vueId: v.id })"
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
      v-if="preferences.vueId && metasLoaded"
      :titres="titres"
    />
    <div
      v-else
      class="map-list mb-xxl mt"
    >
      …
    </div>
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Url from './_ui/url.vue'
import TitreEditPopup from './titre/edit-popup.vue'
import TitresTableUrl from './titres/table-url.vue'
import TitresMap from './titres/map-url.vue'
import TitresFiltres from './titres/filtres-url.vue'
import TitresDownloadCsv from './titres/download-csv.vue'
import TitresDownloadGeojson from './titres/download-geojson.vue'

export default {
  name: 'Titres',

  components: {
    Card,
    Url,
    TitresFiltres,
    TitresDownloadCsv,
    TitresDownloadGeojson
  },

  data() {
    return {
      metasLoaded: false,
      vues: [
        {
          id: 'carte',
          component: TitresMap,
          icon: 'globe'
        },
        {
          id: 'liste',
          component: TitresTableUrl,
          icon: 'list'
        }
      ],
      urlValues: {
        vueId: { type: 'string', values: ['carte', 'liste'] }
      }
    }
  },

  computed: {
    titres() {
      return this.$store.state.titres.list
    },

    preferences() {
      return this.$store.state.titres.preferences.vue
    },

    vue() {
      return this.vues.find(v => v.id === this.preferences.vueId)
    },

    user() {
      return this.$store.state.user.current
    },

    userLoaded() {
      return this.$store.state.user.loaded
    },

    modification() {
      return this.$store.state.user.metas.domaines.filter(d => d.titresCreation)
        .length
    }
  },

  watch: {
    // TODO: pourquoi tester userLoaded
    user: 'metasGet',
    userLoaded: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  methods: {
    async titresUpdate() {
      await this.$store.dispatch('titres/get')
    },

    async metasGet() {
      await this.$store.dispatch('titres/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    },

    preferencesUpdate(params) {
      this.eventTrack(params.vueId)
      this.$store.dispatch('titres/preferencesSet', {
        section: 'vue',
        params
      })
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
    },

    eventTrack(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent('titres-vue', 'titres-vueId', id)
      }
    }
  }
}
</script>
