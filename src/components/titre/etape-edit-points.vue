<template>
  <div>
    <h3 class="mb-s">
      Périmètre
    </h3>
    <p class="h6 italic mb-s">
      Optionel
    </p>
    <div class="mb">
      <h4 class="mb-s">
        Systèmes géographiques
      </h4>
      <div
        v-for="(etapeGeoSysteme, etapeGeoSystemeIndex) in etape.geoSystemes"
        :key="etapeGeoSystemeIndex"
        class="mb-s"
      >
        <div class="flex full-x mb-s">
          <select
            v-model="etape.geoSystemes[etapeGeoSystemeIndex].id"
            type="text"
            class="p-s mr-s"
            @change="geoSystemeUpdate(etapeGeoSystemeIndex)"
          >
            <option
              v-for="geoSysteme in geoSystemes"
              :key="geoSysteme.id"
              :value="geoSysteme.id"
              :disabled="etapeGeoSystemeIds.some(id => id === geoSysteme.id)"
            >
              {{ geoSysteme.nom }}
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border py-s px-m rnd-xs"
              @click="geoSystemeRemove(etapeGeoSystemeIndex)"
            >
              <i class="icon-24 icon-minus" />
            </button>
          </div>
        </div>

        <div
          v-if="etapeGeoSysteme.id"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-2">
            <div class="blobs">
              <div class="blob-1-3 pt-s pb-s">
                <h6 class="mt-xs">
                  Unité
                </h6>
              </div>
              <div class="blob-2-3">
                <select
                  v-if="unites.filter(({type}) => etapeGeoSysteme.uniteType === type).length > 1"
                  v-model="etape.geoSystemes[etapeGeoSystemeIndex].uniteId"
                  type="text"
                  class="p-s"
                >
                  <option
                    v-for="unite in unites.filter(({type}) => etapeGeoSysteme.uniteType === type)"
                    :key="unite.id"
                    :value="unite.id"
                    :disabled="etapeGeoSysteme.uniteId === unite.id"
                  >
                    {{ unite.nom }}
                  </option>
                </select>
                <div v-else>
                  <div class="p-s bg-alt">
                    {{ unites.find(({type}) => etapeGeoSysteme.uniteType === type).nom }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="etapeGeoSystemeIds.length > 1"
            class="tablet-blob-1-2"
          >
            <label class="h5 pt-s mb">
              <input
                v-model="etape.geoSystemeOpposableId"
                type="radio"
                :value="etapeGeoSysteme.id"
              > opposable
            </label>
          </div>
        </div>
      </div>
      <button
        v-if="!etape.geoSystemes.some(({ id }) => !id)"
        class="btn-border rnd-xs py-s px-m full-x flex"
        @click="geoSystemeAdd"
      >
        Ajouter un système géographique<i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

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
            <div v-if="!point.lot">
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
                v-for="etapeGeoSysteme in etape.geoSystemes.filter(({ id }) => id)"
                :key="`${point.id}-${etapeGeoSysteme.id}`"
                class="tablet-blobs"
              >
                <div class="mb tablet-blob-1-3">
                  <h6>Système</h6>

                  <p class="py-s mb-0 h5">
                    <span class="bold">{{ etapeGeoSysteme.nom }}</span> <span
                      v-if="etape.geoSystemeOpposableId === etapeGeoSysteme.id"
                      class="bg-info py-xxs px-xs rnd-xs color-bg"
                    >Opposable</span>
                  </p>
                </div>
                <div class="mb tablet-blob-1-3">
                  <h6>X ({{ unites.find(({id}) => etapeGeoSysteme.uniteId === id).nom }})</h6>
                  <input
                    v-model.trim="point.references[etapeGeoSysteme.id][0]"
                    type="text"
                    class="p-s"
                  >
                </div>
                <div class="mb tablet-blob-1-3">
                  <h6>Y ({{ unites.find(({id}) => etapeGeoSysteme.uniteId === id).nom }})</h6>
                  <input
                    v-model.trim="point.references[etapeGeoSysteme.id][1]"
                    type="text"
                    class="p-s"
                  >
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex full-x">
                <h4 class="mt-s">
                  Lot de points
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
              <div class="mb">
                <h6>Description</h6>
                <input
                  v-model="point.description"
                  type="text"
                  class="p-s"
                >
              </div>
              <div class="mb">
                <h6>Coordonnées en {{ etapeGeoSystemeOpposable.nom }} ({{ unites.find(({id}) => etapeGeoSystemeOpposable.uniteId === id).nom }})</h6>
                <textarea
                  class="p-s mb-s"
                  :value="point.references.map(p => p ? `${p[0]},${p[1]}` : '').join('\n')"
                  placeholder="1.47696,47.3469"
                  @blur="pointsLotUpdate($event, groupeIndex, contourIndex, pointIndex)"
                />

                <div class="h5 mb-s">
                  <ul class="list-prefix">
                    <li>Ce champs contient une paire de coordonnées par ligne.</li>
                    <li>Les coordonnées <span class="mono bg-alt p-xxs">x,y</span> sont séparées par une virgule, sans espace.</li>
                    <li>Le séparateur entre les unités et les décimales est un point.</li>
                    <li>Quelque soit l'unité, les coordonnées sont au format décimal.</li>
                  </ul>
                  <p>Exemple: <span class="mono bg-alt p-xxs">1.4769,47.3469</span></p>
                </div>
              </div>
            </div>
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
export default {
  props: {
    etape: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    unites() {
      return this.$store.state.metas.unites
    },

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

    etapeGeoSystemeIds() {
      return this.etape.geoSystemes.reduce((acc, { id }) => {
        if (id) {
          acc.push(id)
        }

        return acc
      }, [])
    },

    etapeGeoSystemeOpposable() {
      const geoSystemeId =
        this.etape.geoSystemeOpposableId || this.etapeGeoSystemeIds[0]
      return this.etape.geoSystemes.find(({ id }) => id === geoSystemeId)
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
    },

    geoSystemeAdd() {
      this.etape.geoSystemes.push({ id: '' })
    },

    geoSystemeRemove(etapeGeoSystemeIndex) {
      const geoSystemeId = this.etape.geoSystemes[etapeGeoSystemeIndex].id
      this.etape.geoSystemes.splice(etapeGeoSystemeIndex, 1)

      if (this.etapeGeoSystemeIds.length < 2) {
        this.etape.geoSystemeOpposableId = null
      } else if (this.etape.geoSystemeOpposableId === geoSystemeId) {
        this.etape.geoSystemeOpposableId = this.etapeGeoSystemeIds[0]
      }
    },

    geoSystemeUpdate(etapeGeoSystemeIndex) {
      const etapeGeoSysteme = this.etape.geoSystemes[etapeGeoSystemeIndex]
      const geoSysteme = this.geoSystemes.find(
        ({ id }) => id === etapeGeoSysteme.id
      )

      const unite = this.unites.find(
        ({ type }) => type === geoSysteme.uniteType
      )

      etapeGeoSysteme['nom'] = geoSysteme.nom
      etapeGeoSysteme['uniteId'] = unite.id
      etapeGeoSysteme['uniteNom'] = unite.nom
      etapeGeoSysteme['uniteType'] = unite.type

      this.etape.groupes.forEach(contours => {
        contours.forEach(points => {
          points.forEach(point => {
            if (!point.references[etapeGeoSysteme.id]) {
              point.references[etapeGeoSysteme.id] = point.lot ? [] : [0, 0]
            }
          })
        })
      })

      if (!this.etape.groupes.length) {
        this.etape.groupes.push([[]])
      }

      if (
        this.etapeGeoSystemeIds.length > 1 &&
        !this.etape.geoSystemeOpposableId
      ) {
        this.etape.geoSystemeOpposableId = this.etapeGeoSystemeIds[0]
      }
    },

    pointsLotUpdate(event, groupeIndex, contourIndex, pointIndex) {
      // userInput doit être de la forme 1.2,2.3\n2,4\n4.5,6\n
      const coordonnees = event.target.value.split('\n').map(i =>
        i.match(
          // https://stackoverflow.com/a/18690202/2112538
          /(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/g
        )
      )

      this.etape.groupes[groupeIndex][contourIndex][pointIndex] = coordonnees
    }
  }
}
</script>
