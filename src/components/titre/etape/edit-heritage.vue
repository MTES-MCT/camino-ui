<template>
  <div class="mb">
    <slot v-if="!prop.actif" name="write" />
    <div v-else>
      <slot name="read" />
      <p class="h5 mb-s italic">
        Hérité de : <span class="cap-first">{{ prop.etape.type.nom }}</span> ({{
          prop.etape.date | dateFormat
        }})
      </p>
    </div>
    <button
      v-if="prop.etape"
      class="btn full-x rnd-xs py-s px-m h5"
      @click="prop.actif = !prop.actif"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: { prop: { type: Object, required: true } },
  computed: {
    buttonText() {
      return this.prop.actif ? 'Modifier' : `Hériter de l'étape précédente`
    }
  }
}
</script>
