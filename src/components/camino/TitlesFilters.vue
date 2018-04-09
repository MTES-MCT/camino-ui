<template>
  <accordion
    :sub="false"
    class="mb">
    <template slot="title">Filtres</template>
    <template slot="sub">
      <ul class="list-sans mb-xxs">
        <li
          v-for="filterSelected in filterSelecteds"
          :key="filterSelected.name">
          <tag>{{ filterSelected.name }}</tag>
        </li>
      </ul>
    </template>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 desktop-blob-1-3 mb-0">
        <div class="mb">
          <h6>Localisation</h6>
          <input
            type="text">
        </div>
        <div class="mb">
          <h6>Titulaire</h6>
          <input
            type="text">
        </div>
        <div class="mb">
          <h6>Substances</h6>
          <input
            type="text">
        </div>
      </div>
      <div class="tablet-blob-1-2 desktop-blob-1-3 mb-0">
        <h6>Domaine</h6>
        <ul class="list-sans">
          <li
            v-for="(domaine, domaineCode) in filtres.domaines"
            :key="domaineCode">
            <label>
              <input
                type="checkbox"
                class="mr-s">
              <tag
                :color="`bg-title-domain-${domaineCode.toLowerCase()}`"
                class="mr-xs mono">{{ domaineCode }}</tag>
              {{ domaine }}
            </label>
          </li>
        </ul>
      </div>
      <div class="tablet-blob-1-2 desktop-blob-1-3 mb-0">
        <div class="mb">
          <h6>Type</h6>
          <ul class="list-sans">
            <li
              v-for="(type, typeCode) in filtres.types"
              :key="typeCode">
              <label>
                <input
                  type="checkbox"
                  class="mr-s">
                {{ type }}
              </label>
            </li>
          </ul>
        </div>
        <div class="mb">
          <h6>Statuts</h6>
          <ul class="list-sans">
            <li
              v-for="(statut, statutCode) in filtres.statuts"
              :key="statutCode">
              <label>
                <input
                  type="checkbox"
                  class="mr-s">
                <title-status :status="statut" />
                {{ statut }}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </accordion>
</template>

<script>
import TitleStatus from '@/components/camino/TitleStatus.vue'
import Tag from '@/components/ui/Tag.vue'
import Accordion from '@/components/ui/Accordion.vue'

export default {
  components: {
    Tag,
    TitleStatus,
    Accordion,
  },

  data () {
    return {
      filterSelecteds: [{
        name: 'test'
      }]
    }
  },

  computed: {
    filtres () {
      return this.$store.state.lib.titre.filtres
    }
  }

}
</script>

