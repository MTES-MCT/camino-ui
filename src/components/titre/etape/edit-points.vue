<template>
  <div>
    <h3 class="mb-s">
      Périmètre
    </h3>
    <p class="h6 italic mb-s">
      Optionel
    </p>

    <EtapeEditPointsGeoSysteme
      :etape.sync="etape"
      :etape-geo-systeme-ids.sync="etapeGeoSystemeIds"
    />

    <div v-if="etapeGeoSystemeIds.length">
      <hr>
      <div class="h5 mb-s">
        <ul class="list-prefix">
          <li>
            <b>Point</b>: paire de coordoonnées.
          </li>
          <li>
            <b>Contour ou lacune</b>: ensemble de points.
          </li>
          <li>
            <b>Groupe</b>: ensemble de contours.
          </li>
        </ul>
        <p>Le premier contour d'un groupe définit un périmètre. Les contours suivants définissent des lacunes au sein de ce périmètre.</p>
      </div>

      <div
        v-for="(groupeContours, groupeIndex) in etape.groupes"
        :key="groupeIndex + 1"
        class="geo-groupe mb-s"
      >
        <div
          v-if="etape.groupes.length > 1"
          class="flex flex-full"
        >
          <h4 class="pl-s color-bg mb-s">
            Groupe {{ groupeIndex + 1 }}
          </h4>
          <div class="flex-right hide">
            <button
              class="btn-border py-s px-m rnd-xs"
              @click="groupeRemove(groupeIndex)"
            >
              <i class="icon-24 icon-minus" />
            </button>
          </div>
        </div>
        <div
          v-for="(contourPoints, contourIndex) in groupeContours"
          :key="contourIndex + 1"
          class="geo-contour"
        >
          <div
            v-if="groupeContours.length > 1"
            class="flex flex-full"
          >
            <h4 class="pl-s mb-s">
              {{ contourIndex === 0 ? 'Contour' : `Lacune ${contourIndex}` }}
            </h4>
            <div class="flex-right hide">
              <button
                class="btn-border py-s px-m rnd-xs"
                @click="contourRemove(groupeIndex, contourIndex)"
              >
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>
          <div
            v-for="(point, pointIndex) in contourPoints"
            :key="pointIndex + 1"
            class="geo-point"
          >
            <div class="flex full-x">
              <h4
                v-if="point.lot"
                class="mt-s"
              >
                Lot de points
              </h4>
              <h4
                v-else
                class="mt-s"
              >
                Point {{ point.nom }}
              </h4>
              <div class="flex-right">
                <button
                  v-if="!(etape.groupes.length === groupeIndex + 1 && groupeContours.length === contourIndex + 1 && contourPoints.length === pointIndex + 1)"
                  class="btn-border py-s px-m rnd-l-xs"
                  @click="pointMoveDown(groupeIndex, contourIndex, pointIndex)"
                >
                  <i class="icon-24 icon-move-down" />
                </button>
                <button
                  v-if="!(groupeIndex === 0 && contourIndex === 0 && pointIndex === 0)"
                  :class="{'rnd-l-xs': (etape.groupes.length === groupeIndex + 1 && groupeContours.length === contourIndex + 1 && contourPoints.length === pointIndex + 1)}"
                  class="btn-border py-s px-m"
                  @click="pointMoveUp(groupeIndex, contourIndex, pointIndex)"
                >
                  <i class="icon-24 icon-move-up" />
                </button>
                <button
                  class="btn-border py-s px-m rnd-r-xs"
                  @click="pointRemove(groupeIndex, contourIndex, pointIndex)"
                >
                  <i class="icon-24 icon-minus" />
                </button>
              </div>
            </div>

            <EtapeEditPointsPoint
              v-if="!point.lot"
              :point.sync="point"
              :etape.sync="etape"
            />
            <EtapeEditPointsLot
              v-else
              :point.sync="point"
              :etape.sync="etape"
              :etape-geo-systeme-ids="etapeGeoSystemeIds"
              :events="events"
            />
          </div>

          <button
            class="btn-border rnd-s py-s px-m full-x mb-s flex"
            @click="pointAdd(groupeIndex, contourIndex)"
          >
            Ajouter un point<i class="icon-24 icon-plus flex-right" />
          </button>

          <button
            class="btn-border rnd-s py-s px-m full-x mb-s flex"
            @click="lotAdd(groupeIndex, contourIndex)"
          >
            Ajouter un lot de points<i class="icon-24 icon-plus flex-right" />
          </button>
        </div>
        <button
          v-if="groupeContours.length && groupeContours[0].length"
          class="btn-border rnd-s py-s px-m full-x mb-s flex"
          @click="contourAdd(groupeIndex)"
        >
          Ajouter {{ groupeContours.length >= 1 ? 'une lacune' : 'un contour' }}<i class="icon-24 icon-plus flex-right" />
        </button>
      </div>

      <button
        v-if="etape.groupes.length && etape.groupes[0].length && etape.groupes[0][0].length"
        class="btn-border rnd-s py-s px-m full-x mb-s flex"
        @click="groupeAdd"
      >
        Ajouter un groupe<i class="icon-24 icon-plus flex-right" />
      </button>

      <label
        v-if="pointsTotal.length"
        class="h5"
      >
        <input
          v-model="etape.incertitudes.points"
          type="checkbox"
        >donnée incertaine
      </label>
    </div>
  </div>
</template>

<script>
import EtapeEditPointsGeoSysteme from './edit-points-geo-systemes.vue'
import EtapeEditPointsPoint from './edit-points-point.vue'
import EtapeEditPointsLot from './edit-points-lot.vue'

export default {
  components: {
    EtapeEditPointsGeoSysteme,
    EtapeEditPointsPoint,
    EtapeEditPointsLot
  },

  props: {
    etape: { type: Object, default: () => ({}) },
    events: { type: Object, default: () => ({ saveKeyUp: true }) }
  },

  computed: {
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
    },

    etapeGeoSystemeIds() {
      return this.etape.geoSystemes.reduce((acc, { id }) => {
        if (id) {
          acc.push(id)
        }

        return acc
      }, [])
    }
  },

  methods: {
    clean(groupes, groupeIndex, contourIndex) {
      const contours = groupes[groupeIndex]
      const points = contours[contourIndex]

      if (
        !points.length &&
        (groupes.length > 1 || contours.some(points => points.length > 1))
      ) {
        contours.splice(contourIndex, 1)
        if (!contours.length && groupes.length > 1) {
          groupes.splice(groupeIndex, 1)
        }
      }
    },

    referencesInit() {
      return this.etapeGeoSystemeIds.reduce((references, geoSystemeId) => {
        references[geoSystemeId] = [0, 0]

        return references
      }, {})
    },

    pointAdd(groupeIndex, contourIndex) {
      this.etape.groupes[groupeIndex][contourIndex].push({
        groupe: groupeIndex + 1,
        contour: contourIndex + 1,
        point: this.etape.groupes[groupeIndex][contourIndex].length,
        references: this.referencesInit(),
        subsidiaire: false
      })
    },

    lotAdd(groupeIndex, contourIndex) {
      this.etape.groupes[groupeIndex][contourIndex].push({
        groupe: groupeIndex + 1,
        contour: contourIndex + 1,
        point: this.etape.groupes[groupeIndex][contourIndex].length,
        references: [],
        subsidiaire: false,
        lot: true
      })
    },

    pointRemove(groupeIndex, contourIndex, pointIndex) {
      const groupes = this.etape.groupes
      const contours = groupes[groupeIndex]
      const points = contours[contourIndex]
      points.splice(pointIndex, 1)

      this.clean(groupes, groupeIndex, contourIndex)
    },

    pointMoveDown(groupeIndex, contourIndex, pointIndex) {
      const groupes = this.etape.groupes
      const contours = groupes[groupeIndex]
      const points = contours[contourIndex]
      if (points.length > pointIndex + 1) {
        const point = points.splice(pointIndex, 1)[0]
        points.splice(pointIndex + 1, 0, point)
      } else if (contours.length > contourIndex + 1) {
        const point = points.splice(pointIndex, 1)[0]
        contours[contourIndex + 1].unshift(point)
        this.clean(groupes, groupeIndex, contourIndex)
      } else if (groupes.length > groupeIndex + 1) {
        const point = points.splice(pointIndex, 1)[0]
        groupes[groupeIndex + 1][0].unshift(point)
        this.clean(groupes, groupeIndex, contourIndex)
      }
    },

    pointMoveUp(groupeIndex, contourIndex, pointIndex) {
      const groupes = this.etape.groupes
      const contours = groupes[groupeIndex]
      const points = contours[contourIndex]
      if (pointIndex > 0) {
        const point = points.splice(pointIndex, 1)[0]
        points.splice(pointIndex - 1, 0, point)
      } else if (contourIndex > 0) {
        const point = points.splice(pointIndex, 1)[0]
        contours[contourIndex - 1].push(point)
        this.clean(groupes, groupeIndex, contourIndex)
      } else if (groupeIndex > 0) {
        const point = points.splice(pointIndex, 1)[0]
        groupes[groupeIndex - 1][groupes[groupeIndex - 1].length - 1].push(
          point
        )
        this.clean(groupes, groupeIndex, contourIndex)
      }
    },

    contourAdd(groupeIndex) {
      this.etape.groupes[groupeIndex].push([
        {
          groupe: groupeIndex + 1,
          contour: 1,
          point: 1,
          references: this.referencesInit()
        }
      ])
    },

    contourRemove(groupeIndex, contourIndex) {
      this.etape.groupes[groupeIndex].splice(contourIndex, 1)
    },

    groupeAdd() {
      this.etape.groupes.push([
        [
          {
            groupe: this.etape.groupes.length,
            contour: 1,
            point: 1,
            references: this.referencesInit()
          }
        ]
      ])
    },

    groupeRemove(groupeIndex) {
      this.etape.groupes.splice(groupeIndex, 1)
    }
  }
}
</script>
