<template>
  <div class="mb">
    <div class="border-card" />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <h3>{{ event['type'] }}</h3>
      </div>
      <div class="tablet-blob-1-2">
        <div class="blobs">
          <div class="blob-1-2">
            <h6>Statut</h6>
            <h4><dot :color="event['statut']" />{{ event['statut'] }}</h4>
          </div>
          <div class="blob-1-2">
            <h6>Date</h6>
            <h4>{{ date | dateFormat }}</h4>
          </div>
        </div>
      </div>
      <div class="tablet-blob-1-2">
        <accordion
          v-if="event['recours']"
          class="mb">
          <template slot="title"><dot :status="event['recours']['statut']" /> Recours</template>
          <div class="large-blobs">
            <div class="large-blob-1-6"><h6>Statut</h6></div>
            <div class="large-blob-5-6">
              <p class="word-break">{{ event['recours']['statut'] }}</p>
            </div>
          </div>
          <div class="large-blobs">
            <div class="large-blob-1-6"><h6>Type</h6></div>
            <div class="large-blob-5-6">
              <p class="word-break">{{ event['recours']['type'] }}</p>
            </div>
          </div>
          <div class="large-blobs">
            <div class="large-blob-1-6"><h6>Requérant</h6></div>
            <div class="large-blob-5-6">
              <p class="word-break">{{ event['recours']['requérant'] }}</p>
            </div>
          </div>
          <div class="large-blobs">
            <div class="large-blob-1-6"><h6>Tribunal</h6></div>
            <div class="large-blob-5-6">
              <p class="word-break">{{ event['recours']['tribunal'] }}</p>
            </div>
          </div>
        </accordion>

      </div>
      <div
        v-if="event['publique']"
        class="tablet-blob-1-2">
        <h6>Participation publique</h6>
      </div>
    </div>
    <documents
      v-if="event['documents']"
      :documents="event['documents']" />
  </div>
</template>

<script>
import Dot from '@/components/ui/dot.vue'
import Accordion from '@/components/ui/accordion.vue'
import Documents from '@/components/camino/documents.vue'

export default {
  components: {
    Dot,
    Accordion,
    Documents
  },

  props: {
    event: {
      type: Object,
      default: () => { }
    }
  },

  computed: {
    date () {
      return this.event.dates['décision'] || this.event.dates['ouverture']
    }
  }
}
</script>
