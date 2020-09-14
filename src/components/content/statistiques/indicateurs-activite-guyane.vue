<template>
  <div
    id="indicateurs"
    class="mb-xxl"
  >
    <h2>
      Indicateurs annuels de production et d’activité minière
    </h2>
    <span class="separator" />
    <p>
      Les données affichées ici sont celles contenues dans la base de donnée
      Camino. Elles sont stabilisées pour l’année n-2 mais sont susceptibles
      d’évoluer jusqu’à la cloture de la collecte des déclarations
      règlementaires de l’année précédente pour l’année n-1. Ces données
      concernent exclusivement le territoire guyanais.
    </p>
    <div class="desktop-blobs mb-xl">
      <div class="desktop-blob-1-3 text-center">
        <p class="bold">
          Production d'or nette
        </p>
        <p class="h0-graph mb-0">
          {{ Intl.NumberFormat().format(productionOr) }} kg
        </p>
        <p>
          Production d’or nette (après affinage) issue des mines en Guyane.
        </p>
      </div>
      <div class="desktop-blob-1-3 text-center">
        <p class="bold">
          Energie consommée
        </p>
        <p class="h0-graph mb-0">
          {{ Intl.NumberFormat().format(energie) }} kl
        </p>
        <p>
          Volume de carburant consommé par les activités extractives (dont
          {{ carburantDetaxe }} kl détaxés).
        </p>
      </div>
      <div class="desktop-blob-1-3 text-center">
        <p class="bold">
          Mercure collecté
        </p>
        <p class="h0-graph mb-0">
          {{ Intl.NumberFormat().format(mercure) }} kg
        </p>
        <p>
          Masse de mercure d’origine anthropique historique ou illégale récupéré
          lors de l’exploitation.
        </p>
      </div>
    </div>
    <div class="desktop-blobs mb-xl">
      <div class="desktop-blob-1-2 text-center">
        <p class="bold">
          Protection de l'environnement
        </p>
        <p class="h0-graph mb-0">
          {{ Intl.NumberFormat().format(environnementCout) }} €
        </p>
        <p>
          Montant en euros des investissements* déclarés contribuant à la
          protection de l’environnement.
        </p>
        <p>
          *listés à l’article 318 C de l’annexe II du code général des impôts.
        </p>
      </div>
      <div class="desktop-blob-1-2 text-center">
        <p class="bold">
          Emplois
        </p>
        <p class="h0-graph mb-0">
          {{ Intl.NumberFormat().format(salaries) }}
        </p>
        <p>
          Salariés mobilisés sur les exploitations minières de Guyane
          (équivalent temps plein).
        </p>
      </div>
    </div>
    <div class="desktop-blobs mb-xl">
      <div class="desktop-blob-1 text-center">
        <p class="bold">
          Sources des données
        </p>
        <div class="desktop-blobs">
          <div class="desktop-blob-1-2 text-center">
            <p class="h0-graph mb-0">
              {{ Intl.NumberFormat().format(rapportProductionOrDeposes) }}
            </p>
            <p>
              Rapports d’activité de production collectés via Camino utilisés
              pour consolider ces statistiques.
            </p>
          </div>
          <div class="desktop-blob-1-2 text-center">
            <p class="h0-graph mb-0">
              {{ rapportProductionOrRatio }} %
            </p>
            <p>
              Des rapports d’activité de production attendus ont été déposés par
              les opérateurs miniers pour consolider ces statistiques.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndicateursActiviteGuyane',

  props: {
    anneeStatistiquesGuyane: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    statistiqueGuyane() {
      return this.anneeStatistiquesGuyane.statistiqueGuyane
    },
    productionOr() {
      return this.statistiqueGuyane.productionOr
    },
    energie() {
      return (
        this.statistiqueGuyane.carburantConventionnel +
        this.statistiqueGuyane.carburantDetaxe
      )
    },
    carburantDetaxe() {
      return this.statistiqueGuyane.carburantDetaxe
    },
    mercure() {
      return this.statistiqueGuyane.mercure
    },
    environnementCout() {
      return this.statistiqueGuyane.environnementCout
    },
    salaries() {
      return this.statistiqueGuyane.salaries
    },
    rapportProductionOrDeposes() {
      return this.statistiqueGuyane.rapportProductionOrDeposes
    },
    rapportProductionOrRatio() {
      return this.statistiqueGuyane.rapportProductionOrRatio
    }
  }
}
</script>
