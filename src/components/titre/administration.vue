<template>
  <Accordion
    class="mb"
    :opened="opened"
    :slot-default="true"
    @close="close"
    @toggle="toggle"
  >
    <template #title>
      <span>{{ administration.nom }}</span>
    </template>

    <div v-if="content" class="px-m pt-m">
      <div v-if="administration.service" class="large-blobs">
        <div class="large-blob-1-6">
          <h5>Service</h5>
        </div>
        <div class="large-blob-5-6">
          <p>
            {{ administration.service }}
          </p>
        </div>
      </div>
      <div
        v-if="administration.adresse1 || administration.adresse2"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h5>Adresse</h5>
        </div>
        <div class="large-blob-5-6">
          <p>
            {{ administration.adresse1 }}
            <span v-if="administration.adresse2"
              ><br />{{ administration.adresse2 }}</span
            >
            <br />{{ administration.codePostal }}
            {{ administration.commune }}
          </p>
        </div>
      </div>
      <div v-if="administration.telephone" class="large-blobs">
        <div class="large-blob-1-6">
          <h5>Téléphone</h5>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            {{ administration.telephone }}
          </p>
        </div>
      </div>
      <div v-if="administration.email" class="large-blobs">
        <div class="large-blob-1-6">
          <h5>Email</h5>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            <a
              :href="`mailto:${administration.email}`"
              class="btn small bold py-xs px-s rnd"
            >
              {{ administration.email }}
            </a>
          </p>
        </div>
      </div>
      <div v-if="administration.url" class="large-blobs">
        <div class="large-blob-1-6">
          <h5>Site</h5>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            <a
              :href="administration.url"
              class="btn small bold py-xs px-s rnd"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ administration.url }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'

export default {
  components: {
    Accordion
  },

  props: {
    administration: {
      type: Object,
      default: () => {}
    }
  },

  emits: ['titre-event-track'],

  data() {
    return {
      opened: false
    }
  },

  computed: {
    content() {
      return (
        this.administration.legalForme ||
        this.administration.adresse1 ||
        this.administration.adresse2 ||
        this.administration.codePostal ||
        this.administration.commune ||
        this.administration.telephone ||
        this.administration.email ||
        this.administration.url
      )
    }
  },

  methods: {
    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
      if (this.opened) {
        this.eventTrack()
      }
    },

    eventTrack() {
      this.$emit('titre-event-track', {
        categorie: 'titre-sections',
        action: 'titre-administration_consulter',
        nom: this.$route.params.id
      })
    }
  }
}
</script>
