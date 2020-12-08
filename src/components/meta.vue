<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Métas</h6>
    <h1>
      {{ definition.nom }}
    </h1>

    <div class="line-neutral" />

    <div class="mb-xxl">
      <table>
        <tr>
          <th v-for="colonne in definition.colonnes" :key="colonne.id">
            {{ colonne.nom }}
          </th>
        </tr>

        <tr v-for="element in elements" :key="element.id">
          <td v-for="colonne in definition.colonnes" :key="colonne.id">
            <EditOrder
              v-if="colonne.type === 'order'"
              :order="element[colonne.id]"
              @update="update($event, element.id, colonne.id)"
            />
            <EditText
              v-else-if="colonne.type === 'text'"
              :text="element[colonne.id]"
              @update="update($event, element.id, colonne.id)"
            />
            <div v-else>{{ element[colonne.id] }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import EditText from './_ui/edit-ext.vue'
import EditOrder from './_ui/edit-order.vue'

export default {
  components: { Loader, EditText, EditOrder },

  computed: {
    elements() {
      return this.$store.state.meta.elements
    },
    definition() {
      return this.$store.state.meta.definition
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.elements
    }
  },

  watch: {
    $route: 'get',

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeDestroy() {
    this.$store.commit('meta/reset')
  },

  methods: {
    async get() {
      // if (!this.user || !this.user.sections || !this.user.sections.metas) {
      //   await this.$store.dispatch('pageError')
      // } else {
      await this.$store.dispatch('meta/get', this.$route.params.id)
      // }
    },

    async update(content, elementId, colonneId) {
      console.log(content, elementId, colonneId)
      await this.$store.dispatch('meta/update', {
        id: this.$route.params.id,
        element: { id: elementId, [colonneId]: content }
      })
    },

    focus(e) {
      console.log(e)
    }
  }
}
</script>
