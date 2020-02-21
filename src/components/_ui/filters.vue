<template>
  <Accordion
    ref="accordion"
    :sub="false"
    class="mb-s"
    @toggle="$emit('filters:toggle', $event)"
  >
    <template slot="title">
      {{ title }}
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

export default {
  components: {
    Accordion,
    FiltersInput,
    FiltersCheckboxes
  },

  props: {
    filters: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Filters'
    },
    button: {
      type: String,
      default: 'Ok'
    }
  },

  computed: {
    inputs() {
      return this.filters.filter(({ type }) => type === 'input')
    },

    checkboxes() {
      return this.filters.filter(({ type }) => type === 'checkboxes')
    }
  },

  methods: {
    inputsErase() {
      this.inputs.forEach(filters => {
        filters.values = []
      })
    },

    validate() {
      this.$emit('filters:validate')
    },

    close() {
      if (this.$refs.button) {
        this.$refs.button.focus()
      }
      this.$refs.accordion.close()
    }
  }
}
</script>
