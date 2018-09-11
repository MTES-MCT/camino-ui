<template>
  <div>
    <p class="bold">Le cadastre minier numérique ouvert</p>
    <p>
      Ce nouveau service de l'administration ambitionne d'ouvrir les projets miniers à tous les acteurs pour mieux les gérer.</p>
    <p>Le service <i>beta</i> est en amélioration continue. Cela signifie deux choses :</p>
    <ul class="list-prefix">
      <li>Nous nous efforçons de livrer des données valides et complètes. Mais il reste encore des lacunes et des erreurs ! N'hésitez pas à nous les signaler en un clic sur le bouton "Signaler une erreur" en bas de chaque page.</li>
      <li>Nous avons besoin de votre expérience d'utilisateurs du service. N'hésitez pas à nous faire part de tous vos commentaires en nous écrivant à contact@camino.beta.gouv.fr où en nous appelant au 01 40 81 95 86.</li>
    </ul>

    <div class="blobs">
      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          class="btn p-s full-x"
          @click="cookieSet"
          @keyup.enter="cookieSet"
        >Je comprends</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaminoPopupAvertissement',

  methods: {
    cookieSet () {
      this.$cookies.set('camino', 'session', 0)
      this.$emit('popup-close')
    }
  }
}
</script>
