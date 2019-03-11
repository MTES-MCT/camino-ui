<template>
  <div>
    <div class="card-border" />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <h3 class="cap-first">
          {{ activite.type.nom }}
        </h3>
      </div>
      <div class="tablet-blob-1-2">
        <h6>Statut</h6>
        <h4>
          <Dot :color="`bg-${activite.statut.couleur}`" /><span
            class="cap-first"
          >
            {{ activite.statut.nom }}
          </span>
        </h4>
      </div>
    </div>
    <ActiviteButton
      :activite="activite"
    />
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import ActiviteButton from './activite-button.vue'

export default {
  components: {
    Dot,
    ActiviteButton
  },
  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

