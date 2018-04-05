<template>
  <div class="mb">
    <div class="border-card" />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <h3>{{ event.type }}</h3>
      </div>
      <div class="tablet-blob-1-2">
        <div class="blobs">
          <div class="blob-1-2 mb-0">
            <h6>Statut</h6>
            <h4 class="mb-0"><title-status :status="event.statut" />{{ event.statut }}</h4>
          </div>
          <div class="blob-1-2 mb-0">
            <h6>Date</h6>
            <h4 class="mb-0">{{ date | dateFormat }}</h4>
          </div>
        </div>
      </div>
    </div>
    <documents
      v-if="event.documents"
      :documents="event.documents" />
  </div>
</template>

<script>
import Card from '@/components/ui/Card.vue'
import Documents from '@/components/camino/Documents.vue'
import TitleStatus from '@/components/camino/TitleStatus.vue'

export default {
  components: {
    Card,
    Documents,
    TitleStatus
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
