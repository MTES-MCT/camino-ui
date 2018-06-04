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

    <titres-filtres />

    <component
      :titres="titres"
      :is="viewComponent" />
  </card>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Loader from '@/components/ui/Loader.vue'
import TitresTable from '@/components/camino/TitresTable.vue'
import TitresMap from '@/components/camino/TitresMap.vue'
import TitresFiltres from '@/components/camino/TitresFiltres.vue'

export default {
  name: 'Titres',

  components: {
    Loader,
    Card,
    TitresFiltres
  },

  data () {
    return {
      filtersOpened: false,
      viewCurrent: 'map'
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
      return this.viewCurrent === 'map' ? TitresMap : TitresTable
    }
  },

  watch: {
    $route: 'get'
  },

  created () {
    this.get()
  },

  methods: {
    get () {
      this.$store.dispatch('titres/get')
    },
    viewSet (viewNew) {
      this.viewCurrent = viewNew
    }
  }
}
</script>
