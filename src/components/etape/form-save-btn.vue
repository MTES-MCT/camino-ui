<template>
  <div v-bind="$attrs">
    <HelpTooltip v-if="armHelpVisible" class="mr-m">
      Vous pouvez à tout moment enregistrer votre demande. Le dépôt du dossier
      d’ARM et de toutes les pièces peut être réalisé en plusieurs fois. Vous
      pourrez compléter votre demande en cliquant sur
      <span class="inline-block"><i class="icon-24 icon-pencil" /></span>. Si
      vous avez ajouté tous les documents spécifiques à la demande d’ARM et
      justificatifs d’entreprise, et que vous considérez que votre demande est
      complète, vous pouvez la déposer à l’étape suivante en cliquant sur «
      Déposer … ». L’ONF et le PTMG seront ainsi notifiés et pourront instruire
      votre demande.
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelpTooltip from '../_ui/help-tooltip.vue'

export default defineComponent({
  components: { HelpTooltip },

  props: {
    armHelpVisible: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  methods: {
    focusBtn() {
      this.$refs['save-btn']?.focus()
    }
  }
})
</script>
