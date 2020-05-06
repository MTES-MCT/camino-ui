<template>
  <div>
    <div class="desktop-blobs pt-s">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m">
          Titres miniers et autorisations
        </h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="modification"
          class="btn rnd-xs py-s px-m full-x flex mb-s h5"
          @click="addPopupOpen"
        >
          <span class="mt-xxs">Ajouter un titre</span> <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <Url
      :params="urlValues"
      :values="preferences"
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
      <div class="tablet-blob-1-4 flex mb-s">
        <Downloads
          v-if="titres.length"
          :formats="['geojson','csv', 'xls', 'ods']"
          section="titres"
          class="flex-right full-x"
        />
      </div>

      <div class="tablet-blob-3-4 flex">
        <div
          v-for="v in vues"
          :key="v.id"
          class="mr-xs"
          :class="{ active: preferences.vueId === v.id }"
        >
          <button
            v-if="preferences.vueId !== v.id"
            class="p-m btn-tab rnd-t-s"
            @click="preferencesUpdate({ vueId: v.id })"
          >
            <i
              :class="`icon-${v.icon}`"
              class="icon-24"
            />
          </button>
          <div
            v-else
            class="p-m span-tab rnd-t-s"
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

    <div class="line-neutral" />
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
  </div>
</template>

<script>
import Url from './_ui/url.vue'
import TitreEditPopup from './titre/edit-popup.vue'
import TitresTableUrl from './titres/table-url.vue'
import TitresMap from './titres/map-url.vue'
import TitresFiltres from './titres/filtres-url.vue'
import Downloads from './_common/downloads.vue'

export default {
  name: 'Titres',

  components: {
    Url,
    TitresFiltres,
    Downloads
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

    modification() {
      return this.$store.state.user.metas.domaines.filter(d => d.titresCreation)
        .length
    }
  },

  watch: {
    user: 'metasGet'
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
