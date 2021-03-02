<template>
  <div class="mb">
    <slot v-if="!prop.actif" name="write" />
    <div v-else>
      <slot v-if="hasHeritage" name="read" />
      <p v-else class="mb-xs">Non renseigné</p>
      <p
        class="h5 italic"
        :class="{
          'mb-s': !(prop.etape.incertitudes && prop.etape.incertitudes[propId]),
          'mb-0': prop.etape.incertitudes && prop.etape.incertitudes[propId]
        }"
      >
        Hérité de :
        <span class="cap-first">{{ prop.etape.type.nom }}</span> ({{
          prop.etape.date | dateFormat
        }})
      </p>

      <p class="mb-s">
        <Tag
          v-if="prop.etape.incertitudes && prop.etape.incertitudes[propId]"
          :mini="true"
          color="bg-info"
          >Incertain
        </Tag>
      </p>
    </div>
    <slot />
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
import { hasValeurCheck } from '../../../utils/contenu'
import Tag from '@/components/_ui/tag.vue'

export default {
  components: { Tag },
  props: {
    prop: { type: Object, required: true },
    propId: { type: String, required: true },
    isArray: { type: Boolean, default: false },
    sectionId: { type: String, default: null }
  },
  computed: {
    buttonText() {
      return this.prop.actif ? 'Modifier' : `Hériter de l'étape précédente`
    },

    hasHeritage() {
      let contenu

      if (this.sectionId) {
        contenu =
          this.prop.etape &&
          this.prop.etape.contenu &&
          this.prop.etape.contenu[this.sectionId]
      } else {
        contenu = this.prop.etape
      }

      return hasValeurCheck(this.propId, contenu)
    },

    hasIncertitude() {
      return (
        !this.sectionId &&
        this.prop.etape.incertitudes &&
        this.prop.etape.incertitudes[this.propId]
      )
    }
  }
}
</script>
