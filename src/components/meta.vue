<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>Métas</h6>
    <h1>
      {{ definition.nom }}
    </h1>

    <div class="line-neutral" />

    <div class="mb-xxl width-max">
      <div>
        <div class="overflow-scroll-x mb">
          <table>
            <tr>
              <th
                v-for="colonne in definition.colonnes"
                :key="colonne.id"
                :class="colonne.class"
              >
                {{ colonne.nom }}
              </th>
            </tr>

            <tr v-for="element in elements" :key="element.id">
              <td v-for="colonne in definition.colonnes" :key="colonne.id">
                <EditNumber
                  v-if="colonne.type === Number"
                  :value="element[colonne.id]"
                  @update="update($event, element.id, colonne.id)"
                />
                <EditDate
                  v-else-if="colonne.type === Date"
                  :value="element[colonne.id] || ''"
                  @update="update($event, element.id, colonne.id)"
                />
                <EditBoolean
                  v-else-if="colonne.type === Boolean"
                  :value="element[colonne.id] || false"
                  @update="update($event, element.id, colonne.id)"
                />
                <EditArray
                  v-else-if="colonne.type === Array"
                  :value="element[colonne.id] || ''"
                  :elements="colonne.elements"
                  @update="update($event, element.id, colonne.id)"
                />
                <EditString
                  v-else-if="colonne.type === 'json'"
                  :value="
                    element[colonne.id]
                      ? JSON.stringify(element[colonne.id])
                      : ''
                  "
                  @update="update(JSON.parse($event), element.id, colonne.id)"
                />
                <EditString
                  v-else-if="colonne.type === String"
                  :value="element[colonne.id] || ''"
                  @update="update($event, element.id, colonne.id)"
                />
                <div v-else>{{ element[colonne.id] }}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import EditString from './_ui/edit-string.vue'
import EditNumber from './_ui/edit-number.vue'
import EditArray from './_ui/edit-array.vue'
import EditBoolean from './_ui/edit-boolean.vue'
import EditDate from './_ui/edit-date.vue'

export default {
  components: {
    Loader,
    EditString,
    EditNumber,
    EditArray,
    EditBoolean,
    EditDate
  },

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
