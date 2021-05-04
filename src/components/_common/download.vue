<template>
  <button @click="download">
    <span class="mt-xxs">{{ format }}</span>
    <div class="flex flex-right">
      <i class="icon-24 icon-download" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    section: { type: String, required: true },

    format: { type: String, required: true },

    query: { type: Object, default: () => ({}) }
  },

  emits: ['clicked'],

  computed: {
    params() {
      return { format: this.format, ...this.query }
    }
  },

  methods: {
    async download() {
      this.$emit('clicked')
      const params = new URLSearchParams(this.params).toString()

      const name = await this.$store.dispatch(
        'download',
        `${this.section}?${params}`
      )

      this.linkTrack(name)
    },

    linkTrack(name) {
      if (this.$matomo) {
        let protocol = location.protocol
        if (protocol.slice(-1) !== ':') {
          protocol += ':'
        }

        this.$matomo.trackLink(`${protocol}//${name}`, 'download')
      }
    }
  }
}
</script>
