<template>
  <button
    class="btn-border pill pl pr-m py-s h5 flex"
    @click="download"
  >
    <span class="mt-xxs mr-xs">{{ type }}</span> <i class="icon-24 icon-download" />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'csv'
    },
    content: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'file.txt'
    }
  },
  methods: {
    download() {
      const link = document.createElement('a')
      const data = `data:text/${this.type};charset=utf-8,${encodeURIComponent(
        this.content
      )}`
      link.setAttribute('href', data)
      link.setAttribute('download', this.name)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      this.$store.dispatch('messageAdd', {
        value: `fichier ${this.name} téléchargé`,
        type: 'success'
      })
    }
  }
}
</script>
