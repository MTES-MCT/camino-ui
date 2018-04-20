<template>
  <pill :color="colorGet(status)" />
</template>

<script>
import Pill from '@/components/ui/Pill.vue'

export default {
  components: {
    Pill
  },

  props: {
    domain: {
      type: String,
      default: 'neutral'
    }
  },

  computed: {
    colors () {
      return this.$store.state.lib['titre']['domains']
    }
  },

  methods: {
    colorGet (value) {
      const res = Object.keys(this.colors).find(color =>
        this.colors[color].find(v => v === value)
      )
      return this.colors ? res : 'neutral'
    }
  }
}
</script>
