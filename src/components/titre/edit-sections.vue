<template>
  <div>
    <div
      v-for="s in sections"
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
            <div v-if="e.type === 'number'">
              <input
                v-if="editable"
                v-model.number="contenu[s.id][e.id]"
                type="number"
                min="0"
                class="p-s"
                :class="{ 'mb-s': e.description}"
                placeholder="…"
              >
              <p
                v-else
                :class="{'color-warning': !contenu[s.id] || !(contenu[s.id][e.id] || contenu[s.id][e.id] === 0) }"
                class="pt-xs"
              >
                {{ contenu[s.id] && (contenu[s.id][e.id] || contenu[s.id][e.id] === 0) ? numberFormat(contenu[s.id][e.id]) : 'À compléter pour valider' }}
              </p>
            </div>

            <div v-else-if="e.type === 'checkbox'">
              <input
                v-if="editable"
                v-model.number="contenu[s.id][e.id]"
                type="checkbox"
                class="p-s mt-s mb-s"
              >
              <p
                v-else
                :class="{'color-warning': !contenu[s.id] || !(contenu[s.id][e.id] || contenu[s.id][e.id] === 0) }"
                class="pt-xs"
              >
                {{ contenu[s.id] && (contenu[s.id][e.id] || contenu[s.id][e.id] === 0) ? numberFormat(contenu[s.id][e.id]) : 'À compléter pour valider' }}
              </p>
            </div>

            <div
              v-else-if="e.type === 'checkboxes'"
              class="cmn-titre-edit-sections-checkboxes"
            >
              <div v-if="editable">
                <label
                  v-for="(nom, id) in e.valeurs"
                  :key="id"
                >
                  <input
                    v-model="contenu[s.id][e.id]"
                    type="checkbox"
                    :value="id"
                  >{{ nom }}
                </label>
              </div>

              <p
                v-else
                :class="{'color-warning': !(contenu[s.id] && contenu[s.id][e.id] && Object.keys(contenu[s.id][e.id]).filter(val => contenu[s.id][e.id][val]).length)}"
                class="cap-first"
              >
                {{ contenu[s.id] && contenu[s.id][e.id] && contenu[s.id][e.id].map(id => e.valeurs[id]).join(', ') || 'À compléter pour valider' }}
              </p>
            </div>

            <div v-else-if="e.type === 'textarea'">
              <textarea
                v-if="editable"
                v-model="contenu[s.id][e.id]"
                class="p-s"
                :class="{ 'mb-s': e.description}"
              />
              <p
                v-else
                class="mb-0"
              >
                {{ contenu[s.id][e.id] }}
              </p>
            </div>

            <div v-else-if="e.type === 'text'">
              <input
                v-if="editable"
                v-model="contenu[s.id][e.id]"
                type="text"
                class="p-s"
                :class="{ 'mb-s': e.description}"
              >
              <p
                v-else
                class="mb-0"
              >
                {{ contenu[s.id][e.id] }}
              </p>
            </div>

            <!-- eslint-disable vue/no-v-html -->
            <p
              v-if="editable && e.description"
              class="h5 mb-0"
              v-html="e.description"
            />
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
  }
}
</script>

