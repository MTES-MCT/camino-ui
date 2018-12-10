<template>
  <div class="tablet-blobs pt">
    <div class="tablet-blob-1 desktop-blob-1-3">
      <img
        class="sponsor mb"
        src="../../public/img/logo-mtes-mef.svg"
      >

      <div class="blobs">
        <div class="blob-1-3">
          <img
            class="sponsor mb"
            src="../../public/img/logo-fabnum.svg"
          >
        </div>
        <div class="blob-2-3">
          <p class="h6 color-neutral">
            Camino est un service numérique de l’Etat incubé à la Fabrique
            numérique du Ministère de la Transition écologique et solidaire,
            membre du réseau d’incubateurs
            <a href="http://beta.gouv.fr">
              beta.gouv.fr
            </a>
          </p>
        </div>
      </div>
    </div>

    <div class="tablet-blob-1-2 desktop-blob-1-3">
      <ul class="list-prefix text-decoration-none mb-0">
        <li>
          <a href="/a-propos#contact">
            Contact
          </a>
        </li>
        <li>
          <a href="/a-propos">
            À propos
          </a>
        </li>
        <li>
          <a href="/cgu">
            CGU
          </a>
        </li>
        <li>
          <a href="/mentions-legales">
            Mentions légales
          </a>
        </li>
        <li>
          <a href="/accessibilite">
            Accessibilité
          </a>
        </li>
        <li>
          <a href="/contribution">
            Contribuez
          </a>
        </li>
      </ul>
    </div>

    <div class="tablet-blob-1-2 desktop-blob-1-3">
      <ul class="list-prefix text-decoration-none">
        <li>
          <a
            href="https://trello.com/b/cwXWMqGz/camino-roadmap-ouverte"
            target="_blank"
            rel="noopener noreferrer"
          >
            Roadmap
          </a>
        </li>
        <li>
          <a
            href="http://api.camino.beta.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            API (GraphQL)
          </a>
        </li>
        <li>
          <a
            href="http://flux.camino.beta.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flux (GeoJson)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/MTES-MCT?utf8=%E2%9C%93&q=camino"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code source
          </a>
        </li>
      </ul>
      <NewsletterForm />

      <p class="h5">
        UI v.{{ versions.ui }} / API v.{{ versions.api }}
      </p>
    </div>
  </div>
</template>

<script>
import NewsletterForm from './footer/newsletter-form.vue'

export default {
  components: {
    NewsletterForm
  },

  computed: {
    versions() {
      return this.$store.state.versions
    }
  }
}
</script>
