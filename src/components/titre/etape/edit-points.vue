<template>
  <div>
    <h3 class="mb-s">Périmètre</h3>
    <p class="h5 italic">Optionnel</p>

    <EditHeritage
      v-model:prop="etape.heritageProps.points"
      prop-id="points"
      :is-array="true"
    >
      <template #write>
        <EtapeEditPointsGeoSysteme v-model:etape="etape" />

        <div v-if="etape.geoSystemeIds.length" class="mb-s">
          <hr />
          <div class="h5">
            <ul class="list-prefix">
              <li><b>Point</b> : paire de coordoonnées</li>
              <li><b>Contour ou lacune</b> : ensemble de points</li>
              <li><b>Groupe</b> : ensemble de contours</li>
            </ul>
            <p>
              Le premier contour d'un groupe définit un périmètre.
              <br />Les contours suivants définissent des lacunes au sein de ce
              périmètre.
            </p>
          </div>

          <div
            v-for="(groupeContours, groupeIndex) in etape.groupes"
            :key="groupeIndex + 1"
            class="geo-groupe mb-xs"
            :class="{
              'geo-groupe-edit':
                groupeContours.length && groupeContours[0].length
            }"
          >
            <div v-if="etape.groupes.length > 1" class="flex flex-full">
              <h4 class="color-bg pt-s pl-m mb-s">
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
              <div v-if="groupeContours.length > 1" class="flex flex-full">
                <h4 class="pt-xs pl-s mb-s">
                  {{
                    contourIndex === 0 ? 'Contour' : `Lacune ${contourIndex}`
                  }}
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
                  <h4 v-if="point.lot" class="mt-s">Lot de points</h4>
                  <h4 v-else class="mt-s">Point {{ point.nom }}</h4>
                  <div class="flex-right">
                    <button
                      v-if="
                        !(
                          etape.groupes.length === groupeIndex + 1 &&
                          groupeContours.length === contourIndex + 1 &&
                          contourPoints.length === pointIndex + 1
                        )
                      "
                      class="btn-border py-s px-m rnd-l-xs"
                      @click="
                        pointMoveDown(groupeIndex, contourIndex, pointIndex)
                      "
                    >
                      <i class="icon-24 icon-move-down" />
                    </button>
                    <button
                      v-if="
                        !(
                          groupeIndex === 0 &&
                          contourIndex === 0 &&
                          pointIndex === 0
                        )
                      "
                      :class="{
                        'rnd-l-xs':
                          etape.groupes.length === groupeIndex + 1 &&
                          groupeContours.length === contourIndex + 1 &&
                          contourPoints.length === pointIndex + 1
                      }"
                      class="btn-border py-s px-m"
                      @click="
                        pointMoveUp(groupeIndex, contourIndex, pointIndex)
                      "
                    >
                      <i class="icon-24 icon-move-up" />
                    </button>
                    <button
                      :class="{
                        'rnd-l-xs':
                          groupeIndex === 0 &&
                          contourIndex === 0 &&
                          pointIndex === 0 &&
                          etape.groupes.length === groupeIndex + 1 &&
                          groupeContours.length === contourIndex + 1 &&
                          contourPoints.length === pointIndex + 1
                      }"
                      class="btn py-s px-m rnd-r-xs"
                      @click="
                        pointRemove(groupeIndex, contourIndex, pointIndex)
                      "
                    >
                      <i class="icon-24 icon-minus" />
                    </button>
                  </div>
                </div>

                <EtapeEditPointsPoint
                  v-if="!point.lot"
                  v-model:point="contourPoints[pointIndex]"
                  :geo-systeme-opposable-id="etape.geoSystemeOpposableId"
                  :geo-systeme-ids="etape.geoSystemeIds"
                />
                <EtapeEditPointsLot
                  v-else
                  v-model:point="contourPoints[pointIndex]"
                  :geo-systeme-opposable-id="etape.geoSystemeOpposableId"
                  :geo-systeme-ids="etape.geoSystemeIds"
                  :events="events"
                />
              </div>

              <button
                class="btn-border rnd-s py-s px-m full-x mb-xs flex small"
                @click="pointAdd(groupeIndex, contourIndex)"
              >
                <span class="mt-xxs">Ajouter un point</span
                ><i class="icon-24 icon-plus flex-right" />
              </button>

              <button
                class="btn-border rnd-s py-s px-m full-x mb-xs flex small"
                @click="lotAdd(groupeIndex, contourIndex)"
              >
                <span class="mt-xxs">Ajouter un lot de points</span
                ><i class="icon-24 icon-plus flex-right" />
              </button>
            </div>
            <button
              v-if="groupeContours.length && groupeContours[0].length"
              class="btn rnd-s py-s px-m full-x mb-xs flex h5"
              @click="contourAdd(groupeIndex)"
            >
              <span class="mt-xxs"
                >Ajouter
                {{
                  groupeContours.length >= 1 ? 'une lacune' : 'un contour'
                }}</span
              ><i class="icon-24 icon-plus flex-right" />
            </button>
          </div>

          <button
            v-if="
              etape.groupes.length &&
                etape.groupes[0].length &&
                etape.groupes[0][0].length
            "
            class="btn rnd-s py-s px-m full-x mb-s flex h5"
            @click="groupeAdd"
          >
            <span class="mt-xxs">Ajouter un groupe</span
            ><i class="icon-24 icon-plus flex-right" />
          </button>

          <div class="h5">
            <label v-if="pointsTotal.length">
              <input v-model="etape.incertitudes.points" type="checkbox" />
              Incertain
            </label>
          </div>
        </div>
      </template>
      <template #read>
        <Points :points="etape.heritageProps.points.etape.points" />
      </template>
    </EditHeritage>

    <hr />
  </div>
</template>

<script>
import EtapeEditPointsGeoSysteme from './edit-points-geo-systemes.vue'
import EtapeEditPointsPoint from './edit-points-point.vue'
import EtapeEditPointsLot from './edit-points-lot.vue'
import EditHeritage from './edit-heritage.vue'
import Points from '../points.vue'

export default {
  components: {
    EtapeEditPointsGeoSysteme,
    EtapeEditPointsPoint,
    EtapeEditPointsLot,
    EditHeritage,
    Points
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
    }
  },

  watch: {
    'etape.geoSystemeIds': 'etapeGeoSystemeOpposableIdUpdate',

    etape: {
      handler: function(etape) {
        if (
          !etape.groupes ||
          !etape.groupes[0] ||
          !etape.groupes[0][0] ||
          !etape.groupes[0][0].length
        ) {
          etape.incertitudes.points = false
        }
      },
      deep: true
    }
  },

  methods: {
    etapeGeoSystemeOpposableIdUpdate() {
      if (this.etape.geoSystemeIds.length < 2) {
        this.etape.geoSystemeOpposableId = ''
      } else if (
        this.etape.geoSystemeIds.length > 1 &&
        (!this.etape.geoSystemeOpposableId ||
          !this.etape.geoSystemeIds.includes(this.etape.geoSystemeOpposableId))
      ) {
        this.etape.geoSystemeOpposableId = this.etape.geoSystemeIds[0]
      }
    },

    clean(groupes, groupeIndex, contourIndex) {
      const contours = groupes[groupeIndex]
      const points = contours[contourIndex]

      if (!points.length && (groupes.length > 1 || contours.length > 1)) {
        contours.splice(contourIndex, 1)
        if (!contours.length && groupes.length > 1) {
          groupes.splice(groupeIndex, 1)
        }
      }
    },

    referencesInit() {
      return this.etape.geoSystemeIds.reduce((references, geoSystemeId) => {
        references[geoSystemeId] = []

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
