<template>
  
  <loader v-if="!loaded" />
  <card v-else >

    <div class="flex">
      <h2 class="mt-s">Titres</h2>
      <ul class="list-inline flex-right">
        <li>
          <button
            class="btn-border px-m py-s"
            @click="viewSet('carte')">Carte</button>
        </li>
        <li>
          <button
            class="btn-border px-m py-s"
            @click="viewSet('liste')">Liste</button>
        </li>
      </ul>
    </div>

    <titles-filters />

    <component
      :titles="titres"
      :is="viewCurrent" />
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
      viewCurrent: TitlesMap
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
      if (viewNew === 'carte') {
        this.viewCurrent = TitlesMap
      } else {
        this.viewCurrent = TitlesTable
      }
    }
  }

}
</script>
