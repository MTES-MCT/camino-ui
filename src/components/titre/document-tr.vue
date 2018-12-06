<template>
  <tr class="h5">
    <td>{{ document.nom }}</td>
    <td class="flex text-right">
      <a
        v-if="document.fichier"
        class="btn rnd-xs px-xs py-xs my--xs ml-xs"
        :href="document.fichier"
        target="_blank"
        rel="noopener noreferrer"
        alt="Fichier"
      >
        <i class="icon-24 icon-24-download" />
      </a>
      <a
        v-if="document.url"
        class="btn-alt rnd-xs p-xs my--xs ml-xs"
        :href="document.url"
        target="_blank"
        rel="noopener noreferrer"
        alt="Url"
      >
        <i class="icon-24 icon-24-link" />
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
  }
}
</script>
