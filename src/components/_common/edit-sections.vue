<template>
  <div>
    <div
      v-for="s in sectionFiltered"
      :key="s.id"
    >
      <h3 v-if="s.nom">
        {{ s.nom }}
      </h3>
      <div
        v-for="e in s.elements"
        :key="e.id"
      >
        <div class="tablet-blobs">
          <div
            v-if="e.nom"
            class="tablet-blob-1-3 tablet-pt-s pb-s"
          >
            <h6>{{ e.nom }}</h6>
          </div>
          <div
            class="mb"
            :class="{'tablet-blob-2-3': e.nom, 'tablet-blob-1': !e.nom }"
          >
            <div
              v-if="editable"
            >
              <div :class="{ 'mb-s': e.description}">
                <input
                  v-if="e.type === 'number'"
                  v-model.number="contenu[s.id][e.id]"
                  type="number"
                  min="0"
                  class="p-s"
                  placeholder="…"
                >

                <input
                  v-else-if="e.type === 'checkbox'"
                  v-model.number="contenu[s.id][e.id]"
                  type="checkbox"
                  class="p-s mt-s mb-s"
                >

                <div
                  v-else-if="e.type === 'checkboxes'"
                >
                  <label
                    v-for="(valueName, valueId) in e.valeurs"
                    :key="valueId"
                  >
                    <input
                      v-model="contenu[s.id][e.id]"
                      type="checkbox"
                      :value="valueId"
                    >{{ valueName }}
                  </label>
                </div>

                <input
                  v-else-if="e.type === 'date'"
                  v-model="contenu[s.id][e.id]"
                  type="date"
                  class="p-s"
                  placeholder="aaaa-mm-jj"
                >

                <textarea
                  v-else-if="e.type === 'textarea'"
                  v-model="contenu[s.id][e.id]"
                  class="p-s"
                />

                <input
                  v-else-if="e.type === 'text'"
                  v-model="contenu[s.id][e.id]"
                  type="text"
                  class="p-s"
                >
              </div>

              <!-- eslint-disable vue/no-v-html -->
              <p
                v-if="e.description"
                class="h5 mb-0"
                v-html="e.description"
              />
            </div>

            <p
              v-else-if="contenu[s.id] && (!Array.isArray(contenu[s.id][e.id]) && contenu[s.id][e.id] || contenu[s.id][e.id] === 0 || Array.isArray(contenu[s.id][e.id]) && contenu[s.id][e.id].length)"
              class="pt-xs"
            >
              {{ e.type === 'number'
                ? numberFormat(contenu[s.id][e.id])
                : e.type ==='checkboxes'
                  ? contenu[s.id][e.id].map(id => e.valeurs[id]).join(', ')
                  : contenu[s.id][e.id] }}
            </p>
            <p
              v-else-if="!e.optionnel"
              class="color-warning pt-xs"
            >
              À compléter pour valider
            </p>
          </div>
        </div>

        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    contenu: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    // masque les sections vides lors de la prévisualistation
    sectionFiltered() {
      return this.sections.filter(
        s =>
          this.editable ||
          s.elements.some(e => {
            const contenu = this.contenu[s.id][e.id]
            return (!!contenu || contenu === 0) && !e.optionnel
          })
      )
    }
  }
}
</script>

