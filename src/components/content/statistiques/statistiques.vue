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
    <TbGuyane v-if="tabActive === 'tbGuyane'" />
  </div>
</template>

<script>
import StatistiquesGlobales from './statistiquesGlobales.vue'
import TbGuyane from './tableauBordGuyane.vue'

export default {
  name: 'Statistiques',

  components: { StatistiquesGlobales, TbGuyane },

  data() {
    return {
      tabActive: 'globales',
      tabs: [
        { id: 'globales', nom: 'Statistiques' },
        { id: 'tbGuyane', nom: 'Taleau de bord - Guyane' }
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
