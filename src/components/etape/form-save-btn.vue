<template>
  <div v-bind="$attrs">
    <div class="flex flex-direction-column full-x">
      <ul v-if="alertes?.length" class="bg-warning color-bg list-none p-s bold">
        <li v-for="alerte in alertes" :key="alerte" class="flex">
          {{ alerte.message }}
          <a v-if="alerte.url" :href="alerte.url" target="_blank" class="ml-s">
            <i class="icon-24 icon-window-link" />
          </a>
        </li>
      </ul>
      <div class="flex flex-center">
        <HelpTooltip v-if="helpVisible" class="mr-m">
          Vous pouvez à tout moment enregistrer votre demande. Le dépôt du
          dossier et de toutes les pièces peut être réalisé en plusieurs fois.
          Vous pourrez compléter votre demande en cliquant sur
          <span class="inline-block"><i class="icon-24 icon-pencil" /></span>.
          Si vous avez ajouté tous les documents spécifiques à la demande et
          justificatifs d’entreprise, et que vous considérez que votre demande
          est complète, vous pouvez la déposer à l’étape suivante en cliquant
          sur « Déposer … ». Les administrations seront ainsi notifiées et
          pourront instruire votre demande.
        </HelpTooltip>
        <button
          id="cmn-etape-edit-button-enregistrer"
          ref="save-btn"
          class="btn btn-primary"
          :disabled="$attrs.disabled"
          :class="{ disabled: $attrs.disabled }"
          @click="$emit('click')"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelpTooltip from '../_ui/help-tooltip.vue'

export default defineComponent({
  components: { HelpTooltip },

  props: {
    helpVisible: {
      type: Boolean,
      default: false
    },
    alertes: { type: Array, default: () => [] }
  },

  emits: ['click'],

  methods: {
    focusBtn() {
      this.$refs['save-btn']?.focus()
    }
  }
})
</script>
