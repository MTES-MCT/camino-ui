<template>
  <tr class="h5">
    <td>
      <input
        :checked="selected"
        type="checkbox"
        @change="select">
    </td>
    <td>{{ document.organisme }}</td>
    <td>
      <dot
        v-if="document.acte"
        :color="'inverse'"/>
    </td>
    <td>{{ document.nom }}</td>
    <td>{{ document.date | dateFormat }}</td>
    <td class="right">
      <button class="btn h5 px-xs py-xs my--s mr-xs">
        <i class="icon-24 icon-24-view"/>
      </button>
      <button class="btn h5 px-xs py-xs my--s">
        <i class="icon-24 icon-24-download"/>
      </button>
    </td>
  </tr>
</template>

<script>
import Dot from '@/components/ui/Dot.vue'

export default {
  components: {
    Dot
  },

  props: {
    document: {
      type: Object,
      default: () => { }
    }
  },

  computed: {
    selected () {
      return this.$store.getters['title/documentSelected'](this.document.id)
    }
  },

  methods: {
    select (e) {
      this.$store.dispatch('title/documentSelect', { documentId: this.document.id, selected: e.target.checked })
    }
  }
}
</script>
