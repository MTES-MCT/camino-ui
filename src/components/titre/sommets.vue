<template>
  <div>
    <div
      v-for="groupe in points.reduce((arr, point) => arr.indexOf(point.groupe) === -1 ? [...arr, point.groupe] : arr, [])"
      :key="groupe"
      class="mb"
    >
      <h2> Groupe {{ groupe }} </h2>
      <div
        v-for="contour in points.reduce((arr, point) => (point.groupe === groupe && arr.indexOf(point.contour)) === -1 ? [...arr, point.contour] : arr, [])"
        :key="contour"
        class="mb"
      >
        <h3> Contour {{ contour }} </h3>
        <div
          v-for="point in points.filter(point => point.groupe === groupe && point.contour === contour)"
          :key="point.id"
        >
          <h4>
            Point {{ point.nom }}
          </h4>
          <div
            v-if="!point.coordoonnees"
            class="tablet-blobs"
          > 
            <h6 class="tablet-blob-1-3">
              WGS84
            </h6>
            <div class="tablet-blob-2-3">
              <div class="mobile-blobs">
                <div class="mobile-blob-1-2">
                  x: {{ point.coordonnees.x }}
                </div>
                <div class="mobile-blob-2-2">
                  y: {{ point.coordonnees.y }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-for="reference in point.references"
            :key="reference.id"
          >
            <div
              v-if="!reference.coordoonnees && reference.geoSysteme.id !== '4326'"
              class="tablet-blobs"
            > 
              <h6 class="tablet-blob-1-3">
                {{ reference.geoSysteme.nom }}
              </h6>
              <div class="tablet-blob-2-3">
                <div class="mobile-blobs">
                  <div class="mobile-blob-1-2">
                    x: {{ reference.coordonnees.x }}
                  </div>
                  <div class="mobile-blob-2-2">
                    y: {{ reference.coordonnees.y }}
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div
            v-if="point.description"
            class="tablet-blobs"
          > 
            <h6 class="tablet-blob-1-3">
              Description
            </h6>
            <div class="tablet-blob-2-3">
              {{ point.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    points: {
      type: Array,
      default: () => []
    }
  }
}
</script>
