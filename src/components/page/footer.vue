<template>
  <div class="tablet-blobs pt flex-align-items-stretch">
    <div class="tablet-blob-1 desktop-blob-1-3">
      <ul class="list-sans text-decoration-none li-sep mb-0">
        <li>
          <a href="https://economie.gouv.fr/"
            >Ministère de l'Économie, des Finances et de la Relance</a
          >
        </li>
        <li>
          <a href="https://ecologie.gouv.fr/"
            >Ministère de la Transition écologique</a
          >
        </li>
        <li>
          <a href="https://onf.fr/">Office National des forêts</a>
        </li>
        <li>
          <div class="blobs">
            <div class="blob-1-3">
              <img class="sponsor" src="/img/logo-fabriquenumerique.svg" />
            </div>
            <div class="blob-2-3">
              <p class="h6 mb-0">
                La Fabrique numérique du Ministère de la Transition écologique,
                membre du réseau
                <a href="http://beta.gouv.fr">beta.gouv.fr</a>.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="tablet-blob-1-2 desktop-blob-1-3">
      <ul class="list-prefix text-decoration-none li-mb-s mb-0">
        <li>
          <router-link to="/contacts"> Contact </router-link>
        </li>
        <li>
          <router-link to="/a-propos"> À propos </router-link>
        </li>
        <li>
          <router-link to="/mentions-legales-cgu">
            Mentions légales et CGU
          </router-link>
        </li>
        <li>
          <router-link to="/accessibilite"> Accessibilité </router-link>
        </li>
        <li>
          <router-link to="/contribution"> Contribution </router-link>
        </li>
        <li>
          <a
            href="https://www.dailymotion.com/camino-le-cadastre-minier"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tutoriels
          </a>
        </li>
        <li>
          <a
            href="https://docs.camino.beta.gouv.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open data et documentation
          </a>
        </li>
      </ul>
    </div>

    <div class="tablet-blob-1-2 desktop-blob-1-3 flex flex-direction-column">
      <NewsletterForm v-if="newsletterForm" class="mb-xxs" />
      <ul class="list-prefix text-decoration-none li-mb-s">
        <li>
          <a
            href="http://www.mineralinfo.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MineralInfo
          </a>
        </li>
        <li>
          <a
            href="http://www.minergies.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minergies
          </a>
        </li>
      </ul>

      <p class="h6 flex-bottom">
        <a
          href="https://github.com/MTES-MCT/camino-ui/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          class="text-decoration-none"
        >
          UI v.{{ versionUi }}
        </a>
        |
        <a
          href="https://github.com/MTES-MCT/camino-api/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          class="text-decoration-none"
        >
          API v.{{ versionApi }}
        </a>
      </p>
    </div>
  </div>

  <div
    data-tf-popover="qqGEhNhT"
    data-tf-button-color="#000091"
    data-tf-button-text="Launch me"
    data-tf-iframe-props="title=Satisfaction_CAMINO"
    data-tf-medium="snippet"
    style="all: unset"
  ></div>
</template>

<script>
import NewsletterForm from './footer/newsletter-form.vue'

export default {
  components: {
    NewsletterForm
  },

  computed: {
    versionApi() {
      return this.$store.state.user.metas.version
    },

    versionUi() {
      return this.$store.state.user.metas.versionUi
    },

    newsletterForm() {
      return !this.$store.state.user.element?.newsletter
    }
  }
}
</script>
