<template>
  <div>
    <h3 class="mb-s">
      Périmètre ({{ pointsTotal.length }} point{{ pointsTotal.length > 1 ? 's' : '' }})
    </h3>
    <div class="h5 mb-s">
      <ul class="list-prefix">
        <li>
          <b>Point</b>: sommet défini par une paire de coordoonnées.
        </li>
        <li>
          <b>Contour ou lacune</b>: ensemble de points.
        </li>
        <li>
          <b>Groupe</b>: ensemble de contours. Le premier contour du groupe définit un périmètre, les contours suivants définissent des lacunes au sein de ce périmètre.
        </li>
      </ul>
    </div>

    <div class="mb">
      <h4 class="mb-s">
        Systèmes Epsg
      </h4>
      <div
        v-for="(geoSystemeId, n) in etape.geoSystemeIds"
        :key="geoSystemeId"
        class="mb-s"
      >
        <div class="flex full-x mb-s">
          <select
            v-model="etape.geoSystemeIds[n]"
            type="text"
            class="p-s mr-s"
            @change="geoSystemeUpdate(etape.geoSystemeIds[n])"
          >
            <option
              v-for="geoSysteme in geoSystemes"
              :key="geoSysteme.id"
              :value="geoSysteme.id"
              :disabled="etape.geoSystemeIds.find(id => id === geoSysteme.id)"
            >
              {{ geoSysteme.nom }}
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border py-s px-m rnd-xs"
              @click="geoSystemeRemove(n)"
            >
              <i class="icon-24 icon-minus" />
            </button>
          </div>
        </div>
        <div v-if="geoSystemeIds.length > 1">
          <label
            class="h5 mb"
          >
            <input
              v-model="etape.geoSystemeOpposableId"
              type="radio"
              :value="geoSystemeId"
            > opposable
          </label>
        </div>
      </div>

      <button
        v-if="!etape.geoSystemeIds.includes('')"
        class="btn-border rnd-xs py-s px-m full-x flex"
        @click="geoSystemeAdd"
      >
        Ajouter un système Epsg<i class="icon-24 icon-plus flex-right" />
      </button>
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
            <h4 class="mt-s">
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

          <div class="tablet-blobs">
            <div class="mb tablet-blob-1-3">
              <h6>Nom</h6>
              <input
                v-model.lazy="point.nom"
                type="text"
                class="p-s"
              >
            </div>
            <div class="mb tablet-blob-2-3">
              <h6>Description</h6>
              <input
                v-model="point.description"
                type="text"
                class="p-s"
              >
            </div>
          </div>

          <label class="h5 mb">
            <input
              v-model="point.subsidiaire"
              type="checkbox"
            >subsidiaire
          </label>

          <div
            v-for="geoSystemeId in geoSystemeIds"
            :key="`${point.id}-${geoSystemeId}`"
            class="tablet-blobs"
          >
            <div class="mb tablet-blob-1-3">
              <h6>Système</h6>

              <p class="py-s mb-0 h5">
                <span class="bold">{{ geoSystemes.find(({id}) => id === geoSystemeId).nom }}</span> <span
                  v-if="etape.geoSystemeOpposableId === geoSystemeId"
                  class="bg-info py-xxs px-xs rnd-xs color-bg"
                >Opposable</span>
              </p>
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>X ({{ geoSystemes.find(({id}) => id === geoSystemeId).unite }})</h6>
              <input
                v-model.trim="point.references.find(r => r.geoSystemeId === geoSystemeId).coordonnees.x"
                type="text"
                class="p-s"
              >
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Y ({{ geoSystemes.find(({id}) => id === geoSystemeId).unite }})</h6>
              <input
                v-model.trim="point.references.find(r => r.geoSystemeId === geoSystemeId).coordonnees.y"
                type="text"
                class="p-s"
              >
            </div>
          </div>
        </div>

        <button
          class="btn-border rnd-s py-s px-m full-x mb-s flex"
          @click="pointAdd(groupeIndex, contourIndex)"
        >
          Ajouter un point<i class="icon-24 icon-plus flex-right" />
        </button>
      </div>

      <button
        class="btn-border rnd-s py-s px-m full-x mb-s flex"
        @click="contourAdd(groupeIndex)"
      >
        Ajouter {{ groupeContours.length >= 1 ? 'une lacune' : 'un contour' }}<i class="icon-24 icon-plus flex-right" />
      </button>
    </div>


    <button
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
    },

    geoSystemeIds() {
      return this.etape.geoSystemeIds.filter(id => id)
    },

    geoSystemeIdsLength() {
      return this.geoSystemeIds.length
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

    pointAdd(groupeIndex, contourIndex) {
      this.etape.groupes[groupeIndex][contourIndex].push({
        groupe: groupeIndex + 1,
        contour: contourIndex + 1,
        point: this.etape.groupes[groupeIndex][contourIndex].length,
        references: this.geoSystemeIds.map(geoSystemeId => ({
          geoSystemeId,
          coordonnees: { x: '', y: '' }
        }))
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
          references: this.geoSystemeIds.map(geoSystemeId => ({
            geoSystemeId,
            coordonnees: { x: '', y: '' }
          }))
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
            references: this.geoSystemeIds.map(geoSystemeId => ({
              geoSystemeId,
              coordonnees: { x: '', y: '' }
            }))
          }
        ]
      ])
    },

    groupeRemove(groupeIndex) {
      this.etape.groupes.splice(groupeIndex, 1)
    },

    geoSystemeAdd() {
      this.etape.geoSystemeIds.push('')
    },

    geoSystemeRemove(index) {
      const id = this.etape.geoSystemeIds[index]
      this.etape.geoSystemeIds.splice(index, 1)
      if (this.geoSystemeIds.length < 2) {
        this.etape.geoSystemeOpposableId = null
      } else if (this.etape.geoSystemeOpposableId === id) {
        this.etape.geoSystemeOpposableId = this.etape.geoSystemeIds[0]
      }
    },

    geoSystemeUpdate(geoSystemeId) {
      this.etape.groupes.forEach(contours => {
        contours.forEach(points => {
          points.forEach(point => {
            const reference = point.references.find(
              ({ id }) => id === geoSystemeId
            )

            if (reference) {
              reference.geoSystemeId = geoSystemeId
            } else {
              point.references.push({
                geoSystemeId,
                coordonnees: { x: '', y: '' }
              })
            }
          })
        })
      })

      if (this.geoSystemeIds.length > 1 && !this.etape.geoSystemeOpposableId) {
        this.etape.geoSystemeOpposableId = this.etape.geoSystemeIds[0]
      }
    }
  }
}
</script>
