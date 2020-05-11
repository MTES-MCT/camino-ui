<template>
  <Accordion
    class="mb"
    @toggle="eventTrack($event,'consulter')"
  >
    <template slot="title">
      <h4 class="mb-0">
        {{ entrepriseNameFind(entreprise) }}
      </h4>
      <Tag
        v-if="entreprise.operateur"
        :color="'bg-highlight'"
        :mini="true"
      >
        Opé.
      </Tag>
    </template>

    <template
      slot="buttons"
    >
      <RouterLink
        :to="{ name: 'entreprise', params: {id: entreprise.id }}"
        class="btn-alt py-s px-m"
        tag="button"
      >
        <i
          class="icon-24 icon-window-link"
          @click="eventTrack($event,'éditer')"
        />
      </RouterLink>
    </template>


    <div
      v-if="content"
      class="px-m pt-m"
    >
      <div
        v-if="entreprise.legalSiren"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Siren</h6>
        </div>
        <div
          class="large-blob-3-4"
        >
          <p>{{ entreprise.legalSiren }}</p>
        </div>
      </div>

      <div
        v-if="entreprise.legalForme"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Forme juridique</h6>
        </div>
        <div
          class="large-blob-3-4"
        >
          <p>{{ entreprise.legalForme }}</p>
        </div>
      </div>

      <div
        v-if="entreprise.etablissements && entreprise.etablissements.length"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Établissement{{ entreprise.etablissements.length > 1 ? 's' : '' }}</h6>
        </div>
        <div
          class="large-blob-3-4"
        >
          <ul class="list-sans">
            <li
              v-for="e in entreprise.etablissements"
              :key="e.id"
            >
              <h5 class="inline-block">
                {{ e.dateDebut | dateFormat }}
              </h5> : {{ e.nom }}
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="entreprise.adresse"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Adresse</h6>
        </div>
        <div
          class="large-blob-3-4"
        >
          <p>
            {{ entreprise.adresse }}
            <br>{{ entreprise.codePostal }}
            {{ entreprise.commune }}
          </p>
        </div>
      </div>
      <div
        v-if="entreprise.telephone"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Téléphone</h6>
        </div>
        <div class="large-blob-3-4">
          <p class="word-break">
            {{ entreprise.telephone }}
          </p>
        </div>
      </div>
      <div
        v-if="entreprise.email"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Email</h6>
        </div>
        <div class="large-blob-3-4">
          <p class="word-break">
            <a
              :href="`mailto:${entreprise.email}`"
              class="btn h6 bold py-xs px-s rnd"
            >
              {{ entreprise.email }}
            </a>
          </p>
        </div>
      </div>
      <div
        v-if="entreprise.url"
        class="large-blobs"
      >
        <div class="large-blob-1-4">
          <h6>Site</h6>
        </div>
        <div class="large-blob-3-4">
          <p class="word-break">
            <a
              :href="entreprise.url"
              class="btn h6 bold py-xs px-s rnd"
            >
              {{ entreprise.url }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'
import Tag from '../_ui/tag.vue'

export default {
  components: {
    Accordion,
    Tag
  },

  props: {
    entreprise: {
      type: Object,
      default: () => {}
    },
    statut: {
      type: String,
      default: () => 'titulaire'
    }
  },

  computed: {
    content() {
      return (
        this.entreprise.legalSiren ||
        this.entreprise.legalForme ||
        this.entreprise.etablissements.length ||
        this.entreprise.adresse ||
        this.entreprise.codePostal ||
        this.entreprise.commune ||
        this.entreprise.telephone ||
        this.entreprise.email ||
        this.entreprise.url
      )
    }
  },

  methods: {
    entrepriseNameFind(entreprise) {
      return (
        entreprise.nom ||
        // trouve l'établissement le plus récent
        entreprise.etablissements.reduce(
          (res, e) => (res && res.dateDebut > e.dateDebut ? res : e),
          null
        ).nom
      )
    },

    eventTrack(event, _action) {
      if (event) {
        let action = `${_action} les informations `
        action +=
          this.statut === 'titulaire' ? `du titulaire` : `de l'amodiataire`
        this.$emit('titre:eventTrack', {
          categorie: 'titre-sections',
          action,
          nom: this.$route.params.id
        })
      }
    }
  }
}
</script>
