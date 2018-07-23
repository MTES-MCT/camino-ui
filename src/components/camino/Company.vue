<template>
  <accordion>
    <template slot="title">{{ company['nom'] }}
      <tag
        v-if="company['coordinateur']"
        :color="'bg-highlight'">Coord.</tag>
      <tag
        v-if="company['opérateur']"
        :color="'bg-highlight'">Opé.</tag>
    </template>
    <div 
      v-if="company['service']"
      class="large-blobs">
      <div class="large-blob-1-6"><h6>Service</h6></div>
      <div class="large-blob-5-6">
        <p class="word-break">{{ company['service'] }}</p>
      </div>
    </div>
    <div class="large-blobs">
      <div class="large-blob-1-6">
        <h6>Adresse</h6>
      </div>
      <div 
        v-if="company['adresse']"
        class="large-blob-5-6">
        {{ company['adresse']['ligne_1'] }}
        <br v-if="company['adresse']['ligne_2']">{{ company['adresse']['ligne_2'] }}
        <br>{{ company['adresse']['code_postal'] }} {{ company['adresse']['ville'] }}
      </div>
    </div>
    <div 
      v-if="company['téléphone']"
      class="large-blobs">
      <div class="large-blob-1-6"><h6>Téléphone</h6></div>
      <div class="large-blob-5-6">
        <p class="word-break">{{ company['téléphone'] }}</p>
      </div>
    </div>
    <div
      v-if="company['email']"
      class="large-blobs">
      <div class="large-blob-1-6"><h6>Email</h6></div>
      <div class="large-blob-5-6">
        <p class="word-break"><a 
          :href="`mailto:${company['email']}`"
          class="btn h6 bold py-xs px-s rnd">{{ company['email'] }}</a></p>
      </div>
    </div>
    <div
      v-if="company['site']"
      class="large-blobs">
      <div class="large-blob-1-6"><h6>Site</h6></div>
      <div class="large-blob-5-6">
        <p class="word-break"><a 
          :href="company['site']"
          class="btn h6 bold py-xs px-s rnd">{{ company['site'] }}</a></p>
      </div>
    </div>


    <div 
      v-if="company['contacts']"
      class="large-blobs">
      <div class="large-blob-1-6"><h6>{{ company['contacts'] && company['contacts'].length > 1 ? 'Contacts' : 'Contact' }}</h6></div>
      <div class="large-blob-5-6">
        <ul class="list-inline">
          <li
            v-for="contact in company['contacts']"
            :key="contact.id"
            class="word-break"><button class="btn h6 bold py-xs px-s rnd">{{ contact['prénom'] }} {{ contact['nom'] }}</button>
          </li>
        </ul>
      </div>
    </div>


  </accordion>
</template>

<script>
import Accordion from '../ui/accordion.vue'
import Tag from '../ui/tag.vue'

export default {
  components: {
    Accordion,
    Tag
  },

  props: {
    company: {
      type: Object,
      default: () => { }
    }
  }

}
</script>
