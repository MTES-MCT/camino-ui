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

            <div v-else-if="element.type === 'radio'">
              <label>
                <input
                  v-model="contenu[element.id]"
                  :name="element.id"
                  :value="true"
                  type="radio"
                  class="p-s mt-s mb-s"
                >Oui
              </label>

              <label>
                <input
                  v-model="contenu[element.id]"
                  :name="element.id"
                  :value="false"
                  type="radio"
                  class="p-s mt-s mb-s"
                >Non
              </label>
            </div>

            <input
              v-else-if="element.type === 'checkbox'"
              v-model="contenu[element.id]"
              type="checkbox"
              class="p-s mt-s mb-s"
            >

            <div
              v-else-if="element.type === 'checkboxes'"
            >
              <label
                v-for="value in valeurs"
                :key="value.id"
              >
                <input
                  v-model="contenu[element.id]"
                  type="checkbox"
                  :value="value.id"
                >{{ value.nom }}
              </label>
            </div>

            <div
              v-else-if="element.type === 'select'"
            >
              <select
                v-if="valeurs && valeurs.length"
                v-model="contenu[element.id]"
                class="p-s mr-s mb-s"
              >
                <option
                  v-for="value in valeurs"
                  :key="value.id"
                  :value="value.id"
                >
                  {{ value.nom }}
                </option>
              </select>
            </div>
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
          (this.contenu[this.element.id] !== undefined)) ||
          (Array.isArray(this.contenu[this.element.id]) &&
            this.contenu[this.element.id].length))
      )
    },

    valeurs() {
      return this.element.valeurs
    }
  },

  created() {
    // si l'élément est un bouton radio
    // et que le contenu pour cet élément est vide
    // alors on met la valeur par défaut `false`
    if (
      this.contenu &&
      this.element.type === 'radio' &&
      this.contenu[this.element.id] === undefined
    ) {
      this.contenu[this.element.id] = false
    }
  }
}
</script>
