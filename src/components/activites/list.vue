<template>
  <div>
    <div v-for="annee in activitesByYear" :key="annee.id">
      <h2>{{ annee.id }}</h2>
      <Preview
        v-for="activite in annee.activites"
        :key="activite.id"
        :activite="activite"
        :context="{ name: 'titre', id: titreId }"
        class="mb-s"
      />
      <div class="line width-full my-xxl" />
    </div>
  </div>
</template>

<script>
import Preview from '../activite/preview.vue'

export default {
  components: { Preview },

  props: {
    activites: { type: Array, default: () => [] },
    titreId: { type: String, required: true }
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
