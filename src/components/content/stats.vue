<template>
  <div>
    <Loader v-if="!loaded" />
    <div
      v-else
      class="content"
    >
      <h1 class="mb-xl">
        Stats
      </h1>
      <hr class="mb-xl">
      <div
        id="donnees"
        class="mb-xxl"
      >
        <h2>
          Les données
        </h2>
        <span class="separator" />
        <div class="desktop-blobs">
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              98%
            </p>
            <p class="bold text-center ">
              du cadastre minier publié
            </p>
            <p>
              L'ensemble des autorisations et titres miniers valides et disponibles est publié. Environs dix concessions de mines M valides dont l’historique est complexe à reconstituer seront ajoutées dans les prochaines semaines pour atteindre 100% du cadastre.
            </p>
          </div>
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              {{ stats.titresValide }}
            </p>
            <p class="bold text-center ">
              titres et autorisations valides et demandes en cours d’instruction publiés
            </p>
            <p>
              L’objectif fixé par l’<a
                href="https://www.legifrance.gouv.fr/eli/loi/2017/12/30/TREX1722331L/jo/article_11"
                target="_blank"
              >article 11 de la LOI n° 2017-1839 du 30 décembre 2017</a> mettant fin à la recherche ainsi qu'à l'exploitation des hydrocarbures et portant diverses dispositions relatives à l'énergie et à l'environnement est atteint pour le domaine minier H.
            </p>
          </div>
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              {{ stats.titresTotal }}
            </p>
            <p class="bold text-center ">
              titres, autorisations et demandes disponibles
            </p>
            <p>
              L’historique du cadastre minier incluant les titres échus, les demandes classées et refusées est disponible pour les entreprises concernées et les agents publics.
            </p>
          </div>
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              22
            </p>
            <p class="bold text-center ">
              sources de données distinctes consolidées et redistribuées
            </p>
            <p>
              Camino rassemble, structure, harmonise et repartage les données administratives et minières issues de sources de données auparavant hétérogènes et difficilement accessibles. Au moins trois systèmes d’informations d’administration vont être décommissionnés.
            </p>
          </div>
        </div>
      </div>
  
      <div
        id="usages"
        class="mb-xxl"
      >
        <h2>
          Les usages
        </h2>
        <span class="separator" />
        <div class="desktop-blobs">
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              1
            </p>
            <p class="bold text-center ">
              démarche dématérialisée
            </p>
            <p>
              La transformation numérique de l’administration des mines est engagée avec une première démarche administrative dématérialisée : le rapport trimestriel de production d’or en Guyane. Deux autres démarches dématérialisées sont en cours d’expérimentation : la demande de prolongation de concession de mines non énergétiques en métropole et la demande d’autorisation de recherches minières en Guyane.
            </p>
          </div>
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              {{ stats.titresActivites2018Depose }}
            </p>
            <p class="bold text-center ">
              rapports trimestriels d’activité de production d’or collectés en Guyane
            </p>
            <p>
              Les titulaires d’un titre ou d’une autorisation d’exploitation de mines d’or en Guyane peuvent désormais procéder à leurs rapports trimestriels  de production sur Camino en quelques clics. Le titulaire a une vision claire de ses obligations et les données collectées sont plus fiables.
            </p>
          </div>
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              {{ stats.titreActivites2018Ratio }}%
            </p>
            <p class="bold text-center ">
              des rapports trimestriels d’activité de production d’or requis en Guyane sont collectés
            </p>
            <p>
              La pénétration de ce service numérique ouvert en Guyane depuis janvier 2019 progresse auprès des opérateurs miniers locaux. L’objectif est de le généraliser à court terme à l'échelle nationale.
            </p>
          </div>
          <div class="desktop-blob-1-4">
            <p class="h0 text-center mb-0">
              5
            </p>
            <p class="bold text-center ">
              réutilisations connues des données ouvertes distribuées
            </p>
            <p>
              Les flux de données géographiques sont réutilisés par plusieurs bureaux d’études, administrations et opérateurs publics. Signalez vos réalisations sur www.data.gouv.fr !
            </p>
          </div>
        </div>
      </div>
  
      <div
        id="gains"
        class="mb-xxl"
      >
        <h2>
          Les gains
        </h2>
        <span class="separator" />
        <div class="desktop-blobs">
          <div class="desktop-blob-1-3">
            <p class="h0 text-center mb-0">
              75
            </p>
            <p class="bold text-center ">
              erreurs signalées par les utilisateurs et corrigées améliorent la qualité des données
            </p>
            <p>
              Les données consolidées dans Camino sont issues de sources de données dont la fiabilité est parfois discutable. Ouvrir ces données  à des regards croisés et offrir la possibilité aux utilisateurs de signaler les les erreurs permet l’amélioration continue du service.
            </p>
          </div>
          <div class="desktop-blob-1-3">
            <p class="h0 text-center mb-0">
              {{ stats.titresActivites2018BeneficesEntreprise }}
            </p>
            <p class="bold text-center ">
              jours de travail sans valeur ajoutée économisés par les entreprises en Guyane
            </p>
            <p>
              La dématérialisation d’un rapport trimestriel d’activité de production d’or en Guyane permet en moyenne l’économie de 2 heures de travail de saisie ou de déplacement pour son dépôt physique à l’administration.
            </p>
          </div>
          <div class="desktop-blob-1-3">
            <p class="h0 text-center mb-0">
              {{ stats.titresActivites2018BeneficesAdministration }}
            </p>
            <p class="bold text-center ">
              jours de travail à faible valeur ajoutée économisés par l’administration
            </p>
            <p>
              La dématérialisation d’un rapport trimestriel d’activité de production d’or en Guyane permet en moyenne l’économie d’une heure de travail de traitement et re-saisie de données par un agent de l’administration. Le gain de temps est réinvesti sur l’accompagnement et le contrôle de l’activité.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../ui/loader.vue'

export default {
  name: 'CaminoStats',

  components: { Loader },

  computed: {
    stats() {
      return this.$store.state.stats
    },
    loaded() {
      return !!this.stats.loaded
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      this.$store.dispatch('stats/get')
    }
  }
}
</script>