<template>
  <tr class="h5">
    <td>{{ document.nom }}</td>
    <td class="flex">
      <a 
        v-if="document.fichier" 
        class="btn h5 px-xs py-xs my--xs mr-xs" 
        :href="document.fichier"
        target="_blank"
        alt="Fichier"
      >
        <i class="icon-24 icon-24-download" />
      </a>
      <a 
        v-if="document.url" 
        class="btn h5 px-xs py-xs my--xs mr-xs" 
        :href="document.url"
        target="_blank"
        alt="Url"
      >
        <i class="icon-24 icon-24-view" />
      </a>
      <a 
        v-if="document.uri" 
        class="btn h5 px-xs py-xs my--xs mr-xs" 
        :href="document.uri"
        target="_blank"
        alt="Uri"
      >
        <i class="icon-24 icon-24-view" />
      </a>
    </td>
  </tr>
</template>

<script>
import Dot from '../ui/dot.vue'

export default {
  components: {
    Dot
  },

  props: {
    document: {
      type: Object,
      default: () => { }
    }
  }
}
</script>
