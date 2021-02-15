<template>
  <div>
    <div class="mb">
      <div class="flex">
        <h6 class="mb-xs">Description</h6>
        <p class="h6 italic mb-0 flex-right mr-xs">Optionnel</p>
      </div>
      <input v-model="point.description" type="text" class="p-s" />
    </div>

    <h6>
      Coordonnées en {{ etapeGeoSysteme.nom }} ({{ etapeGeoSysteme.unite.nom }})
    </h6>
    <textarea
      class="p-s mb-s mono"
      :value="point.references.join('\n')"
      placeholder="1,4769;47,3469"
      @blur="pointsLotUpdate($event)"
      @focus="pointsLotEdit"
    />

    <div class="h5 p-s">
      <ul class="list-prefix">
        <li>Ce champ contient une paire de coordonnées par ligne.</li>
        <li>
          Les coordonnées sont au format décimal, quelle que soit l'unité.
        </li>
        <li>
          Les coordonnées
          <span class="mono bg-alt p-xxs color-text">x;y</span> sont séparées
          par un point-virgule, sans espace.
        </li>
        <li>
          Le séparateur entre les unités et les décimales est une virgule.
        </li>
      </ul>
      <p class="mb-s">
        Exemple:
        <span class="mono bg-alt px-xs py-xxs color-text">1,4769;47,3469</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    point: { type: Object, default: () => ({}) },
    geoSystemeIds: { type: Array, required: true },
    geoSystemeOpposableId: { type: String, required: true },
    events: { type: Object, default: () => ({ saveKeyUp: true }) }
  },

  computed: {
    etapeGeoSysteme() {
      const geoSystemeId = this.geoSystemeOpposableId || this.geoSystemeIds[0]

      return this.$store.state.titreEtape.metas.geoSystemes.find(
        ({ id }) => id === geoSystemeId
      )
    }
  },

  methods: {
    pointsLotEdit() {
      // lorsque l'on édite un lot,
      // désactive la validation du formulaire avec `enter`
      this.events.saveKeyUp = false
    },

    pointsLotUpdate(event, groupeIndex, contourIndex, pointIndex) {
      const coordonnees = event.target.value.split('\n').filter(c => c)

      if (coordonnees) {
        this.point.references = coordonnees
      }

      this.events.saveKeyUp = true
    }
  }
}
</script>
