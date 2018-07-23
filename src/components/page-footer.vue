<template>
  <div class="tablet-blobs pt">
    <div class="tablet-blob-1 desktop-blob-1-3">
      <img 
        class="sponsor mb"
        src="../../public/img/logo-mtes-mef.svg">

      <div class="blobs">
        <div class="blob-1-3">
          <img
            class="sponsor mb"
            src="../../public/img/logo-fabnum.svg">
        </div>
        <div class="blob-2-3">
          <p class="h6 color-neutral">Camino est un service numérique de l’Etat incubé à la Fabrique numérique du Ministère de la Transition écologique et solidaire, membre du réseau d’incubateurs <a href="http://beta.gouv.fr">beta.gouv.fr</a></p>
        </div>
      </div>
    </div>
    <div class="tablet-blob-1 desktop-blob-1-3">
      <p>Newsletter</p>
      <newsletter-form />

      <ul class="list-prefix text-decoration-none mb-0">
        <li><a href="a-propos">À propos</a></li>
        <li><a href="a-propos#contact">Contact</a></li>
      </ul>

    </div>
    <div class="tablet-blob-1 desktop-blob-1-3">
      <ul class="list-prefix text-decoration-none">
        <li><a href="http://api.camino.beta.gouv.fr">API</a></li>
        <li><a href="#">CGU</a></li>
        <li><a href="#">Mentions légales</a></li>
        <li><a href="accessibilite">Accessibilité</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import NewsletterForm from './camino/newsletter-form.vue'

export default {
  components: {
    NewsletterForm
  }
}
</script>
