<template>
  <Loader v-if="!loaded" />
  <Card
    v-else
  >
    <div class="flex">
      <h1>Demarches</h1>
    </div>

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-2 flex">
        <div class="py-m">
          {{ demarches.length }} résultat{{ demarches.length > 1 ? 's' : '' }}
        </div>
      </div>
    </div>

    <div class="card-border" />

    <DemarchesTable
      :demarches="demarches"
    />
  </Card>
</template>

<script>
import Card from './_ui/card.vue'
import Loader from './_ui/loader.vue'
import DemarchesTable from './demarches/table.vue'

export default {
  name: 'Demarches',

  components: {
    Loader,
    Card,
    DemarchesTable
  },

  computed: {
    demarches() {
      return this.$store.state.demarches.list
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.demarches
    },

    userLoaded() {
      return this.$store.state.user.loaded
    }
  },

  watch: {
    user: 'get',

    userLoaded: 'get'
  },

  created() {
    if (this.userLoaded) {
      this.get()
    }
  },

  methods: {
    async get() {
      await this.$store.dispatch('demarches/get')
    }
  }
}
</script>
