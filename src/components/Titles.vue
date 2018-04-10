<template>
  
  <loader v-if="!loaded" />
  <card v-else >

    <div class="flex">
      <h2 class="mt-s">Titres miniers</h2>
      <ul class="list-inline flex-right">
        <li :class="{ active: viewCurrent === 'map' }">
          <button
            class="btn-border px-m py-s"
            @click="viewSet('map')"><i class="icon-24 icon-24-globe" /></button>
        </li>
        <li :class="{ active: viewCurrent === 'list' }">
          <button
            class="btn-border px-m py-s"
            @click="viewSet('list')"><i class="icon-24 icon-24-list" /></button>
        </li>
      </ul>
    </div>

    <titles-filters />

    <component
      :titles="titres"
      :is="viewComponent" />
  </card>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Loader from '@/components/ui/Loader.vue'
import TitlesTable from '@/components/camino/TitlesTable.vue'
import TitlesMap from '@/components/camino/TitlesMap.vue'
import TitlesFilters from '@/components/camino/TitlesFilters.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitlesFilters
  },

  data () {
    return {
      filtersOpened: false,
      viewCurrent: 'map'
    }
  },

  computed: {
    titres () {
      return this.$store.state.titles.list
    },
    filtres () {
      return this.$store.state.lib.titre.filtres
    },
    loaded () {
      return !!this.titres
    },
    viewComponent () {
      return this.viewCurrent === 'map' ? TitlesMap : TitlesTable
    }
  },

  watch: {
    '$route': 'get'
  },

  created () {
    this.get()
  },

  methods: {
    get () {
      this.$store.dispatch('titles/get')
    },
    viewSet (viewNew) {
      this.viewCurrent = viewNew
    }
  }

}
</script>
