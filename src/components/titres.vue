<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="flex">
      <h2 class="mt-s">
        Titres miniers
      </h2>
      <ul class="list-inline flex-right">
        <li
          v-for="v in views"
          :key="v.id"
          class="mr-0 pill-list"
          :class="{ active: viewId === v.id }"
        >
          <button
            class="btn-border px-m py-s"
            @click="viewSet(v.id)"
          >
            <i
              :class="`icon-24-${v.icon}`"
              class="icon-24"
            />
          </button>
        </li>
      </ul>
    </div>

    <TitresFilters />

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
      :is="view.component"
      v-if="viewId"
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
      viewId: 'carte',
      views: [
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

    view() {
      return this.views.find(c => c.id === this.viewId)
    }
  },

  created() {
    const viewId =
      this.$route.query.vue ||
      this.$store.state.user.preferences.titres.vue ||
      this.viewId

    this.viewSet(viewId)
  },

  methods: {
    get() {
      this.$store.dispatch('titres/get')
    },

    viewSet(viewId) {
      this.viewId = viewId
      this.$route.query.vue = viewId

      this.$store.dispatch('user/preferenceSet', {
        section: 'titres.vue',
        value: viewId
      })
    }
  }
}
</script>
