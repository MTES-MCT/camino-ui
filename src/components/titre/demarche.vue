<template>
  <div class="mb">
    <div class="card-border" />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <h3 class="cap-first">
          {{ demarche.type.nom }}
        </h3>
      </div>
      <div class="tablet-blob-1-2">
        <h6>Statut</h6>
        <h4>
          <Dot :color="`bg-${demarche.statut.couleur}`" /><span
            class="cap-first"
          >
            {{ demarche.statut.nom }}
          </span>
        </h4>
      </div>
      <div class="tablet-blob-1-2">
        <Accordion
          v-if="demarche['recours']"
          class="mb"
        >
          <template slot="title">
            <Dot :status="demarche['recours']['statut']" /> Recours
          </template>
          <div class="large-blobs">
            <div class="large-blob-1-6">
              <h6>Statut</h6>
            </div>
            <div class="large-blob-5-6">
              <p class="word-break">
                {{ demarche["recours"]["statut"] }}
              </p>
            </div>
          </div>
          <div class="large-blobs">
            <div class="large-blob-1-6">
              <h6>Type</h6>
            </div>
            <div class="large-blob-5-6">
              <p class="word-break">
                {{ demarche["recours"]["type"] }}
              </p>
            </div>
          </div>
          <div class="large-blobs">
            <div class="large-blob-1-6">
              <h6>Requérant</h6>
            </div>
            <div class="large-blob-5-6">
              <p class="word-break">
                {{ demarche["recours"]["requérant"] }}
              </p>
            </div>
          </div>
          <div class="large-blobs">
            <div class="large-blob-1-6">
              <h6>Tribunal</h6>
            </div>
            <div class="large-blob-5-6">
              <p class="word-break">
                {{ demarche["recours"]["tribunal"] }}
              </p>
            </div>
          </div>
        </Accordion>
      </div>
      <div
        v-if="demarche['publique']"
        class="tablet-blob-1-2"
      >
        <h6>Participation publique</h6>
      </div>
    </div>
    <TitreEtape
      v-for="etape in demarche.etapes"
      :key="etape.id"
      :etape="etape"
    />
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import TitreEtape from './etape.vue'

export default {
  components: {
    Dot,
    Accordion,
    TitreEtape
  },

  props: {
    demarche: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
