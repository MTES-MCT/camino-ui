<template>
  <button
    class="btn-border pill px-m py-s h5"
    @click="download"
  >
    Télécharger (.csv)
  </button>
</template>

<script>
import { parse } from 'json2csv'
import { jsonTypenameOmit } from '../../api/_graphql-client'

export default {
  props: {
    name: {
      type: String,
      default: 'camino-download'
    },
    json: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    download() {
      const csv = parse(jsonTypenameOmit(this.json), {})

      console.log(csv)
      const link = document.createElement('a')
      const data = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
      link.setAttribute('href', data)
      link.setAttribute('download', `${this.name}.csv`)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>
