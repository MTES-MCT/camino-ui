<template>
  <div>
    <div class="tablet-blobs">
      <div
        v-if="element.nom"
        class="tablet-blob-1-3 tablet-pt-s pb-s"
      >
        <h6>{{ element.nom }}</h6>
      </div>

      <div
        class="mb"
        :class="{'tablet-blob-2-3': element.nom, 'tablet-blob-1': !element.nom }"
      >
        <div
          v-if="editable"
        >
          <div :class="{ 'mb-s': element.description}">
            <input
              v-if="element.type === 'number'"
              v-model.number="contenu[element.id]"
              type="number"
              min="0"
              class="p-s"
              placeholder="…"
            >

            <input
              v-else-if="element.type === 'checkbox'"
              v-model.number="contenu[element.id]"
              type="checkbox"
              class="p-s mt-s mb-s"
            >

            <div
              v-else-if="element.type === 'checkboxes'"
            >
              <label
                v-for="(valueName, valueId) in element.valeurs"
                :key="valueId"
              >
                <input
                  v-model="contenu[element.id]"
                  type="checkbox"
                  :value="valueId"
                >{{ valueName }}
              </label>
            </div>

            <input
              v-else-if="element.type === 'date'"
              v-model="contenu[element.id]"
              type="date"
              class="p-s"
              placeholder="aaaa-mm-jj"
            >

            <textarea
              v-else-if="element.type === 'textarea'"
              v-model="contenu[element.id]"
              class="p-s"
            />

            <input
              v-else-if="element.type === 'text'"
              v-model="contenu[element.id]"
              type="text"
              class="p-s"
            >
          </div>

          <!-- eslint-disable vue/no-v-html -->
          <p
            v-if="element.description"
            class="h5 mb-0"
            v-html="element.description"
          />
        </div>

        <p
          v-else-if="hasContenu"
          class="pt-xs"
        >
          {{ element.type === 'number'
            ? numberFormat(contenu[element.id])
            : element.type ==='checkboxes'
              ? contenu[element.id].map(id => element.valeurs[id]).join(', ')
              : contenu[element.id] }}
        </p>
        <p
          v-else-if="!element.optionnel"
          class="color-warning pt-xs"
        >
          À compléter pour valider
        </p>
      </div>
    </div>

    <hr>
  </div>
</template>

<script>
export default {
  props: {
    contenu: {
      type: Object,
      default: () => ({})
    },
    element: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    hasContenu() {
      return (
        this.contenu &&
        ((!Array.isArray(this.contenu[this.element.id]) &&
          this.contenu[this.element.id]) ||
          this.contenu[this.element.id] === 0 ||
          (Array.isArray(this.contenu[this.element.id]) &&
            this.contenu[this.element.id].length))
      )
    }
  }
}
</script>
