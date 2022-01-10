<template>
  <button class="flex" @click="download">
    <span class="mt-xxs">{{ format }}</span>
    <div class="flex-right pl-xs">
      <i class="icon-24 icon-download" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    section: { type: String, required: true },

    format: { type: String, required: true },

    query: { type: Object, default: () => ({}) },

    params: { type: String, default: '' }
  },

  emits: ['clicked'],

  methods: {
    async download() {
      this.$emit('clicked')
      const query = new URLSearchParams({
        format: this.format,
        ...this.query
      }).toString()

      const url = this.params
        ? `/${this.section}/${this.params}?${query}`
        : `/${this.section}?${query}`

      await this.$store.dispatch('download', url)

      this.linkTrack(url)
    },

    linkTrack(url) {
      if (this.$matomo) {
        this.$matomo.trackLink(`${window.location.origin}${url}`, 'download')
      }
    }
  }
}
</script>
