<template>
  <span>
    <span v-if="dureeFormated.ans">{{
      `${dureeFormated.ans} an${dureeFormated.ans > 1 ? 's' : ''}`
    }}</span>
    <span v-if="dureeFormated.ans && dureeFormated.mois"> et </span>
    <span v-if="dureeFormated.mois">{{ `${dureeFormated.mois} mois` }}</span>
  </span>
</template>

<script>
export default {
  props: {
    duree: { type: Number, default: null }
  },

  computed: {
    dureeFormated() {
      return {
        ans: this.duree && Math.floor(this.duree / 12),
        mois: this.duree && Math.floor(this.duree % 12)
      }
    }
  }
}
</script>
