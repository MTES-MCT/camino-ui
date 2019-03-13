<template>
  <div>
    <div
      v-for="(activitesAnnee, annee) in activitesByYear"
      :key="annee"
    >
      <div class="card-border" />
      <h2>{{ annee }}</h2>

      <Activite
        v-for="activite in activitesAnnee"
        :key="activite.id"
        :activite="activite"
      />
    </div>
  </div>
</template>

<script>
import Activite from './activite.vue'

export default {
  components: {
    Activite
  },

  props: {
    activites: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    activitesByYear() {
      return this.activites.reduce((annees, activite) => {
        annees[activite.annee] = annees[activite.annee] || []
        annees[activite.annee].push(activite)
        return annees
      }, {})
    }
  }
}
</script>
