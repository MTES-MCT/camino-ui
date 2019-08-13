<template>
  <div>
    <h3 class="mb-s">
      Périmètre ({{ pointsTotal.length }} point{{ pointsTotal.length > 1 ? 's' : '' }})
    </h3>
    <div class="h5 mb-s">
      <ul class="list-prefix">
        <li>
          <b>Groupe</b>: ensemble de contours. Le premier contour du groupe définit un périmètre, les contours suivants définissent des trous dans ce périmètre.
        </li>
        <li>
          <b>Contour</b>: ensemble de points.
        </li>
        <li>
          <b>Point</b>: sommet d'un contour défini par ses coordoonnées dans le système WGS 84.
        </li>
        <li>
          <b>Références</b>: coordonnées du point dans des systèmes autre que WGS 84.
        </li>
        <li>
          <b>Système</b>: système géodésique de la référence.
        </li>
      </ul>
    </div>
    <hr>
    <div
      v-for="(contours, groupeIndex) in etape.groupes"
      :key="groupeIndex + 1"
      class="pt pb-s pl-s border mb rnd-s bg-neutral"
    >
      <h4 class="color-bg">
        Groupe {{ groupeIndex + 1 }}
      </h4>
      <div
        v-for="(points, contourIndex) in contours"
        :key="contourIndex + 1"
        class="pt pb-s pl-s border mb-s rnd-l-s bg-alt"
      >
        <h4>Contour {{ contourIndex + 1 }}</h4>
        <div
          v-for="(point, pointIndex) in points"
          :key="pointIndex + 1"
          class="pt pb-s pl-s pr-s border mb-s rnd-l-s bg-bg"
        >
          <div class="flex full-x">
            <h4>Point {{ point.nom }}</h4>
            <div class="flex-right">
              <button
                class="btn-border py-s px-m rnd-s mt--s"
                @click="pointRemove(groupeIndex, contourIndex, pointIndex)"
              >
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="mb tablet-blob-1-3">
              <h6>Groupe</h6>
              <select
                v-model="point.groupe"
                type="text"
                class="p-s mr-s"
              >
                <option
                  v-for="g in arrayOfNumbersCreate(points.length > 1 ? etape.groupes.length + 1: etape.groupes.length)"
                  :key="`g-${g}`"
                  :value="g"
                >
                  {{ g }}
                </option>
              </select>
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Contour</h6>
              <select
                v-model="point.contour"
                type="text"
                class="p-s mr-s"
              >
                <option
                  v-for="c in arrayOfNumbersCreate(points.length > 1 ? contours.length + 1: contours.length)"
                  :key="`g-${point.groupe}-c-${c}`"
                  :value="c"
                >
                  {{ c }}
                </option>
              </select>
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Point</h6>
              <select
                v-model="point.point"
                type="text"
                class="p-s mr-s"
              >
                <option
                  v-for="p in arrayOfNumbersCreate(points.length > 1 ? points.length + 1: points.length)"
                  :key="`g-${point.groupe}-c-${point.contour}-p-${p}`"
                  :value="p"
                >
                  {{ p }}
                </option>
              </select>
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="mb tablet-blob-1-3">
              <h6>Nom</h6>
              <input
                v-model="point.nom"
                type="text"
                class="p-s"
              >
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Longitude</h6>
              <input
                v-model.number="point.coordonnees.x"
                type="text"
                class="p-s"
              >
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Latitude</h6>
              <input
                v-model.number="point.coordonnees.y"
                type="text"
                class="p-s"
              >
            </div>
          </div>

          <div class="tablet-blobs">
            <div class="mb tablet-blob-1">
              <h6>Description</h6>
              <input
                v-model="point.description"
                type="text"
                class="p-s"
              >
            </div>
          </div>

          <div
            v-for="reference in point.references"
            :key="reference.id"
          >
            <div class="flex full-x">
              <h4>Reference</h4>
              <div class="flex-right">
                <button
                  class="btn-border py-s px-m rnd-xs mt--s"
                  @click="pointReferenceRemove(point, reference)"
                >
                  <i class="icon-24 icon-minus" />
                </button>
              </div>
            </div>
            <div class="tablet-blobs">
              <div class="mb tablet-blob-1-3">
                <h6>Système</h6>

                <select
                  v-model="reference.geoSystemeId"
                  type="text"
                  class="p-s mr-s"
                >
                  <option
                    v-for="geoSysteme in geoSystemes"
                    :key="`reference-${reference.id}-systeme-${geoSysteme.id}`"
                    :value="geoSysteme.id"
                  >
                    {{ geoSysteme.nom }} ({{ geoSysteme.id }})
                  </option>
                </select>
              </div>
              <div class="mb tablet-blob-1-3">
                <h6>Longitude</h6>
                <input
                  v-model.number="reference.coordonnees.x"
                  type="text"
                  class="p-s"
                >
              </div>
              <div class="mb tablet-blob-1-3">
                <h6>Latitude</h6>
                <input
                  v-model.number="reference.coordonnees.y"
                  type="text"
                  class="p-s"
                >
              </div>
            </div>
          </div>

          <div
            v-if="!point.references.find(r => r.id === '')"
            class="hide"
          >
            <button
              class="btn-border rnd-xs py-s px-m full-x flex"
              @click="pointReferenceAdd(point)"
            >
              Ajouter une référence <i class="icon-24 icon-plus flex-right" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      class="btn-border rnd-xs py-s px-m full-x mb flex"
      @click="pointAdd"
    >
      Ajouter un point<i class="icon-24 icon-plus flex-right" />
    </button>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    etape: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    geoSystemes() {
      return this.$store.state.metas.geoSystemes
    },

    pointsTotal() {
      return this.etape.groupes.reduce((pointsTotal, contours) => {
        pointsTotal = pointsTotal.concat(
          contours.reduce((pointsTotal, points) => {
            pointsTotal = pointsTotal.concat(points)

            return pointsTotal
          }, [])
        )

        return pointsTotal
      }, [])
    }
  },

  methods: {
    arrayOfNumbersCreate(length) {
      return [...Array(length).keys()].map(i => i + 1)
    },

    pointAdd() {
      if (!this.etape.groupes.length) {
        this.etape.groupes = [[[]]]
      }
      const contours = this.etape.groupes[this.etape.groupes.length - 1]
      const points = contours[contours.length - 1]

      const groupe = this.etape.groupes.length
      const contour = contours.length
      const point = points.length + 1

      points.push({
        groupe,
        contour,
        point,
        coordonnees: { x: '', y: '' },
        references: []
      })
    },

    pointRemove(groupeIndex, contourIndex, pointIndex) {
      this.etape.groupes[groupeIndex][contourIndex].splice(pointIndex, 1)
    },

    pointReferenceAdd(point) {
      const reference = { id: '', coordonnees: { x: '', y: '' } }
      point.references.push(reference)
    },

    pointReferenceRemove(point, reference) {
      const index = point.references.findIndex(r => r.id === reference.id)
      point.references.splice(index, 1)
    }
  }
}
</script>
