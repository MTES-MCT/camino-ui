<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="flex">
      <h2 class="mt-s">
        Titres miniers
      </h2>
      <ul class="list-inline flex-right">
        <li
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
        </li>
      </ul>
    </div>

    <TitresFilters @titres-get="get" />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <p>
          Résultat : {{ titres.length }} titre{{ titres.length > 1 ? 's' : '' }} minier{{ titres.length > 1 ? 's' : '' }}
        </p>
      </div>
      <div
        v-if="titres.length"
        class="tablet-blob-1-2 tablet-flex"
      >
        <div class="tablet-flex-right mt--s mb-s">
          <titres-csv-download
            :titres="titres"
          />
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

    vueId() {
      return this.$store.state.user.preferences.titres.vueId
    },

    vue() {
      return this.vues.find(c => c.id === this.vueId)
    }
  },

  watch: {
    $route: function(to, from) {
      if (to.query.vue !== from.query.vue) {
        this.vueSet(to.query.vue)
      }
    }
  },

  created() {
    const vueId = this.$route.query.vue || this.vueId

    if (!this.$route.query.vue) {
      this.urlSet(vueId)
    }

    if (this.vueId !== vueId) {
      this.vueSet(vueId)
    }
  },

  methods: {
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
    }
  }
}
</script>
