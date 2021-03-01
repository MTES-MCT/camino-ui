<template>
  <div class="mb">
    <slot v-if="!prop.actif" name="write" />
    <div v-else>
      <slot v-if="hasHeritage" name="read" />
      <p v-else class="mb-xs">Non renseigné</p>
      <p
        class="h5 italic"
        :class="{
          'mb-s': !prop.etape.incertitudes && prop.etape.incertitudes[nom],
          'mb-0': prop.etape.incertitudes && prop.etape.incertitudes[nom]
        }"
      >
        Hérité de :
        <span class="cap-first">{{ prop.etape.type.nom }}</span> ({{
          prop.etape.date | dateFormat
        }})
      </p>

      <p class="mb-s">
        <Tag
          v-if="prop.etape.incertitudes && prop.etape.incertitudes[nom]"
          :mini="true"
          color="bg-info"
          >Incertain
        </Tag>
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
import Tag from '@/components/_ui/tag.vue'

export default {
  components: { Tag },
  props: {
    prop: { type: Object, required: true },
    nom: { type: String, required: true },
    isArray: { type: Boolean, default: false }
  },
  computed: {
    buttonText() {
      return this.prop.actif ? 'Modifier' : `Hériter de l'étape précédente`
    },

    hasHeritage() {
      return this.isArray
        ? this.prop.etape &&
            this.prop.etape[this.nom] &&
            this.prop.etape[this.nom].length
        : this.prop.etape && this.prop.etape[this.nom]
    }
  }
}
</script>
