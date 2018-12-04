<template>
  <Accordion class="mb">
    <template slot="title">
      Fond de carte
    </template>
    <ul class="list-sans mt-m">
      <li
        v-for="tile in tiles"
        :key="tile.name"
      >
        <label>
          <input
            :value="tile.name"
            :checked="tile.name === tilesName"
            type="radio"
            class="mr-s"
            @change="$emit('tiles-name-set', tile.name)"
          >
          {{ tile.name }}
        </label>
      </li>
    </ul>
  </Accordion>
</template>

<script>
import Accordion from '../ui/accordion.vue'

export default {
  components: {
    Accordion
  },

  props: {
    tiles: {
      type: Array,
      default: () => []
    },
    tilesName: {
      type: String,
      default: 'osm / fr'
    }
  }
}
</script>
