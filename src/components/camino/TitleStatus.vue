<template>
  <dot :color="colorGet(status)" />
</template>

<script>
import Dot from '@components/ui/Dot.vue'

export default {
  components: {
    Dot
  },

  props: {
    status: {
      type: String,
      default: 'neutral'
    }
  },

  computed: {
    colors () {
      return this.$store.state.lib['titre']['statuts']
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
