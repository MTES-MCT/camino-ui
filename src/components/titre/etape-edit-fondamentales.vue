<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Durée (années / mois)</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <div
          class="tablet-blobs"
          :class="{'mb-s': etape.duree.ans || etape.duree.mois, 'mb': !etape.duree.ans && !etape.duree.mois}"
        >
          <div class="tablet-blob-1-2">
            <input
              v-model.number="etape.duree.ans"
              type="number"
              placeholder="années"
              class="p-s mb-s"
            >
          </div>
          <div class="tablet-blob-1-2">
            <input
              v-model.number="etape.duree.mois"
              type="number"
              placeholder="mois"
              class="p-s"
            >
          </div>
        </div>
        <label
          v-if="etape.duree.ans || etape.duree.mois"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.duree"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date de début</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model="etape.dateDebut"
          type="date"
          class="p-s"
          placeholder="aaaa-mm-jj"
          :class="{'mb-s': etape.dateDebut, 'mb': !etape.dateDebut}"
        >
        <label
          v-if="etape.dateDebut"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.dateDebut"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date d'échéance</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model="etape.dateFin"
          type="date"
          class="p-s"
          placeholder="aaaa-mm-jj"
          :class="{'mb-s': etape.dateFin, 'mb': !etape.dateFin}"
        >
        <label
          v-if="etape.dateFin"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.dateFin"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Engagement</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <div class="tablet-blobs">
          <div class="tablet-blob-2-3">
            <input
              v-model.number="etape.engagement"
              class="p-s mb-s"
              type="number"
              placeholder="0"
            >
          </div>

          <div class="tablet-blob-1-3">
            <select
              v-model="etape.engagementDeviseId"
              type="text"
              class="p-s"
              :class="{'mb-s': etape.engagement, 'mb': !etape.engagement}"
            >
              <option
                :value="''"
              />
              <option
                v-for="devise in devises"
                :key="devise.id"
                :value="devise.id"
                :disabled="etape.engagementDeviseId === devise.id"
              >
                {{ devise.nom }}
              </option>
            </select>
          </div>
        </div>
        <label
          v-if="etape.engagement"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.engagement"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Surface (Km²)</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model.number="etape.surface"
          class="p-s"
          type="number"
          placeholder="0"
          :class="{'mb-s': etape.surface, 'mb': !etape.surface}"
        >
        <label
          v-if="etape.surface"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.surface"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Volume</h6>
        <p class="h6 italic mb-0">
          Optionel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <div class="tablet-blobs">
          <div class="tablet-blob-2-3">
            <input
              v-model.number="etape.volume"
              class="p-s mb-s"
              type="number"
              placeholder="0"
            >
          </div>

          <div class="tablet-blob-1-3">
            <select
              v-model="etape.volumeUniteId"
              type="text"
              class="p-s"
              :class="{'mb-s': etape.volume, 'mb': !etape.volume}"
            >
              <option
                :value="''"
              />
              <option
                v-for="volumeUnite in volumeUnites"
                :key="volumeUnite.id"
                :value="volumeUnite.id"
                :disabled="etape.volumeUniteId === volumeUnite.id"
              >
                {{ volumeUnite.symbole }}
              </option>
            </select>
          </div>
        </div>
        <label
          v-if="etape.volume"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.volume"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <EtapeEditPoints :etape.sync="etape" />

    <hr>

    <h3 class="mb-s">
      Titulaires ({{ titulairesLength }})
    </h3>
    <p class="h6 italic mb-s">
      Optionel
    </p>
    <div
      v-for="(titulaireId, n) in etape.titulairesIds"
      :key="`titluaire-${titulaireId}`"
    >
      <div
        class="flex full-x"
        :class="{'mb-s': titulairesLength, 'mb': !titulairesLength}"
      >
        <select
          v-model="etape.titulairesIds[n]"
          type="text"
          class="p-s mr-s"
        >
          <option
            v-for="entreprise in entreprises"
            :key="`titulaire-${titulaireId}-entreprise-${entreprise.id}`"
            :value="entreprise.id"
            :disabled="etape.titulairesIds.find(id => id === entreprise.id)"
          >
            {{ entreprise.nom }} ({{ entreprise.id }})
          </option>
        </select>
        <div class="flex-right">
          <button
            class="btn-border py-s px-m rnd-xs"
            @click="titulaireRemove(n)"
          >
            <i class="icon-24 icon-minus" />
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="!etape.titulairesIds.includes('')"
      class="btn-border rnd-xs py-s px-m full-x flex"
      :class="{'mb-s': titulairesLength, 'mb': !titulairesLength}"
      @click="titulaireAdd"
    >
      Ajouter un titulaire<i class="icon-24 icon-plus flex-right" />
    </button>

    <label
      v-if="titulairesLength"
      class="h5"
    >
      <input
        v-model="etape.incertitudes.titulaires"
        type="checkbox"
      >donnée incertaine
    </label>
    <hr>

    <h3 class="mb-s">
      Amodiataires ({{ amodiatairesLength }})
    </h3>
    <p class="h6 italic mb-s">
      Optionel
    </p>
    <div
      v-for="(amodiataireId, n) in etape.amodiatairesIds"
      :key="`amodiataire-${amodiataireId}`"
    >
      <div
        class="flex full-x"
        :class="{'mb-s': amodiatairesLength, 'mb': !amodiatairesLength}"
      >
        <select
          v-model="etape.amodiatairesIds[n]"
          type="text"
          class="p-s mr-s"
        >
          <option
            v-for="entreprise in entreprises"
            :key="`amodiataire-${amodiataireId}-entreprise-${entreprise.id}`"
            :value="entreprise.id"
            :disabled="etape.amodiatairesIds.find(id => id === entreprise.id)"
          >
            {{ entreprise.nom }} ({{ entreprise.id }})
          </option>
        </select>

        <div class="flex-right">
          <button
            class="btn-border py-s px-m rnd-xs"
            @click="amodiataireRemove(n)"
          >
            <i class="icon-24 icon-minus" />
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="!etape.amodiatairesIds.includes('')"
      class="btn-border rnd-xs py-s px-m full-x flex"
      :class="{'mb-s': amodiatairesLength, 'mb': !amodiatairesLength}"
      @click="amodiataireAdd"
    >
      Ajouter un amodiataire<i class="icon-24 icon-plus flex-right" />
    </button>

    <label
      v-if="amodiatairesLength"
      class="h5"
    >
      <input
        v-model="etape.incertitudes.amodiataires"
        type="checkbox"
      >donnée incertaine
    </label>
    <hr>

    <h3 class="mb-s">
      Substances ({{ substancesLength }})
    </h3>
    <p class="h6 italic mb-s">
      Optionel
    </p>
    <div
      v-for="(substanceId, n) in etape.substancesIds"
      :key="n"
    >
      <div
        class="flex full-x"
        :class="{'mb-s': substancesLength, 'mb': !substancesLength}"
      >
        <select
          v-model="etape.substancesIds[n]"
          type="text"
          class="p-s mr-s"
        >
          <option
            v-for="substance in substances"
            :key="substance.id"
            :value="substance.id"
            :disabled="etape.substancesIds.find(id => id === substance.id)"
          >
            {{ substance.nom }}
          </option>
        </select>
        <div class="flex-right">
          <button
            class="btn-border py-s px-m rnd-xs"
            @click="substanceRemove(n)"
          >
            <i class="icon-24 icon-minus" />
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="!etape.substancesIds.includes('')"
      class="btn-border rnd-xs py-s px-m full-x flex"

      :class="{'mb-s': substancesLength, 'mb': !substancesLength}"
      @click="substanceAdd"
    >
      Ajouter une substance<i class="icon-24 icon-plus flex-right" />
    </button>

    <label
      v-if="substancesLength"
      class="h5"
    >
      <input
        v-model="etape.incertitudes.substances"
        type="checkbox"
      >donnée incertaine
    </label>
    <hr>
  </div>
</template>

<script>
import EtapeEditPoints from './etape-edit-points.vue'
export default {
  components: {
    EtapeEditPoints
  },

  props: {
    etape: {
      type: Object,
      default: () => ({})
    },

    domaineId: {
      type: String,
      default: ''
    }
  },

  computed: {
    entreprises() {
      return this.$store.state.entreprises.list
    },

    substances() {
      return this.$store.state.substances.list.filter(su =>
        su.legales.find(sl => sl.domaine.id === this.domaineId)
      )
    },

    devises() {
      return this.$store.state.metas.devises
    },

    volumeUnites() {
      return this.$store.state.metas.unites.filter(
        ({ type }) => type === 'volume'
      )
    },

    titulairesLength() {
      return this.etape.titulairesIds.filter(id => id).length
    },

    amodiatairesLength() {
      return this.etape.amodiatairesIds.filter(id => id).length
    },

    substancesLength() {
      return this.etape.substancesIds.filter(id => id).length
    }
  },

  methods: {
    titulaireAdd() {
      this.etape.titulairesIds.push('')
    },

    titulaireRemove(index) {
      this.etape.titulairesIds.splice(index, 1)
    },

    amodiataireAdd() {
      this.etape.amodiatairesIds.push('')
    },

    amodiataireRemove(index) {
      this.etape.amodiatairesIds.splice(index, 1)
    },

    substanceAdd() {
      this.etape.substancesIds.push('')
    },

    substanceRemove(index) {
      this.etape.substancesIds.splice(index, 1)
    }
  }
}
</script>

