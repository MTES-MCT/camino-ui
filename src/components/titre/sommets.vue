<template>
  <div>
    <div
      v-for="point in points"
      :key="point.id"
    >
      <h4>
        {{ point.nom }}
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
          v-if="!reference.coordoonnees"
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
