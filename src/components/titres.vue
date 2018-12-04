<template>
  <Loader v-if="!loaded" />
  <Card v-else>
    <div class="flex">
      <h2 class="mt-s">
        Titres miniers
      </h2>
      <ul class="list-inline flex-right">
        <li 
          class="mr-0" 
          :class="{ active: viewActive === 'liste' }"
        >
          <button
            class="btn-border pill-left px-m py-s"
            @click="viewSet('liste')"
          >
            <i class="icon-24 icon-24-list" />
          </button>
        </li>
        <li :class="{ active: viewActive === 'carte' }">
          <button
            class="btn-border pill-right px-m py-s"
            @click="viewSet('carte')"
          >
            <i class="icon-24 icon-24-globe" />
          </button>
        </li>
      </ul>
    </div>

    <TitresFilters />

    <Component
      :is="viewComponent"
      v-if="viewActive"
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

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitresFilters
  },

  data () {
    return {
      filtersOpened: false,
      viewActive: 'carte',
      viewComponents: [{
        name: 'liste',
        component: TitresTable,
        icon: 'list'
      }, {
        name: 'carte',
        component: TitresMap,
        icon: 'globe'
      }]
    }
  },

  computed: {
    titres () {
      return this.$store.state.titres.list
    },
    loaded () {
      return !!this.titres
    },
    viewComponent () {
      return this.viewComponents.find(c => c.name === this.viewActive).component
    }
  },

  created () {
    this.get()
    if (this.$route.query.vue) {
      this.viewActive = this.$route.query.vue
    }
  },

  methods: {
    get () {
      this.$store.dispatch('titres/get')
    },
    viewSet (viewNew) {
      this.viewActive = viewNew
      this.$router.push({ query: { vue: this.viewActive } })
    }
  },

}
</script>
