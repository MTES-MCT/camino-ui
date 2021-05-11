<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <ul class="list-sans">
      <li v-for="element in filter.elements" :key="element.id">
        <label>
          <input
            :value="element.id"
            :checked="filter.value.includes(element.id)"
            type="checkbox"
            class="mr-s"
            @change="checkboxToggle($event)"
          />
          <component
            :is="filter.component"
            v-if="filter.component"
            :element="element"
          />
          <span v-else class="cap-first h6 bold">{{ element.nom }}</span>
        </label>
      </li>
    </ul>
    <button
      ref="button"
      class="btn-border small px-s p-xs rnd-xs mr-xs"
      @click="checkboxesSelect('none')"
    >
      Aucun
    </button>
    <button
      ref="button"
      class="btn-border small px-s p-xs rnd-xs mr-xs"
      @click="checkboxesSelect('all')"
    >
      Tous
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filter: { type: Object, default: () => ({}) }
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

        return value.sort()
      }

      const target =
        this.filter && this.filter.isNumber
          ? Number(e.target.value)
          : e.target.value

      this.filter.value = idsSet(target, this.filter.value)
    },

    checkboxesSelect(action) {
      if (action === 'none') {
        this.filter.value = []
      }

      if (action === 'all') {
        this.filter.value = this.filter.elements.map(({ id }) => id)
      }

      if (action === 'inverse') {
        this.filter.value = this.filter.elements.reduce((ids, { id }) => {
          if (!this.filter.value.includes(id)) {
            ids.push(id)
          }

          return ids
        }, [])
      }
    }
  }
}
</script>
