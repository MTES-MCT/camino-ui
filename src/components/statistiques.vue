<template>
  <div>
    <h1 class="mt-m">Statistiques</h1>
    <div class="flex">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="mr-xs"
        :class="{ active: tabActive === tab.id }"
      >
        <RouterLink :to="{ name: tab.name }" class="p-m btn-tab rnd-t-s">
          {{ tab.nom }}
        </RouterLink>
      </div>
    </div>
    <div class="line-neutral" />

    <Router-view v-if="tabActive" />
  </div>
</template>

<script>
export default {
  name: 'Statistiques',

  data() {
    return {
      tabs: [
        { id: 'globales', nom: 'Globales', name: 'statistiques-globales' },
        { id: 'guyane', nom: 'Guyane', name: 'statistiques-guyane' }
      ]
    }
  },

  computed: {
    tabActive() {
      if (this.$route.name === 'statistiques-globales') {
        return 'globales'
      } else if (this.$route.name === 'statistiques-guyane') {
        return 'guyane'
      } else {
        return ''
      }
    }
  },

  created() {
    if (this.$route.name === 'statistiques') {
      this.$router.replace({ name: 'statistiques-globales' })
    }
  }
}
</script>
