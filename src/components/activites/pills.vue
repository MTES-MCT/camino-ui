<template>
  <ul class="list-inline mb--xs">
    <li
      v-if="activitesAbsentes"
      class="mr-xs"
    >
      <Statut
        color="error"
        :nom="activitesAbsentes"
      />
    </li>
    <li
      v-if="activitesEnConstruction"
      class="mr-xs"
    >
      <Statut
        color="warning"
        :nom="activitesEnConstruction"
      />
    </li>
  </ul>
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

