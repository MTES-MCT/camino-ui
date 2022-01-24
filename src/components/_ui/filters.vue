<template>
  <Accordion
    ref="accordion"
    :opened="opened"
    :slot-sub="!!labels.length"
    :slot-default="true"
    class="mb-s"
    @toggle="toggle"
  >
    <template #title>
      {{ title }}
    </template>

    <template v-if="labels.length" #sub>
      <div class="flex" :class="{ 'border-b-s': opened }">
        <div class="px-m pt-m pb-s">
          <span
            v-for="label in labels"
            :key="`${label.id}-${label.valueName}`"
            class="rnd-m box btn-flash h6 pl-s pr-xs py-xs bold mr-xs mb-xs"
            @click="labelRemove(label)"
            >{{ label.name }} : {{ label.valueName || label.value }}
            <span class="inline-block align-y-top ml-xs"
              ><i class="icon-16 icon-x" /></span
          ></span>
        </div>
        <button class="flex-right btn-alt p-m" @click="labelsReset">
          <i class="icon-24 icon-close" />
        </button>
      </div>
    </template>

    <div v-if="opened" class="px-m">
      <div class="tablet-blobs mt">
        <div v-if="inputs.length" class="tablet-blob-1-2 large-blob-1-3">
          <template v-for="input in inputs" :key="input.id">
            <FiltersInputAutocomplete
              v-if="['substances', 'entreprises'].includes(input.id)"
              :filter="input"
              @opened="selectOpened = $event"
            />
            <FiltersInput v-else :filter="input" />
          </template>
          <button
            class="btn-border small px-s p-xs rnd-xs mb"
            @click="inputsErase"
          >
            Tout effacer
          </button>
        </div>

        <FiltersCheckboxes
          v-for="filter in checkboxes"
          :key="filter.id"
          :filter="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />

        <FiltersSelects
          v-for="filter in selects"
          :key="filter.id"
          :filter="filter"
          class="tablet-blob-1-2 large-blob-1-3"
        />

        <component
          :is="filter.component"
          v-for="filter in customs"
          :key="filter.id"
          :filter="filter"
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
import FiltersInputAutocomplete from './filters-input-autocomplete.vue'

export default {
  components: {
    Accordion,
    FiltersInput,
    FiltersCheckboxes,
    FiltersSelects,
    FiltersInputAutocomplete
  },

  props: {
    filters: { type: Array, default: () => [] },
    title: { type: String, default: 'Filters' },
    button: { type: String, default: 'Ok' },
    opened: { type: Boolean, default: false }
  },

  emits: ['toggle', 'validate'],

  data: () => ({ selectOpened: false }),

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

    labels() {
      return this.filters.reduce((acc, f) => {
        let labels = []

        if (
          (f.type === 'checkboxes' || f.type === 'select') &&
          f.value.length
        ) {
          labels = f.value.map(v => {
            const element = f.elements.find(e => e.id === v)

            return {
              id: f.id,
              name: f.name,
              value: v,
              valueName: element && element.nom
            }
          })
        } else if (f.type === 'input' && f.value) {
          labels = [{ id: f.id, name: f.name, value: f.value }]
        } else if (
          f.type === 'custom' &&
          f.value &&
          f.value.length &&
          f.labelFormat
        ) {
          labels = f.labelFormat(f)
        }

        if (labels.length) {
          acc = acc.concat(labels)
        }

        return acc
      }, [])
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    keyup(e) {
      if ((e.which || e.keyCode) === 13 && this.opened && !this.selectOpened) {
        this.validate()
      }
    },

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

    labelRemove(label) {
      const filter = this.filters.find(({ id }) => id === label.id)

      if (Array.isArray(filter.value)) {
        if (
          filter.type === 'checkboxes' ||
          filter.type === 'select' ||
          filter.type === 'custom'
        ) {
          const index = filter.value.indexOf(label.value)
          if (index > -1) {
            filter.value.splice(index, 1)
          }
        }
      } else {
        filter.value = ''
      }

      if (!this.opened) {
        this.validate()
      }
    },

    labelsReset() {
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
