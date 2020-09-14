<template>
  <div>
    <div class="desktop-blobs">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="mr-xs"
        :class="{ active: tabActive !== tab.id }"
      >
        <div
          class="btn-menu text-decoration-none bold"
          @click="tabToggle(tab.id)"
        >
          <h1 class="mb-xl mr-xl">
            {{ tab.nom }}
          </h1>
        </div>
      </div>
    </div>
    <StatistiquesGlobales v-if="tabActive === 'globales'" />
    <StatistiquesGuyane v-if="tabActive === 'guyane'" />
  </div>
</template>

<script>
import StatistiquesGlobales from './statistiques-globales.vue'
import StatistiquesGuyane from './tableau-bord-guyane.vue'

export default {
  name: 'Statistiques',

  components: { StatistiquesGlobales, StatistiquesGuyane },

  data() {
    return {
      tabActive: 'globales',
      tabs: [
        { id: 'globales', nom: 'Statistiques' },
        { id: 'guyane', nom: 'Taleau de bord - Guyane' }
      ]
    }
  },

  computed: {
    statistiques() {
      return this.$store.state.statistiques
    }
  },

  created() {
    this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get')
    },

    tabToggle(tabId) {
      this.tabActive = tabId
    }
  }
}
</script>
