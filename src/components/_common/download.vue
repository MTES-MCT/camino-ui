<template>
  <button
    class="btn-border pl pr-m py-s h5 flex full-x flex"
    @click="download"
  >
    <span class="mt-xxs mr-xs">{{ format }}</span>
    <div class="flex flex-right">
      <i class="icon-24 icon-download" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: true
    }
  },

  computed: {
    params() {
      return { format: this.format, ...this.$route.query }
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
