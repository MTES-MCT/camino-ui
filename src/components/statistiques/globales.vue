<template>
  <Loader v-if="!loaded" class="content" />
  <div v-else class="content">
    <div id="engagement" class="mb-xxl">
      <h2 class="mt">Engagement général sur le site</h2>
      <span class="separator" />
      <p class="mb-xl">
        Les données retenues ici témoignent du comportement général des
        utilisateurs sur le site et de leur engagement auprès du service
      </p>
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3">
          <div class="mb-xl mt">
            <p class="h0 text-center">
              {{ numberFormat(recherches) }}
            </p>
            <p class="bold text-center">
              recherches effectuées le mois dernier
            </p>
            <p>
              Le nombre de recherches mensuelles est l'indicateur clé de
              l'utilisation du service de "cadastre minier"
            </p>
          </div>

          <div class="mb-xl">
            <p class="h0 text-center">
              {{ Math.round(statistiques.actions) }}
            </p>
            <p class="bold text-center">
              nombre moyen d'actions effectuées par utilisateur
            </p>
          </div>

          <div class="mb-xl">
            <p class="h0 text-center">{{ statistiques.sessionDuree }} min</p>
            <p class="bold text-center">
              temps de session moyen par utilisateur
            </p>
          </div>
        </div>
        <div class="tablet-float-blob-2-3 mb-xxl">
          <LineChart :data="statsFormat('recherches', 'recherches')" />
        </div>
      </div>
    </div>

    <div id="amelioration" class="mb-xxl content">
      <h2>Amélioration continue et accès aux données publiques</h2>
      <span class="separator" />
      <p class="mb-xl">
        En tant que secteur régulé par l'État, la publication en ligne des
        données minières doit permettre leur amélioration et leur utilisation
        par la communauté
      </p>
      <div class="tablet-float-blobs clearfix">
        <div class="tablet-float-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ titresModifies }}
          </p>
          <p class="bold text-center">
            mise à jour de titres miniers par l'administration et les
            entreprises du secteur le mois dernier
          </p>
          <p>
            Le nombre de mises à jour mensuelles du cadastre par les différents
            services de l'administration ou par les professionnels du secteur
            reflète l'intensité de l'activité d'instruction et administrative
            sur le domaine minier en France. Une mise à jour peut être l'ajout
            d'un titre, une modification de son statut ou des documents
            concernant son instruction.
          </p>
        </div>
        <div class="tablet-float-blob-2-3 mb-xxl">
          <LineChart :data="statsFormat('titresModifies', 'Mises à jour')" />
        </div>
      </div>
      <div class="desktop-blobs">
        <div class="desktop-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ statistiques.telechargements }}
          </p>
          <p class="bold text-center">
            téléchargements de pièces relatives à la bonne instruction des
            titres et autorisations miniers le mois dernier
          </p>
        </div>
        <div class="desktop-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ statistiques.signalements }}
          </p>
          <p class="bold text-center">
            erreurs corrigées sur les bases de données de l'État grâce à la
            participation des utilisateurs
          </p>
        </div>
        <div class="desktop-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ statistiques.reutilisations }}
          </p>
          <p class="bold text-center">
            réutilisations connues des données ouvertes distribuées
          </p>
        </div>
      </div>
    </div>

    <div id="gains" class="mb-xxl">
      <h2>Gains de la dématérialisation sur l'instruction minière</h2>
      <span class="separator" />
      <p>
        La dématérialisation des démarches relatives à l'instruction minière
        doit permettre un gain de temps pour ceux qui les effectuent et ceux qui
        les instruisent
      </p>
      <div class="desktop-blobs">
        <div class="desktop-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ statistiques.demarches }}
          </p>
          <p class="bold text-center">
            démarches effectuées en ligne cette années
          </p>
        </div>
        <div class="desktop-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ statistiques.titresActivitesBeneficesEntreprise }}
          </p>
          <p class="bold text-center">
            jours de travail sans valeur ajoutée économisés par les entreprises
            en Guyane
          </p>
          <p>
            La dématérialisation d’un rapport trimestriel d’activité de
            production d’or en Guyane permet en moyenne l’économie de 2 heures
            de travail de saisie ou de déplacement pour son dépôt physique à
            l’administration.
          </p>
        </div>
        <div class="desktop-blob-1-3 mb-xl">
          <p class="h0 text-center">
            {{ statistiques.titresActivitesBeneficesAdministration }}
          </p>
          <p class="bold text-center">
            jours de travail à faible valeur ajoutée économisés par
            l’administration
          </p>
          <p>
            La dématérialisation d’un rapport trimestriel d’activité de
            production d’or en Guyane permet en moyenne l’économie d’une heure
            de travail de traitement et re-saisie de données par un agent de
            l’administration. Le gain de temps est réinvesti sur
            l’accompagnement et le contrôle de l’activité.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../_ui/loader.vue'
import LineChart from '../_charts/line.vue'

export default {
  name: 'CaminoStatistiques',

  components: { Loader, LineChart },

  data() {
    return {
      loaded: false
    }
  },

  computed: {
    statistiques() {
      return this.$store.state.statistiques.globales
    },

    recherches() {
      const recherches = this.statistiques.recherches

      return recherches[recherches.length - 1].quantite
    },

    titresModifies() {
      const titresModifies = this.statistiques.titresModifies

      return titresModifies[titresModifies.length - 1].quantite
    }
  },

  async created() {
    await this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('statistiques/get', 'globales')

      if (!this.loaded) {
        this.loaded = true
      }
    },

    statsFormat(id, label) {
      return {
        labels: this.statistiques[id].map(recherche => recherche.mois),
        datasets: [
          {
            label,
            data: this.statistiques[id].map(recherche => recherche.quantite),
            backgroundColor: 'rgba(118, 182, 189, 0.2)',
            borderColor: 'rgb(118, 182, 189)'
          }
        ]
      }
    }
  }
}
</script>
