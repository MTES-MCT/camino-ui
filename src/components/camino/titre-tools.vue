<template>
  <div class="sticky-bottom">
    <ul class="list-inline mb-0">
      <li>
        <button class="btn-alt p-s">Signaler une erreur</button>
      </li>
      <li>
        <button class="btn-alt p-s">Télécharger ({{ total }})</button>
      </li>
      <li>
        <button class="btn-alt p-s">Imprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/ui/card.vue'

export default {
  components: {
    Card
  },
  computed: {
    documentsSelected () {
      return this.$store.state.titre.documents.length
    },
    documentsTotal () {
      return this.$store.getters['titre/documentsTotal']
    },
    total () {
      return this.documentsSelected > 0 ? `${this.documentsSelected} / ${this.documentsTotal}` : this.documentsTotal
    }
  }

}
</script>
