<template>
  <Accordion class="mb">
    <template slot="title">
      <span>{{ entrepriseNameFind(entreprise) }}</span>
      <Tag
        v-if="entreprise['coordinateur']"
        :color="'bg-highlight'"
      >
        Coord.
      </Tag>
      <Tag
        v-if="entreprise['opérateur']"
        :color="'bg-highlight'"
      >
        Opé.
      </Tag>
    </template>
    <div
      class="px-m pt-m"
    >
      <div
        v-if="entreprise.legalForme"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Forme juridique</h6>
        </div>
        <div
          class="large-blob-5-6"
        >
          <p>{{ entreprise.legalForme }}</p>
        </div>
      </div>

      <div
        v-if="entreprise.etablissements.length"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Établissements</h6>
        </div>
        <div
          class="large-blob-5-6"
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
        <div class="large-blob-1-6">
          <h6>Adresse</h6>
        </div>
        <div
          class="large-blob-5-6"
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
        <div class="large-blob-1-6">
          <h6>Téléphone</h6>
        </div>
        <div class="large-blob-5-6">
          <p class="word-break">
            {{ entreprise.telephone }}
          </p>
        </div>
      </div>
      <div
        v-if="entreprise.email"
        class="large-blobs"
      >
        <div class="large-blob-1-6">
          <h6>Email</h6>
        </div>
        <div class="large-blob-5-6">
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
        <div class="large-blob-1-6">
          <h6>Site</h6>
        </div>
        <div class="large-blob-5-6">
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
import Accordion from '../ui/accordion.vue'
import Tag from '../ui/tag.vue'

export default {
  components: {
    Accordion,
    Tag
  },

  props: {
    entreprise: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    entrepriseNameFind(entreprise) {
      return (
        entreprise.nom ||
        // trouve l'établissement le plus récent
        entreprise.etablissements.reduce(
          (res, e) =>
            res && this.dateFormat(res.dateDebut) > this.dateFormat(e.dateDebut)
              ? res
              : e,
          null
        ).nom
      )
    }
  }
}
</script>
