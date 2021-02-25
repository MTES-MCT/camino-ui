<template>
  <div>
    <inputNumber
      v-if="element.type === 'number'"
      v-model.trim.number="contenu[element.id]"
      class="p-s"
      placeholder="…"
    />

    <inputNumber
      v-if="element.type === 'integer'"
      v-model.trim.number="contenu[element.id]"
      :integer="true"
      class="p-s"
      placeholder="…"
    />

    <InputDate
      v-else-if="element.type === 'date'"
      v-model="contenu[element.id]"
    />

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
    />

    <div v-else-if="element.type === 'radio'">
      <label>
        <input
          v-model="contenu[element.id]"
          :name="element.id"
          :value="true"
          type="radio"
          class="p-s mt-s mb-s"
        />Oui
      </label>

      <label>
        <input
          v-model="contenu[element.id]"
          :name="element.id"
          :value="false"
          type="radio"
          class="p-s mt-s mb-s"
        />Non
      </label>
    </div>

    <input
      v-else-if="element.type === 'checkbox'"
      v-model="contenu[element.id]"
      type="checkbox"
      class="p-s mt-s mb-s"
    />

    <div v-else-if="element.type === 'checkboxes'">
      <label v-for="value in valeurs" :key="value.id">
        <input
          v-model="contenu[element.id]"
          type="checkbox"
          :value="value.id"
        />
        {{ value.nom }}
      </label>
    </div>

    <div v-else-if="element.type === 'select'">
      <select
        v-if="valeurs && valeurs.length"
        v-model="contenu[element.id]"
        class="p-s mr-s mb-s"
      >
        <option v-for="value in valeurs" :key="value.id" :value="value.id">
          {{ value.nom }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import InputDate from '../_ui/input-date.vue'
import InputNumber from '../_ui/input-number.vue'

export default {
  components: {
    InputDate,
    InputNumber
  },

  props: {
    contenu: { type: Object, required: true },
    element: { type: Object, required: true }
  },

  computed: {
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
