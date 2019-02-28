<template>
  <div class="sticky-bottom">
    <ul class="list-inline mb-0">
      <OutilsErreurLi />
      <OutilsActivitesRapportLi />
      <li class="mr-s hide">
        <button class="btn-alt rnd-xs p-s">
          Télécharger ({{ total }})
        </button>
      </li>
      <li class="mr-s hide">
        <button class="btn-alt rnd-xs p-s">
          Imprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import OutilsErreurLi from './outils-erreur-li.vue'
import OutilsActivitesRapportLi from './outils-activites-rapport-li.vue'

export default {
  components: {
    OutilsActivitesRapportLi,
    OutilsErreurLi
  },

  computed: {
    documentsSelected() {
      return this.$store.state.titre.documents.length
    },
    documentsTotal() {
      return this.$store.getters['titre/documentsTotal']
    },
    total() {
      return this.documentsSelected > 0
        ? `${this.documentsSelected} / ${this.documentsTotal}`
        : this.documentsTotal
    }
  }
}
</script>
