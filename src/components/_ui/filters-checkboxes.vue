<template>
  <div class="mb">
    <h6>{{ filter.name }}</h6>

    <ul class="list-sans">
      <li
        v-for="element in filter.elements"
        :key="element.id"
      >
        <label>
          <input
            :value="element.id"
            :checked="values.includes(element.id)"
            type="checkbox"
            class="mr-s"
            @change="checkboxToggle($event)"
          >
          <component
            :is="filter.component"
            v-if="filter.component"
            :element="element"
          />
          <span
            v-else
            class="cap-first"
          >{{ element.nom }}</span>
        </label>
      </li>
    </ul>
    <button
      ref="button"
      class="btn-border h5 px-s p-xs rnd-xs mr-xs"
      @click="checkboxesSelect('none')"
    >
      Aucun
    </button>
    <button
      ref="button"
      class="btn-border h5 px-s p-xs rnd-xs mr-xs"
      @click="checkboxesSelect('all')"
    >
      Tous
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    values() {
      return this.filter.value ? this.filter.value.split(',') : []
    }
  },

  methods: {
    checkboxToggle(e) {
      const idsSet = (v, values) => {
        const index = values.indexOf(v)

        const value = values.slice()

        if (index > -1) {
          value.splice(index, 1)
        } else {
          value.push(v)
        }

        return value.join(',')
      }

      this.filter.value = idsSet(e.target.value, this.values)
    },

    checkboxesSelect(action) {
      if (action === 'none') {
        this.filter.value = ''
      }

      if (action === 'all') {
        this.filter.value = this.filter.elements.map(({ id }) => id).join(',')
      }

      if (action === 'inverse') {
        this.filter.value = this.filter.elements
          .reduce((ids, { id }) => {
            if (!this.values.includes(id)) {
              ids.push(id)
            }

            return ids
          }, [])
          .join(',')
      }
    }
  }
}
</script>
