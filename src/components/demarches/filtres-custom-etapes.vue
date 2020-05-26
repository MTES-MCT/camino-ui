<template>
  <div class="mb">
    <h6>{{ filter.name }}</h6>
    <hr class="mb-s">

    value:     {{ filter.value }}

    <div
      v-for="(value, n) in filter.value"
      :key="n"
    >
      <div class="flex mb-s">
        <select
          v-model="value.typeId"
          class="p-s mr-s"
          @change="valueReset(n)"
        >
          <option value="">
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

        <button
          class="btn py-s px-m rnd-xs"
          @click="valueRemove(n)"
        >
          <i class="icon-24 icon-minus" />
        </button>
      </div>
      <div v-if="value.typeId">
        <div class="blobs mb-s">
          <div class="blob-1-4">
            <h6>Statut</h6>
            <p class="h6 italic mb-0">
              Optionnel
            </p>
          </div>
          <div class="blob-3-4">
            <select
              v-model="value.statutId"
              class="p-s mr-s cap-first"
            >
              <option :value="''">
                –
              </option>
              <option
                v-for="statut in statutsFind(n)"
                :key="statut.id"
                :value="statut.id"
              >
                {{ statut.nom }}
              </option>
            </select>
          </div>
        </div>
        <div class="blobs mb-s">
          <div class="blob-1-4">
            <h6>Après le</h6>
            <p class="h6 italic mb-0">
              Optionnel
            </p>
          </div>
          <div class="blob-3-4">
            <input
              v-model="filter.value[n].dateDebut"
              type="date"
              class="p-s"
              placeholder="aaaa-mm-jj"
            >
          </div>
        </div>
        <div class="blobs mb-s">
          <div class="blob-1-4">
            <h6>Avant le</h6>
            <p class="h6 italic mb-0">
              Optionnel
            </p>
          </div>
          <div class="blob-3-4">
            <input
              v-model="filter.value[n].dateFin"
              type="date"
              class="p-s"
              placeholder="aaaa-mm-jj"
            >
          </div>
        </div>
      </div>
      <hr class="mb-s">
    </div>
    <button
      v-if="!filter.value || !filter.value.some(v => v.typeId === '')"
      class="btn rnd-xs py-s px-m full-x flex mb-s h5"
      @click="valueAdd"
    >
      <span class="mt-xxs">Ajouter un type d'étape</span><i class="icon-24 icon-plus flex-right" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filter: { type: Object, required: true }
  },

  methods: {
    statutsFind(n) {
      const typeId = this.filter.value[n].typeId
      const type = typeId
        ? this.filter.elements.find(type => type.id === typeId)
        : []

      return type.etapesStatuts
    },

    valueAdd() {
      this.filter.value.push({ typeId: '' })
    },

    valueRemove(n) {
      this.filter.value.splice(n, 1)
    },

    valueReset(n) {
      this.filter.value[n].statutId = ''
    }
  }
}
</script>
