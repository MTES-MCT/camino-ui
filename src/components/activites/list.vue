<template>
  <div>
    <div class="line-neutral mb-xxl" />
    <div
      v-for="annee in activitesByYear"
      :key="annee.id"
    >
      <h2>{{ annee.id }}</h2>
      <ActiviteDetail
        v-for="activite in annee.activites"
        :key="activite.id"
        :activite="activite"
        context="titre"
        class="mb-s"
      />
      <div class="line my-xxl" />
    </div>
  </div>
</template>

<script>
import ActiviteDetail from '../activite/detail.vue'

export default {
  components: {
    ActiviteDetail
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
