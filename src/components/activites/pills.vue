<template>
  <ul class="list-inline mb--xs">
    <li
      v-if="activitesAbsentes"
      class="mr-xs"
    >
      <Pill
        v-if="activitesAbsentes"
        :color="'bg-error'"
      >
        {{ activitesAbsentes }}
      </Pill>
    </li>
    <li
      v-if="activitesEnConstruction"
      class="mr-xs"
    >
      <Pill
        :color="'bg-warning'"
      >
        {{ activitesEnConstruction }}
      </Pill>
    </li>
  </ul>
</template>

<script>
import Pill from '../_ui/pill.vue'

export default {
  components: { Pill },
  props: {
    activitesAbsentes: { type: Number, default: 0 },
    activitesEnConstruction: { type: Number, default: 0 }
  }
}
</script>

