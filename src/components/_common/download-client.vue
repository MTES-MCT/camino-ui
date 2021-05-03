<template>
  <button class="btn-border small pill pl pr-m py-s flex" @click="download">
    <span class="mt-xxs mr-xs">{{ format }}</span>
    <i class="icon-24 icon-download" />
  </button>
</template>

<script>
export default {
  props: {
    name: { type: String, default: 'file' },

    section: {
      type: String,
      required: true
    },

    format: { type: String, default: 'txt' }
  },

  computed: {
    params() {
      return { format: this.format, id: this.name }
    }
  },

  methods: {
    async download() {
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
