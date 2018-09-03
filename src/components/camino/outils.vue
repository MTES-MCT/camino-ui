<template>
  <div class="sticky-bottom">
    <ul class="list-inline mb-0">
      <li>
        <button 
          class="btn-alt p-s" 
          @click="emailSend"
        >Signaler une erreur</button>
      </li>
      <li>
        <button class="btn-alt p-s hide">Télécharger ({{ total }})</button>
      </li>
      <li>
        <button class="btn-alt p-s hide">Imprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '../ui/card.vue'

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
  },

  methods: {
    emailSend () {
      window.location.href = `mailto:camino@beta.gouv.fr?subject=Erreur ${this.$route.params.id}&body=Bonjour, j'ai repéré une erreur sur le titre ${this.$route.params.id} : `
    }
  }
}
</script>
