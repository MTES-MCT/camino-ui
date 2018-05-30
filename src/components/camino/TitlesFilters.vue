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
          <pill>{{ filterSelected.name }}</pill>
        </li>
      </ul>
    </template>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2 desktop-blob-1-3">
        <div class="mb">
          <h6>Localisation</h6>
          <input
            type="text"
            placeholder="Région, département, commune…">
        </div>
        <div class="mb">
          <h6>Titulaire</h6>
          <input
            type="text"
            placeholder="Nom du titulaire…">
        </div>
        <div class="mb">
          <h6>Substances</h6>
          <input
            type="text"
            placeholder="Or, Argent, Ag…">
        </div>
      </div>
      <div class="tablet-blob-1-2 desktop-blob-1-3">
        <h6>Domaine</h6>
        <ul class="list-sans">
          <li
            v-for="domain in domains"
            :key="domain['code']">
            <label>
              <input
                type="checkbox"
                class="mr-s">
              <pill
                :color="`bg-title-domain-${domain['code'].toLowerCase()}`"
                class="mr-xs mono">{{ domain['code'] }}</pill>
              {{ domain['nom'] }}
            </label>
          </li>
        </ul>
      </div>
      <div class="tablet-blob-1-2 desktop-blob-1-3">
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
                <status-dot :status="statut" />
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
import StatusDot from '@/components/camino/StatusDot.vue'
import Pill from '@/components/ui/Pill.vue'
import Accordion from '@/components/ui/Accordion.vue'

export default {
  components: {
    Pill,
    StatusDot,
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
      return this.$store.state.lib.titre['filtres']
    },
    domains () {
      return this.$store.state.lib.titre['domaines']
    }
  }

}
</script>

