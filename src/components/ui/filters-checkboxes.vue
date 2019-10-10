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
            :checked="filter.values.includes(element.id)"
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

  methods: {
    checkboxToggle(e) {
      const idsSet = (value, values) => {
        const index = values.indexOf(value)

        // si la checkbox était false
        if (index > -1) {
          values.splice(index, 1)
        } // sinon ajoute la checkbox
        else {
          values.push(value)
        }

        return values
      }

      this.filter.values = idsSet(e.target.value, this.filter.values)
    },

    checkboxesSelect(action) {
      if (action === 'none') {
        this.filter.values = []
      }

      if (action === 'all') {
        this.filter.values = this.filter.elements.map(({ id }) => id)
      }

      if (action === 'inverse') {
        this.filter.values = this.filter.elements.reduce((ids, { id }) => {
          if (!this.filter.values.includes(id)) {
            ids.push(id)
          }

          return ids
        }, [])
      }
    }
  }
}
</script>
