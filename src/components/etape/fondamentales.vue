<template>
  <div>
    <div v-if="etape.duree" class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h5>
          Durée
          <Tag
            v-if="etape.incertitudes && etape.incertitudes.duree"
            :mini="true"
            color="bg-info"
            class="ml-xs"
          >
            Incertain
          </Tag>
        </h5>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          <PropDuree :duree="etape.duree" />
        </p>
      </div>
    </div>

    <div v-if="etape.dateDebut" class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h5>
          Date de début
          <Tag
            v-if="etape.incertitudes && etape.incertitudes.dateDebut"
            :mini="true"
            color="bg-info"
            class="ml-xs"
          >
            Incertain
          </Tag>
        </h5>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          {{ dateFormat(etape.dateDebut) }}
        </p>
      </div>
    </div>
    <div v-if="etape.dateFin" class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h5>
          Date d'échéance
          <Tag
            v-if="etape.incertitudes && etape.incertitudes.dateFin"
            :mini="true"
            color="bg-info"
            class="ml-xs"
          >
            Incertain
          </Tag>
        </h5>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          {{ dateFormat(etape.dateFin) }}
        </p>
      </div>
    </div>

    <div
      v-if="etape.titulaires && etape.titulaires.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h5>
          Titulaire{{ etape.titulaires.length > 1 ? 's' : '' }}
          <Tag
            v-if="etape.incertitudes && etape.incertitudes.titulaires"
            :mini="true"
            color="bg-info ml-xs"
          >
            Incertain
          </Tag>
        </h5>
      </div>
      <div class="tablet-blob-3-4">
        <ul class="list-prefix mb">
          <li v-for="t in etape.titulaires" :key="t.id">
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            <Tag v-if="t.operateur" :mini="true" color="bg-info" class="ml-xs">
              Opérateur
            </Tag>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="etape.amodiataires && etape.amodiataires.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h5>
          Amodiataire{{ etape.amodiataires.length > 1 ? 's' : '' }}
          <Tag
            v-if="etape.incertitudes && etape.incertitudes.amodiataires"
            :mini="true"
            color="bg-info"
            class="ml-xs"
          >
            Incertain
          </Tag>
        </h5>
      </div>
      <div class="tablet-blob-3-4">
        <ul class="list-prefix">
          <li v-for="t in etape.amodiataires" :key="t.id">
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="etape.substances && etape.substances.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h5>
          Substance{{ etape.substances.length > 1 ? 's' : '' }}
          <Tag
            v-if="etape.incertitudes && etape.incertitudes.substances"
            :mini="true"
            color="bg-info"
            class="ml-xs"
          >
            Incertain
          </Tag>
        </h5>
      </div>
      <div class="tablet-blob-3-4">
        <TagList :elements="etape.substances.map(s => s.nom)" />
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
import { etablissementNameFind } from '../../utils/entreprise'
import TagList from '../_ui/tag-list.vue'
import Tag from '../_ui/tag.vue'
import PropDuree from './prop-duree.vue'

export default {
  components: { TagList, Tag, PropDuree },

  props: {
    etape: { type: Object, required: true }
  },

  methods: {
    etablissementNameFind(etablissements, date) {
      return etablissementNameFind(etablissements, date)
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
