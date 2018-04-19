<template>
  <accordion class="mb">
    <template slot="title">{{ company['nom'] }}</template>
    <div class="large-blobs">
      <div class="large-blob-1-6">
        <h6>Adresse</h6>
      </div>
      <div class="large-blob-5-6 mb">
        {{ company['adresse']['ligne_1'] }}
        <br v-if="company['adresse']['ligne_2']">{{ company['adresse']['ligne_2'] }}
        <br>{{ company['adresse']['code_postal'] }} {{ company['adresse']['ville'] }}
      </div>
    </div>
    <div class="large-blobs">
      <div class="large-blob-1-6"><h6>Service</h6></div>
      <div class="large-blob-5-6 mb">
        <p class="word-break">{{ company['service'] }}</p>
      </div>
    </div>
    <div class="large-blobs">
      <div class="large-blob-1-6"><h6>Téléphone</h6></div>
      <div class="large-blob-5-6 mb">
        <p class="word-break">{{ company['téléphone'] }}</p>
      </div>
    </div>
    <div class="large-blobs">
      <div class="large-blob-1-6"><h6>Email</h6></div>
      <div class="large-blob-5-6 mb">
        <p class="word-break"><a 
          :href="`mailto:${company.email}`"
          class="btn h6 bold py-xs px-s rnd">{{ company['email'] }}</a></p>
      </div>
    </div>

  </accordion>
</template>

<script>
import Accordion from '@/components/ui/Accordion.vue'

export default {
  components: {
    Accordion
  },

  props: {
    company: {
      type: Object,
      default: () => { }
    }
  }

}
</script>
