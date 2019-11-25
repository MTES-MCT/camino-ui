<template>
  <Accordion class="mb">
    <template slot="title">
      <span>{{ administration.nom }}</span>
      <Tag
        v-if="administration.coordinateur"
        :color="'bg-highlight'"
      >
        Coord.
      </Tag>
    </template>
    <div
      v-if="content"
      class="px-m pt-m"
    >
      <div
        v-if="administration.service"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Service</h6>
        </div>
        <div
          class="large-blob-5-6"
        >
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
          <h6>Adresse</h6>
        </div>
        <div
          class="large-blob-5-6"
        >
          <p>
            {{ administration.adresse1 }}
            <span v-if="administration.adresse2"><br>{{ administration.adresse2 }}</span>
            <br>{{ administration.codePostal }}
            {{ administration.commune }}
          </p>
        </div>
      </div>
      <div
        v-if="administration.telephone"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Téléphone</h6>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            {{ administration.telephone }}
          </p>
        </div>
      </div>
      <div
        v-if="administration.email"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Email</h6>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            <a
              :href="`mailto:${administration.email}`"
              class="btn h6 bold py-xs px-s rnd"
            >
              {{ administration.email }}
            </a>
          </p>
        </div>
      </div>
      <div
        v-if="administration.url"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Site</h6>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            <a
              :href="administration.url"
              class="btn h6 bold py-xs px-s rnd"
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
import Accordion from '../ui/accordion.vue'
import Tag from '../ui/tag.vue'

export default {
  components: {
    Accordion,
    Tag
  },

  props: {
    administration: {
      type: Object,
      default: () => {}
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

  methods: {}
}
</script>
