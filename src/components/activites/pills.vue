<template>
  <div class="mb--s">
    <span v-if="activitesAbsentes" class="mr-xs inline-block">
      <Statut color="error" :nom="activitesAbsentes.toString()" />
    </span>
    <span v-if="activitesEnConstruction" class="mr-xs inline-block">
      <Statut color="warning" :nom="activitesEnConstruction.toString()" />
    </span>
  </div>
</template>

<script>
import Statut from '../_common/statut.vue'

export default {
  components: { Statut },
  props: {
    activitesAbsentes: { type: Number, default: 0 },
    activitesEnConstruction: { type: Number, default: 0 }
  }
}
</script>
