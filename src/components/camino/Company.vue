<template>
  <accordion class="mb">
    <template slot="title">{{ company.nom }}</template>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-6 mb-s">
        <h6 class="mt-xs">Adresse</h6>
      </div>
      <div class="tablet-blob-5-6 mb-s">
        {{ company.adresse.ligne_1 }}
        <br v-if="company.adresse.ligne_2">{{ company.adresse.ligne_2 }}
        <br>{{ company.adresse.code_postal }} {{ company.adresse.ville }}
      </div>
    </div>
    <table class="table-xs table-sans">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-6 mb-s"><h6 class="mt-xs">Service</h6></div>
        <div class="tablet-blob-5-6 mb-s">
          {{ company.contact.service }}
        </div>
      </div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-6 mb-s"><h6 class="mt-xs">Nom</h6></div>
        <div class="tablet-blob-5-6 mb-s">
          {{ company.contact.prenom }} {{ company.contact.nom }}
        </div>
      </div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-6 mb-s"><h6 class="mt-xs">Téléphone</h6></div>
        <div class="tablet-blob-5-6 mb-s">
          {{ company.contact.telephone }}
        </div>
      </div>
      <div 
        v-if="company.contact.mobile"
        class="tablet-blobs" >
        <div class="tablet-blob-1-6 mb-s"><h6 class="mt-xs">Mobile</h6></div>
        <div class="tablet-blob-5-6 mb-s">
          {{ company.contact.mobile }}
        </div>
      </div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-6 mb-s"><h6 class="mt-xs">Email</h6></div>
        <div class="tablet-blob-5-6 mb-s">
          <a 
            :href="`mailto:${company.contact.email}`"
            class="btn h6 bold py-xs px-s rnd">{{ company.contact.email }}</a>
        </div>
      </div>
    </table>
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
