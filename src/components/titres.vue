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

    <Filtres
      :metas-loaded="metasLoaded"
      @loaded="urlLoad('filtres')"
    />

    <Url
      :values="vueUrlValues"
      :params="{ vue }"
      @params:update="vuePreferencesUpdate"
      @loaded="urlLoad('vue')"
    />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="titres.length"
          :formats="['geojson', 'csv', 'xlsx', 'ods']"
          section="titres"
          class="flex-right full-x"
        />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div
          v-for="v in vues"
          :key="v.id"
          class="mr-xs"
          :class="{ active: vue === v.id }"
        >
          <button
            v-if="vue !== v.id"
            class="p-m btn-tab rnd-t-s"
            @click="vueSet(v.id)"
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
        <div class="p-m h6 bold mb-xs">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line-neutral" />
    <Component
      :is="vueComponent"
      v-if="vue && metasLoaded"
      :titres="titres"
      :total="total"
      @loaded="urlLoad('component')"
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
import Downloads from './_common/downloads.vue'
import TitreEditPopup from './titre/edit-popup.vue'
import TitresTableUrl from './titres/table-url.vue'
import TitresMap from './titres/map-url.vue'
import Filtres from './titres/filtres-url.vue'

export default {
  name: 'Titres',

  components: { Url, Filtres, Downloads },

  data() {
    return {
      metasLoaded: false,
      urlsLoaded: {
        vue: false,
        component: false,
        filtres: false
      },
      urlLoaded: false,
      vues: [
        { id: 'carte', component: TitresMap, icon: 'globe' },
        { id: 'liste', component: TitresTableUrl, icon: 'list' }
      ],
      vueUrlValues: {
        vue: { type: 'string', elements: ['carte', 'liste'] }
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.user.current
    },

    titres() {
      return this.$store.state.titres.list
    },

    metas() {
      return {
        domaines: this.$store.state.titres.metas.domaines,
        types: this.$store.state.titres.metas.types,
        statuts: this.$store.state.titres.metas.statuts
      }
    },

    preferences() {
      return this.$store.state.titres.preferences
    },

    vue() {
      return this.$store.state.titres.vue
    },

    vueComponent() {
      return this.vues.find(v => v.id === this.vue).component
    },

    modification() {
      return this.$store.state.user.metas.domaines.filter(d => d.titresCreation)
        .length
    },

    total() {
      return this.$store.state.titres.total
    },

    resultat() {
      const res =
        this.total > this.titres.length
          ? `${this.titres.length} / ${this.total}`
          : this.titres.length

      return `${res} résultat${this.titres.length > 1 ? 's' : ''}`
    }
  },

  watch: {
    user: 'metasGet',

    preferences: {
      handler: function(to, from) {
        this.titresGet()
      },
      deep: true
    },

    vue: function(vue) {
      // si la vue est 'carte'
      // le composant `map.vue` emet un event `perimetre`
      // qui met à jour les préférences utilisateurs
      // et déclenche déjà un rechargement des titres
      if (vue !== 'carte') {
        this.titresGet()
      }
    }
  },

  async created() {
    await this.metasGet()
  },

  destroyed() {
    this.$store.commit('titres/set', { elements: [], total: 0 })
  },

  methods: {
    async titresGet() {
      const loaded = this.metasLoaded && this.urlLoaded

      if (loaded) {
        await this.$store.dispatch('titres/get')
      }
    },

    async metasGet() {
      await this.$store.dispatch('titres/metasGet')
      if (!this.metasLoaded) {
        this.metasLoaded = true
      }
    },

    vuePreferencesUpdate(params) {
      this.vueSet(params.vue)
    },

    async vueSet(vue) {
      await this.$store.dispatch('titres/vueSet', vue)

      if (this.$matomo) {
        this.$matomo.trackEvent('titres-vue', 'titres-vueId', vue)
      }
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

    titresLoad() {
      if (!this.urlLoaded) {
        this.urlLoaded = true
        this.titresGet()
      }
    },

    urlLoad(id) {
      this.urlsLoaded[id] = true

      if (
        this.urlsLoaded.vue &&
        this.urlsLoaded.component &&
        this.urlsLoaded.filtres
      ) {
        this.titresLoad()
      }
    }
  }
}
</script>
