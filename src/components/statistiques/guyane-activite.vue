<template>
  <div id="indicateurs" class="mb-xxl">
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 mb-xl">
        <h4 class="text-center">Production d'or nette</h4>
        <p class="h0 text-center">
          {{ numberFormat(statistiqueGuyane.orNet) }} kg
        </p>
        <p>Production d’or nette (après affinage) issue des mines en Guyane.</p>
      </div>
      <div class="tablet-blob-1-3 mb-xl">
        <h4 class="text-center">Energie consommée</h4>
        <p class="h0 mb-s text-center">
          {{
            numberFormat(
              statistiqueGuyane.carburantConventionnel +
                statistiqueGuyane.carburantDetaxe
            )
          }}
          kl
        </p>
        <p class="bold text-center">
          dont
          {{ numberFormat(statistiqueGuyane.carburantDetaxe) }} kl détaxés
        </p>
        <p>Volume de carburant consommé par les activités extractives.</p>
      </div>
      <div class="tablet-blob-1-3 mb-xl">
        <h4 class="text-center">Mercure collecté</h4>
        <p class="h0 text-center">
          {{ numberFormat(statistiqueGuyane.mercure) }} kg
        </p>
        <p>
          Masse de mercure d’origine anthropique historique ou illégale récupéré
          lors de l’exploitation.
        </p>
      </div>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Protection de l'environnement</h4>
        <p class="h0 text-center">
          {{ numberFormat(statistiqueGuyane.environnementCout) }} €
        </p>
        <p>
          Montant en euros des investissements * déclarés contribuant à la
          protection de l’environnement.
        </p>
        <p>
          <small
            >* listés à l’article 318 C de l’annexe II du code général des
            impôts.</small
          >
        </p>
      </div>
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Emplois</h4>
        <p class="h0 text-center">
          {{ numberFormat(statistiqueGuyane.effectifs) }}
        </p>
        <p>
          Salariés mobilisés sur les exploitations minières de Guyane
          (équivalent temps plein).
        </p>
      </div>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Sources des données</h4>
        <p class="h0 text-center">
          {{ numberFormat(statistiqueGuyane.activitesDeposesQuantite) }}
        </p>
        <p>
          Rapports d’activité de production collectés via Camino utilisés pour
          consolider ces statistiques.
        </p>
      </div>
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Taux de collecte</h4>
        <p class="h0 text-center">
          {{ statistiqueGuyane.activitesDeposesRatio }} %
        </p>
        <p>
          Des rapports d’activité de production attendus ont été déposés par les
          opérateurs miniers pour consolider ces statistiques.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndicateursActiviteGuyane',

  props: {
    statistiqueGuyane: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
