<template>
  <div>
    <div class="desktop-blobs">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m">Titres miniers et autorisations</h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="modification"
          class="btn rnd-xs py-s px-m full-x flex mb-s h5"
          @click="addPopupOpen"
        >
          <span class="mt-xxs">Ajouter un titre</span>
          <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <Filtres :metas-loaded="metasLoaded" @loaded="urlLoad('filtres')" />

    <Url
      :values="vueUrlValues"
      :params="{ vue }"
      @params-update="preferencesVueUpdate"
      @loaded="urlLoad('vue')"
    />

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="titres.length"
          :formats="['geojson', 'csv', 'xlsx', 'ods']"
          section="titres"
          class="flex-right full-x downloads"
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
            @click="vueClick(v.id)"
          >
            <i :class="`icon-${v.icon}`" class="icon-24" />
          </button>
          <div v-else class="p-m span-tab rnd-t-s">
            <i :class="`icon-${v.icon}`" class="icon-24" />
          </div>
        </div>
        <div class="pl-m pt-m h6 bold">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line-neutral width-full" />
    <component
      :is="vueComponent"
      v-if="vue && metasLoaded && vueComponent"
      :titres="titres"
      :total="total"
      @loaded="urlLoad('component')"
    />
    <div v-else class="table-view mb-xxl mt">…</div>
  </div>
</template>

<script>
import { markRaw } from '@vue/reactivity'
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
      vues: [
        { id: 'carte', component: markRaw(TitresMap), icon: 'globe' },
        { id: 'liste', component: markRaw(TitresTableUrl), icon: 'list' }
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

    metasLoaded() {
      return this.$store.state.titres.loaded.metas
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
      return this.$store.state.user.metas.domaines.some(d =>
        d.titresTypes.some(dtt => dtt.titresCreation)
      )
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
    },

    loading() {
      return this.$store.state.loading.includes('titres')
    }
  },

  watch: {
    user: 'metasGet'
  },

  async created() {
    await this.metasGet()
  },

  unmounted() {
    this.$store.commit('titres/reset')
  },

  methods: {
    async metasGet() {
      await this.$store.dispatch('titres/metasGet')
    },

    preferencesVueUpdate(params) {
      this.vueSet(params.vue)
    },

    async vueSet(vue) {
      await this.$store.dispatch('titres/vueSet', vue)

      if (this.$matomo) {
        this.$matomo.trackEvent('titres-vue', 'titres-vueId', vue)
      }
    },

    vueClick(vue) {
      console.log('--------------------------------')
      if (!this.loading) {
        this.vueSet(vue)
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

      this.eventTrack({ categorie: 'titre-sections', action: 'titre-ajouter' })
    },

    urlLoad(id) {
      this.$store.dispatch('titres/loaded', id)
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
