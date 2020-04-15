<template>
  <li class="mr-s">
    <button
      class="btn-alt rnd-xs py-s px-m"
      @click="emailSend"
    >
      Signaler une erreur…
    </button>
  </li>
</template>

<script>
export default {
  methods: {
    emailSend() {
      this.eventTrack(this.$route.params.id)
      window.location.href = `mailto:camino@beta.gouv.fr?subject=Erreur ${this.$route.params.id}&body=Bonjour, j'ai repéré une erreur sur le titre ${this.$route.params.id} : `
    },

    eventTrack(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent('titre-erreur', 'signaler une erreur', id)
      }
    }
  }
}
</script>
