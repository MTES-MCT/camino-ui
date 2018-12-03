<template>
  <popup>
    <template slot="header">
      <h2 class="mb-0">Bienvenue sur Camino</h2>
    </template>
    <p class="bold">Le cadastre minier numérique ouvert</p>
    <p>
      Ce nouveau service de l'administration ambitionne d'ouvrir les projets miniers à tous les acteurs pour mieux les gérer.</p>
    <p>Le service <i>beta</i> est en amélioration continue. Cela signifie deux choses :</p>
    <ul class="list-prefix">
      <li>Nous nous efforçons de livrer des données valides et complètes. Mais il reste encore des lacunes et des erreurs ! N'hésitez pas à nous les signaler en un clic sur le bouton "Signaler une erreur" en bas de chaque page.</li>
      <li>Nous avons besoin de votre expérience d'utilisateurs du service. N'hésitez pas à nous faire part de tous vos commentaires en nous écrivant à <a href="mailto:camino@beta.gouv.fr">camino@beta.gouv.fr</a> où en nous appelant au 01 40 81 95 86.</li>
    </ul>


    <template slot="footer">
      <button
        class="btn-flash rnd-xs p-s full-x"
        @click="set"
      >Je comprends</button>
    </template>
  </popup>
</template>

<script>
import Popup from '../ui/popup.vue'

export default {
  name: 'CaminoPopupAvertissement',

  components: {
    Popup
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    set () {
      localStorage.setItem('conditions', new Date().getTime())
      this.$store.commit('popupClose')
    },

    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.set()
      }
    }
  }
}
</script>
