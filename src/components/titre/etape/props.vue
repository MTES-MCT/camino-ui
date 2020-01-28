<template>
  <div
    class="px-m pt-m border-b-s"
  >
    <div
      v-if="etape.duree"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Durée
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          <span v-if="duree.ans">{{ `${duree.ans} an${duree.ans > 1 ? 's' : ''}` }}</span><span v-if="duree.ans && duree.mois"> et </span>
          <span v-if="duree.mois">{{ `${duree.mois} mois` }}</span>
          <span
            v-if="etape.incertitudes && etape.incertitudes.duree"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </p>
      </div>
    </div>

    <div
      v-if="etape.dateDebut"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Date de début
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          {{ etape.dateDebut | dateFormat }}
          <span
            v-if="etape.incertitudes && etape.incertitudes.dateDebut"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </p>
      </div>
    </div>
    <div
      v-if="etape.dateFin"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Date d'échéance
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          {{ etape.dateFin | dateFormat }}
          <span
            v-if="etape.incertitudes && etape.incertitudes.dateFin"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </p>
      </div>
    </div>
    <div
      v-if="etape.points.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Périmètre
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          –
          <span
            v-if="etape.incertitudes && etape.incertitudes.points"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </p>
      </div>
    </div>
    <div
      v-if="etape.titulaires.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Titulaire{{ etape.titulaires.length > 1 ? 's' : '' }}
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <ul class="list-prefix mb">
          <li
            v-for="t in etape.titulaires"
            :key="t.id"
          >
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.titulaires"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="etape.amodiataires.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Amodiataire{{ etape.amodiataires.length > 1 ? 's' : '' }}
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <ul class="list-prefix">
          <li
            v-for="t in etape.amodiataires"
            :key="t.id"
          >
            {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.amodiataires"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="etape.engagement"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Engagement financier
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          {{ numberFormat(etape.engagement) }}
          <span v-if="etape.engagementDevise"> {{ etape.engagementDevise.id }}</span>
          <span
            v-if="etape.incertitudes && etape.incertitudes.engagement"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </p>
      </div>
    </div>
    <div
      v-if="etape.volume"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Volume
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <p>
          {{ numberFormat(etape.volume) }}
          <span v-if="etape.volumeUnite"> {{ etape.volumeUnite.symbole }}</span>
          <span
            v-if="etape.incertitudes && etape.incertitudes.volume"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </p>
      </div>
    </div>
    <div
      v-if="etape.substances.length"
      class="tablet-blobs"
    >
      <div class="tablet-blob-1-4">
        <h6>
          Substance{{ etape.substances.length > 1 ? 's' : '' }}
        </h6>
      </div>
      <div class="tablet-blob-3-4">
        <PillList :elements="etape.substances.map(s => s.nom)" />
        <span
          v-if="etape.incertitudes && etape.incertitudes.substances"
          class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
        >?</span>
      </div>
    </div>

    <div v-if="incertitudesLength">
      <p class="h5">
        <span
          class="bg-info py-xxs px-xs rnd-xs color-bg bold"
        >?</span>&nbsp;: Donnée incertaine
      </p>
    </div>
  </div>
</template>

<script>
import PillList from '../../_ui/pill-list.vue'

export default {
  components: {
    PillList
  },
  props: {
    etape: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    duree() {
      return {
        ans: this.etape.duree && Math.floor(this.etape.duree / 12),
        mois: this.etape.duree && Math.floor(this.etape.duree % 12)
      }
    },

    incertitudesLength() {
      return (
        this.etape.incertitudes &&
        Object.keys(this.etape.incertitudes).reduce((res, i) => {
          if (this.etape.incertitudes[i] && i !== '__typename') {
            res++
          }
          return res
        }, 0)
      )
    }
  },

  methods: {
    etablissementNameFind(etablissements, date) {
      if (!etablissements || !etablissements.length) {
        return null
      }

      const etablissement = etablissements.find(
        e =>
          (e.dateDebut < date && (!e.dateFin || e.dateFin > date)) ||
          !e.dateDebut
      )

      return etablissement && etablissement.nom
    }
  }
}
</script>
