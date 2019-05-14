<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="flex">
      <h1>Titres miniers</h1>
    </div>

    <button
      v-if="permissionsCheck(['super'])"
      class="btn-border rnd-xs py-s px-m full-x flex mb"
      @click="addPopupOpen"
    >
      Ajouter un titre <i class="icon-24 icon-24-plus flex-right" />
    </button>

    <TitresFilters @titres-get="get" />

    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <p>
          Résultat : {{ titres.length }} titre{{ titres.length > 1 ? 's' : '' }} minier{{ titres.length > 1 ? 's' : '' }}
        </p>
      </div>
      <div
        class="desktop-blob-1-2 flex"
      >
        <div class="flex-right mt--s mb-s flex">
          <titres-csv-download
            v-if="titres.length"
            :titres="titres"
            class="mr-s"
          />

          <div class="flex">
            <div
              v-for="v in vues"
              :key="v.id"
              class="mr-0 pill-list"
              :class="{ active: vueId === v.id }"
            >
              <button
                class="btn-border px-m py-s"
                @click="urlSet(v.id)"
              >
                <i
                  :class="`icon-24-${v.icon}`"
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
import TitresFilters from './titres/filters.vue'
import TitresCsvDownload from './titres/csv-download.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitresFilters,
    TitresCsvDownload
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

    vueId() {
      return this.$store.state.user.preferences.titres.vueId
    },

    vue() {
      return this.vues.find(c => c.id === this.vueId)
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

    user: 'get'
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
      this.$store.dispatch('titres/get')
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
          types: this.$store.state.metas.types,
          domaines: this.$store.state.metas.domaines,
          creation: true
        }
      })
    }
  }
}
</script>
