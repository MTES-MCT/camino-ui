<template>
  <div>
    <div
      v-for="annee in activitesByYear"
      :key="annee.id"
    >
      <h2>{{ annee.id }}</h2>
      <Activite
        v-for="activite in annee.activites"
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
        let annee = annees.find(annee => annee && annee.id === activite.annee)
        if (!annee) {
          annee = {
            id: activite.annee,
            activites: []
          }
          annees.push(annee)
        }

        annee.activites.push(activite)
        return annees
      }, [])
    }
  }
}
</script>
