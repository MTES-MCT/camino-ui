<template>
  <div class="mb">
    <h6>{{ filter.name }}</h6>
    <hr class="mb-s">

    <div
      v-for="(value, n) in filter.value"
      :key="n"
    >
      <div class="flex mb-s">
        <select
          v-model="filter.value[n]"
          class="p-s mr-s"
        >
          <option
            v-for="entreprise in filter.elements"
            :key="entreprise.id"
            :value="entreprise.id"
          >
            {{ entreprise.nom }}
          </option>
        </select>

        <button
          class="btn py-s px-m rnd-xs"
          @click="valueRemove(n)"
        >
          <i class="icon-24 icon-minus" />
        </button>
      </div>
    </div>
    <button
      v-if="!filter.value || !filter.value.some(v => v === '')"
      class="btn rnd-xs py-s px-m full-x flex mb-s h5"
      @click="valueAdd"
    >
      <span class="mt-xxs">Ajouter une entreprise</span><i class="icon-24 icon-plus flex-right" />
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
    valueAdd() {
      if (!this.filter.value) {
        this.filter.value = []
      }
      this.filter.value.push('')
    },

    valueRemove(n) {
      this.filter.value.splice(n, 1)
    }
  }
}
</script>
