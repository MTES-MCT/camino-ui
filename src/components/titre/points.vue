<template>
  <div class="points">
    <div
      v-for="(groupe, groupeIndex) in groupes"
      :key="groupeIndex + 1"
      class="geo-groupe"
    >
      <h4
        v-if="groupes.length > 1"
        class="color-bg pl-s mb-s"
      >
        Groupe {{ groupeIndex + 1 }}
      </h4>
      <div
        v-for="(contour, contourIndex) in groupe"
        :key="contourIndex + 1"
        class="geo-contour"
      >
        <h4
          v-if="groupe.length > 1 && contourIndex === 0"
          class="pl-s mb-s"
        >
          Contour
        </h4>
        <h4
          v-else-if="groupe.length > 1"
          class="pl-s mb-s"
        >
          Lacune {{ contourIndex }}
        </h4>
        <div
          v-for="(point, pointIndex) in contour"
          :key="pointIndex + 1"
          class="geo-point flex"
        >
          <h4 class="mb-s flex-self-start mr-s">
            {{ point.nom }}
          </h4>
          <div class="flex-grow">
            <div class="tablet-blobs">
              <div class="tablet-blob-1-4">
                <h6 class="mb-s mt-xs">
                  WGS84 (degré)
                </h6>
              </div>
              <div class="tablet-blob-3-8">
                <p class="h5 flex mb-s mt-xs">
                  X : <span class="flex-right mono bold">{{ point.coordonnees.x.toFixed(9) }}</span>
                </p>
              </div>
              <div class="tablet-blob-3-8">
                <p class="h5 flex mb-s mt-xs">
                  Y : <span class="flex-right mono bold">{{ point.coordonnees.y.toFixed(9) }}</span>
                </p>
              </div>
            </div>

            <div
              v-for="reference in point.references"
              :key="reference.id"
              class="tablet-blobs"
            >
              <div class="tablet-blob-1-4">
                <h6 class="mb-s mt-xs">
                  {{ reference.geoSysteme.nom }} ({{ reference.geoSysteme.unite }})
                </h6>
              </div>
              <div class="tablet-blob-3-8">
                <p class="h5 flex mb-s mt-xs">
                  X : <span class="flex-right mono bold">{{ reference.coordonnees.x }}</span>
                </p>
              </div>
              <div class="tablet-blob-3-8">
                <p class="h5 flex mb-s mt-xs">
                  Y : <span class="flex-right mono bold">{{ reference.coordonnees.y }}</span>
                </p>
              </div>
            </div>
            <p
              v-if="point.description"
              class="mb-s h5"
            >
              {{ point.description }}
            </p>
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
  },

  computed: {
    groupes() {
      return this.points.reduce((groupes, point) => {
        groupes[point.groupe - 1] = groupes[point.groupe - 1] || []
        groupes[point.groupe - 1][point.contour - 1] =
          groupes[point.groupe - 1][point.contour - 1] || []
        groupes[point.groupe - 1][point.contour - 1][point.point - 1] = {
          id: point.id,
          nom: point.nom,
          groupe: point.groupe,
          contour: point.contour,
          point: point.point,
          coordonnees: point.coordonnees,
          description: point.description,
          references: point.references
        }

        return groupes
      }, [])
    }
  }
}
</script>
