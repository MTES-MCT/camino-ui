<template>
  <button class="btn-border pill pl pr-m py-s h5 flex" @click="download">
    <span class="mt-xxs mr-xs">{{ type }}</span>
    <i class="icon-24 icon-download" />
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'file'
    },
    type: {
      type: String,
      default: 'txt'
    },
    contentBuild: {
      type: Function,
      default: () => ''
    }
  },

  methods: {
    download() {
      const link = document.createElement('a')
      const content = this.contentBuild()
      const name = this.fileNameCreate(this.name, this.type)

      const blob = new Blob([content], { type: 'octet/stream' })
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', name)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // track dans Matomo
      this.trackMatomo(name)

      this.$store.dispatch('messageAdd', {
        value: `fichier ${name} téléchargé`,
        type: 'success'
      })
    },

    fileNameCreate(name, type) {
      const d = new Date()
      const dd = d
        .getDate()
        .toString()
        .padStart(2, '0')
      const mm = (d.getMonth() + 1).toString().padStart(2, '0')
      const yyyy = d.getFullYear()
      const hh = d
        .getHours()
        .toString()
        .padStart(2, '0')
      const mi = d
        .getMinutes()
        .toString()
        .padStart(2, '0')
      return `${yyyy}${mm}${dd}-${hh}h${mi}-camino-${name}.${type}`
    },

    trackMatomo(name) {
      if (this.$matomo) {
        this.$matomo.trackLink(`http://${name}`, 'download')
      }
    }
  }
}
</script>
