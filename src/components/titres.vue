<template>
  
  <loader v-if="!loaded" />
  <card v-else>

    <div class="flex">
      <h2 class="mt-s">Titres miniers</h2>
      <ul class="list-inline flex-right">
        <li
          v-for="component in viewComponents"
          :key="component.name" 
          :class="{ active: viewActive === component.name }"
        >
          <button
            class="btn-border px-m py-s"
            @click="viewSet(component.name)"
          >
            <i :class="`icon-24 icon-24-${component.icon}`" />
          </button>
        </li>
      </ul>
    </div>

    <titres-filters />

    <component
      :is="viewComponent"
      v-if="viewActive"
      :titres="titres"
    />
  </card>
</template>

<script>
import Card from './ui/card.vue'
import Loader from './ui/loader.vue'
import TitresTable from './camino/titres-table.vue'
import TitresMap from './camino/titres-map.vue'
import TitresFilters from './camino/titres-filters.vue'

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
      return this.$store.state.titres.liste
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
