<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h5>Métas</h5>
    <h1>
      <span class="cap-first">{{ definition.nom }}</span>
    </h1>

    <div class="line-neutral width-full" />

    <div class="mb-xxl width-full-p">
      <div>
        <div class="overflow-scroll-x mb">
          <table>
            <tr>
              <th
                v-for="colonne in definition.colonnes"
                :key="colonne.id"
                class="min-width-5"
                :class="colonne.class"
              >
                {{ colonne.nom }}
              </th>
              <th v-if="definition.delete || definition.create" />
            </tr>

            <tr v-if="definition.create">
              <td
                v-for="colonne in definition.colonnes"
                :key="colonne.id"
                :class="colonne.class"
              >
                <input
                  v-if="colonne.type === Number"
                  v-model.number="elementNew[colonne.id]"
                  type="number"
                  class="px-s py-xs mb-s text-right"
                  min="1"
                />
                <InputDate
                  v-else-if="colonne.type === Date"
                  v-model="elementNew[colonne.id]"
                  class="mb-s"
                  :padding="'px-s py-xs'"
                />
                <input
                  v-else-if="colonne.type === Boolean"
                  v-model="elementNew[colonne.id]"
                  type="checkbox"
                  class="px-s py-xs mb-s"
                />
                <select
                  v-else-if="colonne.type === Array"
                  v-model="elementNew[colonne.id]"
                  class="py-xs px-s mb-s"
                >
                  <option
                    v-for="element in colonne.elements"
                    :key="element"
                    :value="element"
                  >
                    {{ element }}
                  </option>
                </select>
                <textarea
                  v-else-if="colonne.type === String || colonne.type === 'json'"
                  v-model="elementNew[colonne.id]"
                  rows="1"
                  class="px-s py-xs mb-s"
                />
                <input
                  v-else
                  v-model="elementNew[colonne.id]"
                  type="text"
                  class="px-s py-xs mb-s"
                />
              </td>
              <td>
                <button
                  class="btn p-xs rnd-xs"
                  :disabled="!elementNewComplete"
                  @click="create"
                >
                  <i class="icon-24 icon-plus" />
                </button>
              </td>
            </tr>

            <tr v-for="element in elements" :key="elementKeyFind(element)">
              <td v-for="colonne in definition.colonnes" :key="colonne.id">
                <EditNumber
                  v-if="definition.update && colonne.type === Number"
                  :value="element[colonne.id]"
                  @update="update($event, element, colonne.id)"
                />
                <EditDate
                  v-else-if="definition.update && colonne.type === Date"
                  :value="element[colonne.id] || ''"
                  @update="update($event, element, colonne.id)"
                />
                <EditBoolean
                  v-else-if="definition.update && colonne.type === Boolean"
                  :value="element[colonne.id] || false"
                  @update="update($event, element, colonne.id)"
                />
                <EditArray
                  v-else-if="definition.update && colonne.type === Array"
                  :value="element[colonne.id] || ''"
                  :elements="colonne.elements"
                  @update="update($event, element, colonne.id)"
                />
                <EditJson
                  v-else-if="definition.update && colonne.type === 'json'"
                  :value="element[colonne.id]"
                  @update="update($event, element, colonne.id)"
                />
                <EditString
                  v-else-if="definition.update && colonne.type === String"
                  :value="element[colonne.id] || ''"
                  @update="update($event, element, colonne.id)"
                />
                <div v-else>{{ element[colonne.id] }}</div>
              </td>
              <td v-if="definition.delete || definition.create">
                <button
                  v-if="definition.delete"
                  class="btn p-xs rnd-xs"
                  @click="remove(element)"
                >
                  <i class="icon-24 icon-minus" />
                </button>
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
import EditJson from './_ui/edit-json.vue'
import EditNumber from './_ui/edit-number.vue'
import EditArray from './_ui/edit-array.vue'
import EditBoolean from './_ui/edit-boolean.vue'
import EditDate from './_ui/edit-date.vue'
import InputDate from './_ui/input-date.vue'

export default {
  components: {
    Loader,
    EditString,
    EditNumber,
    EditArray,
    EditBoolean,
    EditDate,
    InputDate,
    EditJson
  },

  data() {
    return {
      elementNew: {}
    }
  },

  computed: {
    elements() {
      return this.$store.state.meta.elements
    },

    definition() {
      return this.$store.state.meta.definition
    },

    user() {
      return this.$store.state.user.element
    },

    loaded() {
      return !!this.elements
    },

    elementNewComplete() {
      return this.definition.colonnes.reduce((acc, c) => {
        return acc && (!!this.elementNew[c.id] || c.optional)
      }, true)
    }
  },

  watch: {
    '$route.params.id': function (id) {
      if (this.$route.name === 'meta' && id) {
        this.get()
      }
    },

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeUnmount() {
    this.$store.commit('meta/reset')
  },

  methods: {
    async get() {
      if (!this.user || !this.user.sections || !this.user.sections.metas) {
        await this.$store.dispatch('pageError')
      } else {
        await this.$store.dispatch('meta/get', this.$route.params.id)
      }
    },

    async update(content, element, colonneId) {
      await this.$store.dispatch('meta/update', {
        id: this.$route.params.id,
        element: { [colonneId]: content, ...this.idsFind(element) }
      })
    },

    async create() {
      await this.$store
        .dispatch('meta/create', {
          id: this.$route.params.id,
          element: this.elementNew
        })
        .then(_ => {
          this.elementNew = {}
        })
    },

    async remove(element) {
      await this.$store.dispatch('meta/delete', {
        id: this.$route.params.id,
        element: this.idsFind(element)
      })
    },

    idsFind(element) {
      return this.definition.ids
        ? this.definition.ids.reduce((ids, id) => {
            ids[id] = element[id]

            return ids
          }, {})
        : { id: element.id }
    },

    elementKeyFind(element) {
      if (!this.definition.ids) return element.id

      return this.definition.ids.map(id => element[id]).join('-')
    }
  }
}
</script>
