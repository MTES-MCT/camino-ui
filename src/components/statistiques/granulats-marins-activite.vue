<template>
  <div id="indicateurs">
    <p v-if="enConstruction" class="p-s bg-warning color-bg">
      Données en cours de collecte et consolidation
    </p>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Production nette en volume</h4>
        <div v-if="statistiqueGranulatsMarins.activitesDeposesQuantite > 3">
          <p class="h0 text-center">
            {{
              numberFormat(
                statistiqueGranulatsMarins.granulatsExtrait
                  .volumeGranulatsExtrait
              )
            }}
            m³
          </p>
        </div>
        <div v-else>
          <p class="h0 text-center">-</p>
        </div>
      </div>
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Production nette en masse</h4>
        <div v-if="statistiqueGranulatsMarins.activitesDeposesQuantite > 3">
          <p class="h0 text-center">
            {{
              numberFormat(
                statistiqueGranulatsMarins.granulatsExtrait
                  .masseGranulatsExtrait
              )
            }}
            t
          </p>
        </div>
        <div v-else>
          <p class="h0 text-center">-</p>
        </div>
      </div>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Sources des données</h4>
        <p class="h0 text-center">
          {{
            numberFormat(statistiqueGranulatsMarins.activitesDeposesQuantite)
          }}
        </p>
        <p>
          Rapports d’activité de production collectés via Camino utilisés pour
          consolider ces statistiques.
        </p>
      </div>
      <div class="tablet-blob-1-2 mb-xl">
        <h4 class="text-center">Taux de collecte</h4>
        <p class="h0 text-center">
          {{ statistiqueGranulatsMarins.activitesDeposesRatio }} %
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
import numberFormat from '@/utils/number-format'

export default {
  name: 'IndicateursActiviteGranulatsMarins',

  props: {
    statistiqueGranulatsMarins: { type: Object, required: true },
    enConstruction: { type: Boolean, default: false }
  },

  methods: {
    numberFormat(number) {
      return numberFormat(number)
    }
  }
}
</script>
