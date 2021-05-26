<template>
  <div>
    <div
      v-for="(e, index) in contenu"
      :key="e.id"
      class="rnd-m mb-s p-xs bg-alt"
    >
      <div class="rnd-s p-s bg-bg">
        <div class="flex">
          <h4 class="mt-s">{{ index + 1 }}</h4>
          <div class="flex-right">
            <button class="btn px-m py-s rnd-xs" @click="elementRemove(index)">
              <i class="icon-24 icon-minus" />
            </button>
          </div>
        </div>
        <div v-for="prop in element.elements" :key="prop.id" class="mb-s">
          <div class="flex">
            <h5 class="mb-0">
              <span class="cap-first">{{ prop.nom }}</span>
            </h5>
            <p v-if="prop.optionnel" class="h6 italic mb-s flex-right lh-1-25">
              Optionnel
            </p>
          </div>
          <SectionElementEdit :contenu="contenu[index]" :element="prop" />
        </div>
      </div>
    </div>

    <button class="btn small rnd-s py-s px-m full-x flex" @click="elementAdd">
      <span class="mt-xxs">Ajouter</span
      ><i class="icon-24 icon-plus flex-right" />
    </button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    SectionElementEdit: defineAsyncComponent(() =>
      import('./section-element-edit.vue')
    )
  },

  props: {
    contenu: { type: Object, required: true },
    element: { type: Object, required: true }
  },

  methods: {
    elementAdd: function () {
      this.contenu.push({})
    },
    elementRemove: function (index) {
      this.contenu.splice(index, 1)
    }
  }
}
</script>
