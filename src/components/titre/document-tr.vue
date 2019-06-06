<template>
  <tr class="h5">
    <td>{{ document.nom }}</td>
    <td class="flex text-right">
      <button
        v-if="document.fichier"
        class="btn-alt rnd-xs px-xs py-xs my--xs ml-xs"
        @click="download(document.fichier)"
      >
        <i class="icon-24 icon-download" />
      </button>
      <a
        v-if="document.url"
        class="btn-alt rnd-xs p-xs my--xs ml-xs"
        :href="document.url"
        target="_blank"
        rel="noopener noreferrer"
        alt="Url"
      >
        <i class="icon-24 icon-link" />
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    async download(fileName) {
      await this.$store.dispatch('documentDownload', {
        fileName: `${fileName}.pdf`,
        titreDocumentId: this.document.id
      })
    }
  }
}
</script>
