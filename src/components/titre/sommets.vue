<template>
  <div class="sommets">
    <div
      v-for="(groupe, groupeIndex) in groupes"
      :key="groupeIndex + 1"
      :class="{'geo-groupe': groupes.length > 1}"
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
        :class="{'geo-contour': groupe.length > 1}"
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
          Trou {{ contourIndex }}
        </h4>
        <div
          v-for="(point, pointIndex) in contour"
          :key="pointIndex + 1"
          class="geo-point"
        >
          <div class="tablet-blobs">
            <div class="tablet-blob-1-4">
              <h4 class="mb-s inline-block">
                {{ point.nom }}.
              </h4> <h6 class="mb-s inline-block">
                WGS84
              </h6>
            </div>
            <div class="tablet-blob-3-8">
              <p class="mb-s text-right mono">
                {{ point.coordonnees.x.toFixed(9) }}
              </p>
            </div>
            <div class="tablet-blob-3-8">
              <p class="mb-s text-right mono">
                {{ point.coordonnees.y.toFixed(9) }}
              </p>
            </div>
          </div>

          <div
            v-for="reference in point.references"
            :key="reference.id"
            class="tablet-blobs"
          >
            <div class="tablet-blob-1-4">
              <h6 class="mb-s">
                {{ reference.geoSysteme.nom }}
              </h6>
            </div>
            <div class="tablet-blob-3-8">
              <p class="mb-s text-right mono">
                {{ reference.coordonnees.x }}
              </p>
            </div>
            <div class="tablet-blob-3-8">
              <p class="mb-s text-right mono">
                {{ reference.coordonnees.y }}
              </p>
            </div>
          </div>

          <div
            v-if="point.description"
            class="tablet-blobs"
          >
            <div class="mb tablet-blob-1-4">
              <h6 class="mb-s">
                Description
              </h6>
            </div>
            <div class="mb tablet-blob-3-4">
              <p class="mb-s h5">
                {{ point.description }}
              </p>
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
