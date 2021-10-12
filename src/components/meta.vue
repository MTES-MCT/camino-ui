<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <router-link :to="{ name: 'metas' }">
      <h5>Métas</h5>
    </router-link>
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
                <!--                FIXME bouger ça dans MetaInput-->
                <select
                  v-if="colonne.type === 'entities'"
                  v-model="elementNew[colonne.id]"
                  class="py-xs px-s mb-s"
                >
                  <option
                    v-for="entity in entitiesGet(colonne)"
                    :key="entity.id"
                    :value="entity.id"
                  >
                    {{ entityLabelGet(colonne, entity) }}
                  </option>
                </select>
                <MetaInput v-else v-model:element="element" :colonne="colonne">
                </MetaInput>
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
                <template v-if="definition.update">
                  <div v-if="colonne.type === 'entities'">
                    {{ entityIdLabelGet(colonne, element[colonne.id]) }}
                  </div>
                  <MetaLabelOrInput
                    v-else
                    :colonne="colonne"
                    :element="element"
                    @update="update"
                  >
                  </MetaLabelOrInput>
                </template>
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
import metasIndex from '../store/metas-definitions'
import MetaLabelOrInput from './metas/meta-label-or-input.vue'
import MetaInput from './metas/meta-input.vue'

export default {
  components: {
    Loader,
    MetaLabelOrInput,
    MetaInput
  },

  data() {
    return {
      elementNew: {}
    }
  },

  computed: {
    id() {
      return this.$route.params.id
    },

    elements() {
      return this.$store.getters['meta/elements'](this.id)
    },

    definition() {
      return metasIndex[this.id]
    },

    entities() {
      return this.$store.state.meta.elementsIndex
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
        await this.$store.dispatch('meta/get', this.id)
      }
    },

    async update(content, element, colonneId) {
      await this.$store.dispatch('meta/update', {
        id: this.id,
        partialElement: { [colonneId]: content },
        element
      })
    },

    async create() {
      await this.$store
        .dispatch('meta/create', {
          id: this.id,
          element: this.elementNew
        })
        .then(_ => {
          this.elementNew = {}
        })
    },

    async remove(element) {
      await this.$store.dispatch('meta/delete', {
        id: this.id,
        element
      })
    },

    elementKeyFind(element) {
      if (!this.definition.ids) return element.id

      return this.definition.ids.map(id => element[id]).join('-')
    },

    entitiesGet(colonne) {
      return this.entities[colonne.entities]
    },

    entityIdLabelGet(colonne, entityId) {
      const entity = this.entities[colonne.entities]?.find(
        ({ id }) => entityId === id
      )
      return this.entityLabelGet(colonne, entity)
    },

    entityLabelGet(colonne, entity) {
      return entity ? metasIndex[colonne.entities].labelGet(entity) : ''
    }
  }
}
</script>
