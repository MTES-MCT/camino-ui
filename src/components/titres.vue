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
      :values="vueUrlValues"
      :params="preferences.vue"
      @params:update="vuePreferencesUpdate"
    />

    <Url
      v-if="metasLoaded"
      :values="filtresUrlValues"
      :params="preferences.filtres"
      @params:update="filtresPreferencesUpdate"
    />

    <Filtres
      :filtres="filtresFormated"
      :loaded="metasLoaded"
      :metas="metas"
      :preferences="preferences.filtres"
      @elements:update="titresUpdate"
      @preferences:update="filtresPreferencesUpdate"
      @toggle="filtresToggle"
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
          :class="{ active: preferences.vue.vueId === v.id }"
        >
          <button
            v-if="preferences.vue.vueId !== v.id"
            class="p-m btn-tab rnd-t-s"
            @click="vuePreferencesUpdate({ vueId: v.id })"
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
          {{ titres.length }} résultat{{ titres.length > 1 ? 's' : '' }}
        </div>
      </div>
    </div>

    <div class="line-neutral" />
    <Component
      :is="vue.component"
      v-if="preferences.vue.vueId && metasLoaded"
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
import Filtres from './_common/filtres.vue'
import Downloads from './_common/downloads.vue'

import filtres from './titres/filtres.js'

export default {
  name: 'Titres',

  components: { Url, Filtres, Downloads },

  data() {
    return {
      filtres,
      metasLoaded: false,
      vues: [
        { id: 'carte', component: TitresMap, icon: 'globe' },
        { id: 'liste', component: TitresTableUrl, icon: 'list' }
      ],
      vueUrlValues: {
        vueId: { type: 'string', elements: ['carte', 'liste'] }
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

    params() {
      return this.$store.state.titres.params
    },

    vue() {
      return this.vues.find(v => v.id === this.preferences.vue.vueId)
    },

    modification() {
      return this.$store.state.user.metas.domaines.filter(d => d.titresCreation)
        .length
    },

    filtresFormated() {
      return this.filtres.map(filtre => {
        if (filtre.type === 'checkboxes') {
          const metaId = filtre.id.replace(/Ids/g, '')
          filtre.elements = this.metas[metaId]
        }

        return filtre
      })
    },

    filtresUrlValues() {
      const paramsIds = Object.keys(this.preferences.filtres)

      return this.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
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

    vuePreferencesUpdate(params) {
      this.vueEventTrack(params.vueId)
      this.$store.dispatch('titres/preferencesSet', {
        section: 'vue',
        params
      })
    },

    filtresPreferencesUpdate(params) {
      this.$store.dispatch('titres/preferencesSet', {
        section: 'filtres',
        params
      })
      this.paramsEventTrack(params)
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

    filtresToggle(opened) {
      if (opened) {
        this.paramsEventTrack()
      }
    },

    vueEventTrack(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent('titres-vue', 'titres-vueId', id)
      }
    },

    paramsEventTrack(params) {
      if (this.$matomo) {
        if (params) {
          const events = this.params.reduce((events, { type, id }) => {
            if (type === 'string' && params[id]) {
              events.push({ id, value: params[id] })
            } else if (type === 'strings' && params[id]) {
              const values = params[id]
              values.forEach(value => {
                events.push({ id, value })
              })
            }

            return events
          }, [])

          events.forEach(({ id, value }) => {
            this.$matomo.trackEvent(
              'titres-filtres',
              `titres-filtres-${id}`,
              value
            )
          })

          Object.keys(params).forEach(id => {
            if (params[id] && params[id].length !== 0) {
              this.$matomo.trackSiteSearch(JSON.stringify(params[id]), id)
            }
          })
        } else {
          this.$matomo.trackEvent('titres', 'filtres', 'filtres-titres')
        }
      }
    }
  }
}
</script>
