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
              <td v-if="definition.delete || definition.create">
                <button class="btn p-xs rnd-xs" @click="remove(element.id)">
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
    InputDate
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
      return this.$store.state.user.current
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
      await this.$store.dispatch('meta/update', {
        id: this.$route.params.id,
        element: { id: elementId, [colonneId]: content }
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

    async remove(elementId) {
      await this.$store.dispatch('meta/delete', {
        id: this.$route.params.id,
        elementId
      })
    },

    focus(e) {
      console.log(e)
    }
  }
}
</script>
