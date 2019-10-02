<template>
  <div class="points">
    <div
      v-for="(groupeContours, groupeIndex) in groupes"
      :key="groupeIndex + 1"
      class="geo-groupe mb"
    >
      <h4
        v-if="groupes.length > 1"
        class="color-bg pl-s mb-s"
      >
        Groupe {{ groupeIndex + 1 }}
      </h4>
      <div
        v-for="(contourPoints, contourIndex) in groupeContours"
        :key="contourIndex + 1"
        class="geo-contour"
      >
        <h4
          v-if="groupeContours.length > 1"
          class="pl-s mb-s"
        >
          {{ contourIndex === 0 ? 'Contour' : `Lacune ${contourIndex}` }}
        </h4>
        <div
          v-for="(point) in contourPoints"
          :key="point.id"
          class="geo-point flex"
        >
          <h4 class="mb-s flex-self-start mr-s">
            {{ point.nom }}
          </h4>
          <div class="flex-grow">
            <div
              v-for="reference in point.references"
              :key="reference.id"
              class="tablet-blobs"
            >
              <div class="tablet-blob-1-2">
                <p class="h6 mb-s mt-xs inline-block">
                  <span class="bold">{{ reference.geoSysteme.nom }}</span>  ({{ reference.unite.nom }}) <span
                    v-if="reference.opposable"
                    class="h5 bg-info py-xxs px-xs rnd-xs color-bg"
                  >Opposable</span>
                </p>
              </div>
              <div class="tablet-blob-1-4">
                <p class="h5 flex mb-s mt-xs">
                  X : <span class="flex-right mono bold">{{ reference.coordonnees.x }}</span>
                </p>
              </div>
              <div class="tablet-blob-1-4">
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
      return this.points.reduce(
        (
          groupes,
          { id, nom, description, references, point, contour, groupe }
        ) => {
          groupes[groupe - 1] = groupes[groupe - 1] || []
          groupes[groupe - 1][contour - 1] =
            groupes[groupe - 1][contour - 1] || []
          groupes[groupe - 1][contour - 1][point - 1] = {
            id,
            nom,
            description,
            references
          }

          return groupes
        },
        []
      )
    },

    geoSystemes() {
      return this.points.reduce((geoSystemes, { references }) => {
        const pointGeoSystemes = references.reduce(
          (pointGeoSystemes, { geoSysteme, unite, coordonnees }) => {
            pointGeoSystemes[geoSysteme.id] = {
              id: geoSysteme.id,
              nom: geoSysteme.nom,
              uniteId: unite.id,
              uniteType: unite.type
            }

            return pointGeoSystemes
          },
          {}
        )

        return Object.assign(geoSystemes, pointGeoSystemes)
      }, {})
    }
  }
}
</script>
