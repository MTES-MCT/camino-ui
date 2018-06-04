<template>
  <div>
    <p class="bold">Le cadastre minier numérique ouvert</p>
    <p>
      Ce nouveau service ambitionne d'ouvrir les projets miniers à tous les acteurs pour mieux les gérer.</p>
    <p>Nous développons un premier service en version <i>beta</i>. Cela signifie deux choses :</p>
    <ul class="list-prefix">
      <li>Les informations sur les titres miniers affichées ne peuvent en aucun cas être considérées comme vérifiées : elles ont une simple fonction d'illustration pour le moment.</li>
      <li>Nous avons besoin de vos retours utilisateurs. N'hésitez pas à naviguer sur le site et à nous faire part de tous vos commentaires en nous écrivant à contact@camino.beta.gouv.fr.</li>
    </ul>

    <div class="blobs">
      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          class="btn p-s full-x"
          @click="cookieSet"
          @keyup.enter="cookieSet">Je comprends</button>
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
