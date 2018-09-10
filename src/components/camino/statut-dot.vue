<template>
  <dot :color="colorGet(statut)" />
</template>

<script>
import Dot from '../ui/dot.vue'

export default {
  components: {
    Dot
  },

  props: {
    statut: {
      type: String,
      default: 'neutral'
    }
  },

  computed: {
    colors () {
      return this.$store.state.lib['statuts']
    }
  },

  methods: {
    colorGet (value) {
      const res = Object.keys(this.colors).find(color =>
        this.colors[color].find(v => v === value)
      )
      return this.colors && res ? `bg-${res}` : 'bg-neutral'
    }
  }
}
</script>
