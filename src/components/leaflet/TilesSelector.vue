<template>
  <accordion class="mb">
    <template slot="title">Fond de carte</template>
    <ul class="list-sans">
      <li
        v-for="tile in tiles"
        :key="tile.type">
        <label>
          <input
            :value="tile.name"
            :checked="tile.name === tilesName"
            type="radio"
            class="mr-s"
            @change="tilesNameSet(tile.name)">
          {{ tile.name }}
        </label>
      </li>
    </ul>
  </accordion>
</template>

<script>
import Accordion from '@/components/ui/Accordion.vue'

export default {
  components: {
    Accordion
  },

  computed: {
    tiles () {
      return this.$store.state.map.tiles
    },
    tilesName () {
      return this.$store.state.user.preferences.map.tilesName
    }
  },

  methods: {
    tilesNameSet (tileName) {
      this.$store.commit('user/preferencesMapTilesNameSet', tileName)
    }
  }
}
</script>
