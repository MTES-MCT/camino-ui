<template>
  <Accordion
    ref="accordion"
    :opened="opened"
    :sub="false"
    class="mb-s"
    @toggle="toggle"
  >
    <template slot="title">
      {{ title }}
    </template>

    <template
      v-if="values.length"
      slot="sub"
    >
      <div
        class="p-m flex flex-start"
        :class="{ 'border-b-s': opened }"
      >
        <div>
          <span
            v-for="v in values"
            :key="`${v.id}-${v.nom}`"
            class="rnd btn-flash h5 px-s py-xs bold mr-xs mb-xs"
            @click="filterRemove(v)"
          >{{ v.name }} : {{ v.nom || v.value }}</span>
        </div>
        <button
          class="flex-right btn-alt p-s rnd-xs"
          @click="filtersReset"
        >
          <i class="icon-24 icon-close" />
        </button>
      </div>
    </template>

    <div class="px-m">
      <div class="tablet-blobs mt">
        <div
          v-if="inputs.length"
          class="tablet-blob-1-2 large-blob-1-3"
        >
          <FiltersInput
            v-for="filter in inputs"
            :key="filter.id"
            :filter.sync="filter"
          />
          <button
            class="btn-border h5 px-s p-xs rnd-xs mb"
            @click="inputsErase"
          >
            Tout effacer
          </button>
        </div>

        <FiltersCheckboxes
          v-for="filter in checkboxes"
          :key="filter.id"
          :filter.sync="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />

        <FiltersSelects
          v-for="filter in selects"
          :key="filter.id"
          :filter.sync="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />

        <Component
          :is="filter.component"
          v-for="filter in customs"
          :key="filter.id"
          :filter.sync="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />
      </div>

      <button
        ref="button"
        class="btn-flash p-s rnd-xs full-x mb"
        @click="validate"
      >
        {{ button }}
      </button>
    </div>
  </Accordion>
</template>

<script>
import Accordion from './accordion.vue'
import FiltersInput from './filters-input.vue'
import FiltersCheckboxes from './filters-checkboxes.vue'
import FiltersSelects from './filters-selects.vue'

export default {
  components: {
    Accordion,
    FiltersInput,
    FiltersCheckboxes,
    FiltersSelects
  },

  props: {
    filters: { type: Array, default: () => [] },
    title: { type: String, default: 'Filters' },
    button: { type: String, default: 'Ok' },
    opened: { type: Boolean, default: false }
  },

  data() {
    return {
      valuesInit: []
    }
  },

  computed: {
    inputs() {
      return this.filters.filter(({ type }) => type === 'input')
    },

    checkboxes() {
      return this.filters.filter(({ type }) => type === 'checkboxes')
    },

    selects() {
      return this.filters.filter(({ type }) => type === 'select')
    },

    customs() {
      return this.filters.filter(({ type }) => type === 'custom')
    },

    values() {
      return this.filters.reduce((acc, f) => {
        if (Array.isArray(f.value) && f.value.length) {
          f.value.forEach(v => {
            acc.push({
              id: f.id,
              name: f.name,
              value: v,
              nom: f.elements.find(e => e.id === v).nom
            })
          })
        } else if (!Array.isArray(f.value) && f.value) {
          acc.push({ id: f.id, name: f.name, value: f.value })
        }

        return acc
      }, [])
    }
  },

  methods: {
    inputsErase() {
      this.inputs.forEach(filter => {
        filter.value = ''
      })
    },

    validate() {
      this.$emit('validate')
    },

    toggle() {
      this.$emit('toggle')
    },

    filterRemove(v) {
      const filter = this.filters.find(({ id }) => id === v.id)

      if (Array.isArray(filter.value)) {
        const index = filter.value.indexOf(v.value)
        if (index > -1) {
          filter.value.splice(index, 1)
        }
      } else {
        filter.value = ''
      }

      if (!this.opened) {
        this.validate()
      }
    },

    filtersReset() {
      this.filters.forEach(f => {
        if (Array.isArray(f.value)) {
          f.value = []
        } else {
          f.value = ''
        }
      })

      if (!this.opened) {
        this.validate()
      }
    }
  }
}
</script>
