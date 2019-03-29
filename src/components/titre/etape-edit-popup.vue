<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ titreNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ demarcheType.nom }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ etape && etape.type.nom }}
        </h2>
      </div>
    </template>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Type</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="etape.type.id"
            type="text"
            class="p-s mr"
            @change="typeUpdate(etape.type.id)"
          >
            <option
              v-for="et in etapesTypes"
              :key="et.id"
              :value="et.id"
              :disabled="etape.type.id === et.id"
            >
              {{ et.nom }}
            </option>
          </select>
        </div>
      </div>
      <hr>
    </div>



    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Statut</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="etape.statut.id"
            type="text"
            class="p-s mr"
            @change="statutUpdate(etape.statut.id)"
          >
            <option
              v-for="etapeStatut in etapesStatuts"
              :key="etapeStatut.id"
              :value="etapeStatut.id"
              :disabled="etape.statut.id === etapeStatut.id"
            >
              {{ etapeStatut.nom }}
            </option>
          </select>
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="etape.date"
            type="date"
            class="p-s"
            placeholder="aaaa-mm-jj"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Durée (années)</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model.number="etape.duree"
            type="number"
            class="p-s"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date de début</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="etape.dateDebut"
            type="date"
            class="p-s"
            placeholder="aaaa-mm-jj"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date d'échéance</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="etape.dateFin"
            type="date"
            class="p-s"
            placeholder="aaaa-mm-jj"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Engagement</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model.number="etape.engagement"
            class="p-s"
            type="number"
            placeholder="0"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">
        Visas ({{ etape.visas.filter(({ texte }) => texte).length }})
      </h3>
      <p class="h6 italic mb-s">
        Optionel
      </p>
      <hr>
      <div
        v-for="visa in etape.visas"
        :key="visa.id"
        class="flex full-x mb"
      >
        <textarea
          v-model="visa.texte"
          class="p-s mr"
        />
        <div class="flex-right">
          <button
            class="btn-border p-s rnd-xs"
            @click="visaRemove(visa.id)"
          >
            <i class="icon-24 icon-24-minus" />
          </button>
        </div>
      </div>

      <button
        v-if="etape.visas && !etape.visas.find(v => !v.texte)"
        class="btn-border rnd-xs p-s full-x mb flex"
        @click="visaAdd"
      >
        Ajouter un visa<i class="icon-24 icon-24-plus flex-right" />
      </button>

      <hr>
    </div>

    <div class="hide">
      <h3 class="mb-s">
        Périmètre ({{ pointsTotal.length }} points)
      </h3>
      <div class="h5 mb-s">
        <ul class="list-prefix">
          <li>
            <b>Groupe</b>: ensemble de contours. Le premier contour du groupe définit un périmètre, les contours suivants définissent des trous dans ce périmètre.
          </li>
          <li>
            <b>Contour</b>: ensemble de points.
          </li>
          <li>
            <b>Point</b>: sommet d'un contour défini par ses coordoonnées dans le système WGS 84.
          </li>
          <li>
            <b>Références</b>: coordonnées du point dans des systèmes autre que WGS 84.
          </li>
          <li>
            <b>Système</b>: système géodésique de la référence.
          </li>
        </ul>
      </div>
      <hr>
      <div
        v-for="(contours, groupeIndex) in etape.groupes"
        :key="groupeIndex + 1"
        class="pt pb-s pl-s border mb rnd-s bg-neutral"
      >
        <h4 class="color-bg">
          Groupe {{ groupeIndex + 1 }}
        </h4>
        <div
          v-for="(points, contourIndex) in contours"
          :key="contourIndex + 1"
          class="pt pb-s pl-s border mb-s rnd-s-l bg-alt"
        >
          <h4>Contour {{ contourIndex + 1 }}</h4>
          <div
            v-for="(point, pointIndex) in points"
            :key="pointIndex + 1"
            class="pt pb-s pl-s pr-s border mb-s rnd-s-l bg-bg"
          >
            <div class="flex full-x">
              <h4>Point {{ point.nom }}</h4>
              <div class="flex-right">
                <button
                  class="btn-border p-s rnd-s mt--s"
                  @click="pointRemove(point)"
                >
                  <i class="icon-24 icon-24-minus" />
                </button>
              </div>
            </div>

            <div class="tablet-blobs">
              <div class="mb tablet-blob-1-3">
                <h6>Groupe</h6>
                <select
                  v-model="point.groupe"
                  type="text"
                  class="p-s mr"
                >
                  <option
                    v-for="g in arrayOfNumbersCreate(points.length > 1 ? etape.groupes.length + 1: etape.groupes.length)"
                    :key="`g-${g}`"
                    :value="g"
                  >
                    {{ g }}
                  </option>
                </select>
              </div>
              <div class="mb tablet-blob-1-3">
                <h6>Contour</h6>
                <select
                  v-model="point.contour"
                  type="text"
                  class="p-s mr"
                >
                  <option
                    v-for="c in arrayOfNumbersCreate(points.length > 1 ? contours.length + 1: contours.length)"
                    :key="`g-${point.groupe}-c-${c}`"
                    :value="c"
                  >
                    {{ c }}
                  </option>
                </select>
              </div>
              <div class="mb tablet-blob-1-3">
                <h6>Point</h6>
                <select
                  v-model="point.point"
                  type="text"
                  class="p-s mr"
                >
                  <option
                    v-for="p in arrayOfNumbersCreate(points.length > 1 ? points.length + 1: points.length)"
                    :key="`g-${point.groupe}-c-${point.contour}-p-${p}`"
                    :value="p"
                  >
                    {{ p }}
                  </option>
                </select>
              </div>
            </div>

            <div class="tablet-blobs">
              <div class="mb tablet-blob-1-3">
                <h6>Nom</h6>
                <input
                  v-model="point.nom"
                  type="text"
                  class="p-s"
                >
              </div>
              <div class="mb tablet-blob-1-3">
                <h6>Longitude</h6>
                <input
                  v-model.number="point.coordonnees.x"
                  type="text"
                  class="p-s"
                >
              </div>
              <div class="mb tablet-blob-1-3">
                <h6>Latitude</h6>
                <input
                  v-model.number="point.coordonnees.y"
                  type="text"
                  class="p-s"
                >
              </div>
            </div>

            <div class="tablet-blobs">
              <div class="mb tablet-blob-1">
                <h6>Description</h6>
                <input
                  v-model="point.description"
                  type="text"
                  class="p-s"
                >
              </div>
            </div>

            <div
              v-for="reference in point.references"
              :key="reference.id"
            >
              <div class="flex full-x">
                <h4>Reference</h4>
                <div class="flex-right">
                  <button
                    class="btn-border p-s rnd-xs mt--s"
                    @click="pointReferenceRemove(point, reference)"
                  >
                    <i class="icon-24 icon-24-minus" />
                  </button>
                </div>
              </div>
              <div class="tablet-blobs">
                <div class="mb tablet-blob-1-3">
                  <h6>Système</h6>
                  <input
                    v-model="reference.systeme"
                    type="text"
                    class="p-s"
                  >
                </div>
                <div class="mb tablet-blob-1-3">
                  <h6>Longitude</h6>
                  <input
                    v-model.number="reference.coordonnees.x"
                    type="text"
                    class="p-s"
                  >
                </div>
                <div class="mb tablet-blob-1-3">
                  <h6>Latitude</h6>
                  <input
                    v-model.number="reference.coordonnees.y"
                    type="text"
                    class="p-s"
                  >
                </div>
              </div>
            </div>

            <div v-if="!point.references.find(r => r.id === '')">
              <button
                class="btn-border rnd-xs p-s full-x flex"
                @click="pointReferenceAdd(point)"
              >
                Ajouter une référence <i class="icon-24 icon-24-plus flex-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="btn-border rnd-xs p-s full-x mb  flex"
        @click="pointAdd"
      >
        Ajouter un point<i class="icon-24 icon-24-plus flex-right" />
      </button>
    </div>


    <div>
      <h3 class="mb-s">
        Titulaires ({{ etape.titulaires.filter(({ id }) => id).length }})
      </h3>
      <hr>
      <div
        v-for="(titulaire, n) in etape.titulaires"
        :key="`titluaire-${titulaire.id}`"
      >
        <div class="flex full-x mb">
          <select
            v-model="etape.titulaires[n]"
            type="text"
            class="p-s mr"
          >
            <option
              v-for="entreprise in entreprises"
              :key="`titulaire-${titulaire.id}-entreprise-${entreprise.id}`"
              :value="entreprise"
              :disabled="etape.titulaires.find(t => t.id === entreprise.id)"
            >
              {{ entreprise.nom }} ({{ entreprise.id }})
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border p-s rnd-xs"
              @click="titulaireRemove(titulaire.id)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <div v-if="!etape.titulaires.find(t => t.id === '')">
      <button
        class="btn-border rnd-xs p-s full-x mb  flex"
        @click="titulaireAdd"
      >
        Ajouter un titulaire<i class="icon-24 icon-24-plus flex-right" />
      </button>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">
        Amodiataires ({{ etape.amodiataires.filter(({ id }) => id).length }})
      </h3>
      <hr>
      <div
        v-for="(amodiataire, n) in etape.amodiataires"
        :key="`amodiataire-${amodiataire.id}`"
      >
        <div class="flex full-x mb">
          <select
            v-model="etape.amodiataires[n]"
            type="text"
            class="p-s mr"
          >
            <option
              v-for="entreprise in entreprises"
              :key="`amodiataire-${amodiataire.id}-entreprise-${entreprise.id}`"
              :value="entreprise"
              :disabled="etape.amodiataires.find(a => a.id === entreprise.id)"
            >
              {{ entreprise.nom }} ({{ entreprise.id }})
            </option>
          </select>

          <div class="flex-right">
            <button
              class="btn-border p-s rnd-xs"
              @click="amodiataireRemove(amodiataire.id)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <div v-if="!etape.amodiataires.find(t => t.id === '')">
      <button
        class="btn-border rnd-xs p-s full-x mb  flex"
        @click="amodiataireAdd"
      >
        Ajouter un amodiataire<i class="icon-24 icon-24-plus flex-right" />
      </button>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">
        Substances ({{ etape.substances.length }})
      </h3>
      <hr>
      <div
        v-for="(etapeSubstance, n) in etape.substances"
        :key="n"
      >
        <div class="flex full-x mb">
          <select
            v-model="etapeSubstance.id"
            type="text"
            class="p-s mr"
            @change="substanceUpdate(n, $event)"
          >
            <option
              v-for="substance in substances"
              :key="substance.id"
              :value="substance.id"
              :disabled="etape.substances.find(s => s.id === substance.id)"
            >
              {{ substance.nom }}
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border p-s rnd-xs"
              @click="substanceRemove(n)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <div v-if="etape.substances && !etape.substances.find(t => t.id === '')">
      <button
        class="btn-border rnd-xs p-s full-x mb  flex"
        @click="substanceAdd"
      >
        Ajouter une substance<i class="icon-24 icon-24-plus flex-right" />
      </button>
      <hr>
    </div>

    <template slot="footer">
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    etape: {
      type: Object,
      default: () => ({})
    },
    demarcheType: {
      type: Object,
      default: () => ({})
    },
    domaineId: {
      type: String,
      default: ''
    },
    titreNom: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      id: ''
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },
    etapesTypes() {
      return this.demarcheType.etapesTypes && this.demarcheType.etapesTypes
    },
    etapesStatuts() {
      const etapeType =
        this.etapesTypes &&
        this.etapesTypes.find(t => t.id === this.etape.type.id)
      return etapeType && etapeType.etapesStatuts
    },
    entreprises() {
      return this.$store.state.entreprises.list
    },
    substances() {
      return this.$store.state.substances.list.filter(su =>
        su.legales.find(sl => sl.domaine.id === this.domaineId)
      )
    },
    pointsTotal() {
      return this.etape.groupes.reduce(
        (points, contours) => [
          ...points,
          ...contours.reduce((pointsTotal, ps) => [...pointsTotal, ...ps], [])
        ],
        []
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      const etapeCloneAndFormat = etape => {
        const etapeTmp = JSON.parse(JSON.stringify(etape))
        etapeTmp.titulaires = etapeTmp.titulaires.reduce(
          (r, { id }) => (id ? [...r, { id }] : r),
          []
        )
        etapeTmp.amodiataires = etapeTmp.amodiataires.reduce(
          (r, { id }) => (id ? [...r, { id }] : r),
          []
        )
        etapeTmp.administrations = etapeTmp.administrations.reduce(
          (r, { id }) => (id ? [...r, { id }] : r),
          []
        )
        etapeTmp.substances = etapeTmp.substances.reduce(
          (r, { id }) => (id ? [...r, { id }] : r),
          []
        )
        etapeTmp.emprises = etapeTmp.emprises.reduce(
          (r, { id }) => (id ? [...r, { id }] : r),
          []
        )
        etapeTmp.typeId = etapeTmp.type.id
        etapeTmp.statutId = etapeTmp.statut.id
        etapeTmp.visas = etapeTmp.visas.reduce(
          (res, { texte }) => (texte ? [...res, texte] : res),
          []
        )

        delete etapeTmp.type
        delete etapeTmp.statut

        if (etapeTmp.groupes) {
          // etapeTmp.points = etapeTmp.groupes.reduce(
          //   (points, groupe) => [
          //     ...points,
          //     groupe.reduce(
          //       (pos, contour) => [
          //         ...pos,
          //         contour.reduce((ps, point) => [...ps, point], [])
          //       ],
          //       []
          //     )
          //   ],
          //   []
          // )

          delete etapeTmp.groupes
        }

        const props = [
          'date',
          'dateDebut',
          'dateFin',
          'surface',
          'volume',
          'volumeUnite'
        ]

        props.forEach(prop => {
          if (etapeTmp[prop] === '') {
            etapeTmp[prop] = null
          }
        })
        console.log(JSON.stringify(etapeTmp, null, 2))

        return etapeTmp
      }

      this.$store.dispatch('titre/etapeUpdate', etapeCloneAndFormat(this.etape))
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    },

    typeUpdate(etapeTypeId) {
      this.etape.type = Object.assign(
        {},
        this.etapesTypes.find(et => et.id === etapeTypeId)
      )
    },

    statutUpdate(etapeStatutId) {
      this.etape.statut = Object.assign(
        {},
        this.etapesStatuts.find(es => es.id === etapeStatutId)
      )
    },

    pointAdd() {
      if (!this.etape.groupes.length) {
        this.etape.groupes = [[[]]]
      }
      const contours = this.etape.groupes[this.etape.groupes.length - 1]
      console.log(this.etape.groupes, contours)

      const points = contours[contours.length - 1]
      const point = {
        id: '',
        groupe: this.etape.groupes.length,
        contour: contours.length,
        point: points.length + 1,
        coordonnees: { x: '', y: '' },
        references: []
      }
      points.push(point)
    },

    pointRemove(point) {
      const index = this.etape.points.findIndex(p => p.id === point.id)
      this.etape.points.splice(index, 1)
    },

    pointReferenceAdd(point) {
      const reference = { id: '', coordonnees: { x: '', y: '' } }
      point.references.push(reference)
    },

    pointReferenceRemove(point, reference) {
      const index = point.references.findIndex(r => r.id === reference.id)
      point.references.splice(index, 1)
    },

    titulaireAdd() {
      this.etape.titulaires.push({ id: '' })
    },

    titulaireSet(titulaireId) {
      const index = this.etape.titulaires.findIndex(t => t.id === titulaireId)
      const entreprise = this.entreprises.find(e => e.id === titulaireId)
      this.$set(this.etape.titulaires, index, entreprise)
    },

    titulaireRemove(id) {
      const index = this.etape.titulaires.findIndex(t => t.id === id)
      this.etape.titulaires.splice(index, 1)
    },

    amodiataireAdd() {
      const amodiataire = { id: '', nom: '' }
      this.etape.amodiataires.push(amodiataire)
    },

    amodiataireRemove(id) {
      const index = this.etape.amodiataires.findIndex(t => t.id === id)
      this.etape.amodiataires.splice(index, 1)
    },

    substanceAdd() {
      const substance = { id: '', nom: '' }
      this.etape.substances.push(substance)
    },

    substanceUpdate(etapeSubstanceIndex, e) {
      const substanceId = e.target.value
      this.etape.substances[etapeSubstanceIndex] = Object.assign(
        {},
        this.substances.find(s => s.id === substanceId)
      )
    },

    substanceRemove(index) {
      this.etape.substances.splice(index, 1)
    },

    arrayOfNumbersCreate(length) {
      return [...Array(length).keys()].map(i => i + 1)
    },

    visaAdd() {
      this.etape.visas.push({ id: this.etape.visas.length, texte: '' })
    },

    visaRemove(id) {
      this.etape.visas.splice(id, 1)
    }
  }
}
</script>
