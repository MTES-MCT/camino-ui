<template>
  <button
    class="btn-border pill px-m py-s h5 flex"
    @click="download"
  >
    <span class="mt-xxs mr-xs">csv</span> <i class="icon-24 icon-download" />
  </button>
</template>

<script>
// import { parse } from 'json2csv'

export default {
  props: {
    titre: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    download() {
        console.log(this.titre)
    //   const titre = this.titresFormat(this.titre)
    //   const csv = parse(titre, {})
    //   const name = (() => {
    //     const d = new Date()
    //     const dd = d.getDate()
    //     const mm = d.getMonth() + 1
    //     const yyyy = d.getFullYear()
    //     const hh = d.getHours()
    //     const mi = d.getMinutes()
    //     return `${yyyy}${mm}${dd}-${hh}-${mi}-camino-export.csv`
    //   })()

    //   const link = document.createElement('a')
    //   const data = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
    //   link.setAttribute('href', data)
    //   link.setAttribute('download', name)
    //   link.style.display = 'none'
    //   document.body.appendChild(link)
    //   link.click()
    //   document.body.removeChild(link)

    //   this.$store.dispatch('messageAdd', {
    //     value: `fichier ${name} téléchargé`,
    //     type: 'success'
    //   })
    },

    titresFormat(titre) {
        return titre
    }
  }
}
</script>
