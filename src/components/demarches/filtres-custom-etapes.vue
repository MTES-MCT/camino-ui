<template>
  <div class="mb">
    <h6>{{ filter.name }}</h6>

    <div
      v-for="(value, i) in values"
      :key="i"
    >
      <select
        class="p-s mr-s mb-s"
        @change="typeUpdate(i, $event)"
      >
        <option :value="null">
          –
        </option>
        <option
          v-for="type in filter.elements"
          :key="type.id"
          :value="type.id"
        >
          {{ type.nom }}
        </option>
      </select>
      <select
        v-if="typeId"
        class="p-s mr-s mb-s cap-first"
        @change="statutUpdate(i, $event)"
      >
        <option :value="null">
          –
        </option>
        <option
          v-for="statut in statuts"
          :key="statut.id"
          :value="statut.id"
        >
          {{ statut.nom }}
        </option>
      </select>
    </div>
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
    statuts() {
      const type = this.typeId
        ? this.filter.elements.find(type => type.id === this.typeId)
        : []

      return type.etapesStatuts
    },

    values() {
      return []
      // return this.filter.value ? this.filter.value.split(',') : []
    }
  },

  methods: {
    typeUpdate(i, e) {
      if (!this.values[i]) {
        this.values[i] = {
          typeId: e.target.value
        }
      }
    },

    statutUpdate(i, e) {
      this.values[i].statutId = e.target.value
    }
  }
}
</script>
