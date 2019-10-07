<template>
  <div class="points">
    <div
      v-if="geoSystemeId"
    >
      <div class="tablet-blobs px-l flex-align-items-stretch">
        <div class="tablet-blob-1-2">
          <select
            v-if="geoSystemes.length > 1"
            v-model="geoSystemeId"
            type="text"
            class="p-s mr-s mb-s"
          >
            <option
              v-for="geoSysteme in geoSystemes"
              :key="geoSysteme.id"
              :value="geoSysteme.id"
            >
              {{ geoSysteme.nom }} ({{ geoSysteme.id }}) {{ geoSysteme.opposable ? '(opposable)' : '' }}
            </option>
          </select>
          <div
            v-else
            class="full-x p-s bg-alt mb-s"
          >
            {{ geoSystemes[0].nom }} ({{ geoSystemes[0].id }})
          </div>
        </div>
        <div class="tablet-blob-1-2 flex flex-align-items-stretch">
          <div class="blobs flex-grow flex-align-items-stretch mb-s">
            <div class="blob-1-2 full-y">
              <h6 class="full-y border-l pl-s pt-xs">
                X
              </h6>
            </div>
            <div class="blob-1-2 full-y">
              <h6 class="full-y border-l pl-s pt-xs">
                Y
              </h6>
            </div>
          </div>
        </div>
      </div>
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
            class="geo-point"
          >
            <div class="tablet-blobs">
              <div class="tablet-blob-1-2 flex">
                <h4 class="mb-0 flex-self-start mr-s">
                  {{ point.nom }}
                </h4>
                <p
                  v-if="point.description"
                  class="mb-0 h5 flex-grow pt-xs"
                >
                  {{ point.description }}
                </p>
              </div>
              <div class="tablet-blob-1-2">
                <div class="blobs">
                  <div class="blob-1-2">
                    <p class="h5 flex mb-s mt-xs border-l">
                      <span class="flex-right mono bold">{{ Math.round(point.references[geoSystemeId].coordonnees.x * 1000000) / 1000000 }}</span>
                    </p>
                  </div>
                  <div class="blob-1-2">
                    <p class="h5 flex mb-s mt-xs border-l">
                      <span class="flex-right mono bold">{{ Math.round(point.references[geoSystemeId].coordonnees.y * 1000000) / 1000000 }}</span>
                    </p>
                  </div>
                </div>
              </div>
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

  data() {
    return { geoSystemeId: '' }
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
            references: references.reduce((res, r) => {
              if (!res[r.geoSysteme.id]) {
                res[r.geoSysteme.id] = r
              }

              return res
            }, {})
          }

          return groupes
        },
        []
      )
    },

    geoSystemes() {
      const geoSystemesObject = this.points.reduce(
        (geoSystemes, { references }) => {
          const pointGeoSystemes = references.reduce(
            (
              pointGeoSystemes,
              { geoSysteme, unite, coordonnees, opposable }
            ) => {
              if (!pointGeoSystemes[geoSysteme.id]) {
                pointGeoSystemes[geoSysteme.id] = {
                  id: geoSysteme.id,
                  nom: geoSysteme.nom,
                  uniteId: unite.id,
                  uniteType: unite.type,
                  opposable
                }
              }

              return pointGeoSystemes
            },
            {}
          )

          return Object.assign(geoSystemes, pointGeoSystemes)
        },
        {}
      )

      return Object.keys(geoSystemesObject).map(
        geoSystemeId => geoSystemesObject[geoSystemeId]
      )
    }
  },

  created() {
    this.geoSystemeId = this.geoSystemes[0].id
  }
}
</script>
