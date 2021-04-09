<template>
  <div class="mb-s">
    <slot v-if="!prop.actif" name="write" />
    <div v-else>
      <slot v-if="hasHeritage" name="read" />
      <div v-else class="border p-s mb-s">Non renseigné</div>
      <div class="mb-s">
        <Tag
          v-if="prop.etape.incertitudes && prop.etape.incertitudes[propId]"
          :mini="true"
          color="bg-info"
          >Incertain
        </Tag>
      </div>
      <p class="h5 italic mb-s">
        Hérité de :
        <span class="cap-first">{{ prop.etape.type.nom }}</span> ({{
          dateFormat(prop.etape.date)
        }})
      </p>
    </div>
    <slot />
    <button
      v-if="prop.etape"
      class="btn full-x rnd-xs py-s px-m small mb-s"
      @click="prop.actif = !prop.actif"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { hasValeurCheck } from '../../../utils/contenu'
import Tag from '@/components/_ui/tag.vue'
import { dateFormat } from '@/utils'

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
    }
  },
  methods: {
    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
