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
          {{ creation ? 'Ajout' : 'Modification' }} d'une étape
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
            v-model="etape.typeId"
            type="text"
            class="p-s"
          >
            <option
              v-for="etapeType in etapesTypes"
              :key="etapeType.id"
              :value="etapeType.id"
              :disabled="etape.typeId === etapeType.id"
            >
              {{ etapeType.nom }}
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
            v-model="etape.statutId"
            type="text"
            class="p-s"
          >
            <option
              v-for="etapeStatut in etapesStatuts"
              :key="etapeStatut.id"
              :value="etapeStatut.id"
              :disabled="etape.statutId === etapeStatut.id"
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
        <div class="tablet-blob-2-3">
          <input
            v-model="etape.date"
            type="date"
            class="p-s"
            :class="{'mb-s': etape.date, 'mb': !etape.date}"
            placeholder="aaaa-mm-jj"
          >
          <label
            v-if="etape.date"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.date"
              type="checkbox"
            >source indisponible
          </label>
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
        <div class="tablet-blob-2-3">
          <input
            v-model.number="etape.duree"
            type="number"
            class="p-s"
            :class="{'mb-s': etape.duree, 'mb': !etape.duree}"
          >
          <label
            v-if="etape.duree"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.duree"
              type="checkbox"
            >source indisponible
          </label>
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
        <div class="tablet-blob-2-3">
          <input
            v-model="etape.dateDebut"
            type="date"
            class="p-s"
            placeholder="aaaa-mm-jj"
            :class="{'mb-s': etape.dateDebut, 'mb': !etape.dateDebut}"
          >
          <label
            v-if="etape.dateDebut"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.dateDebut"
              type="checkbox"
            >source indisponible
          </label>
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
        <div class="tablet-blob-2-3">
          <input
            v-model="etape.dateFin"
            type="date"
            class="p-s"
            placeholder="aaaa-mm-jj"
            :class="{'mb-s': etape.dateFin, 'mb': !etape.dateFin}"
          >
          <label
            v-if="etape.dateFin"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.dateFin"
              type="checkbox"
            >source indisponible
          </label>
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
        <div class="tablet-blob-2-3">
          <div class="tablet-blobs">
            <div class="tablet-blob-2-3">
              <input
                v-model.number="etape.engagement"
                class="p-s mb-s"
                type="number"
                placeholder="0"
              >
            </div>

            <div class="tablet-blob-1-3">
              <select
                v-model="etape.engagementDeviseId"
                type="text"
                class="p-s"
                :class="{'mb-s': etape.engagement, 'mb': !etape.engagement}"
              >
                <option
                  :value="''"
                />
                <option
                  v-for="devise in devises"
                  :key="devise.id"
                  :value="devise.id"
                  :disabled="etape.engagementDeviseId === devise.id"
                >
                  {{ devise.nom }}
                </option>
              </select>
            </div>
          </div>
          <label
            v-if="etape.engagement"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.engagement"
              type="checkbox"
            >source indisponible
          </label>
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Surface (Km²)</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="tablet-blob-2-3">
          <input
            v-model.number="etape.surface"
            class="p-s"
            type="number"
            placeholder="0"
            :class="{'mb-s': etape.surface, 'mb': !etape.surface}"
          >
          <label
            v-if="etape.surface"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.surface"
              type="checkbox"
            >source indisponible
          </label>
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Volume</h6>
          <p class="h6 italic mb-0">
            Optionel
          </p>
        </div>
        <div class="tablet-blob-2-3">
          <div class="tablet-blobs">
            <div class="tablet-blob-2-3">
              <input
                v-model.number="etape.volume"
                class="p-s mb-s"
                type="number"
                placeholder="0"
              >
            </div>

            <div class="tablet-blob-1-3">
              <select
                v-model="etape.volumeUniteId"
                type="text"
                class="p-s"
                :class="{'mb-s': etape.volume, 'mb': !etape.volume}"
              >
                <option
                  :value="''"
                />
                <option
                  v-for="volumeUnite in volumeUnites"
                  :key="volumeUnite.id"
                  :value="volumeUnite.id"
                  :disabled="etape.volumeUniteId === volumeUnite.id"
                >
                  {{ volumeUnite.nom }}
                </option>
              </select>
            </div>
          </div>
          <label
            v-if="etape.volume"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.volume"
              type="checkbox"
            >source indisponible
          </label>
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
      <div
        v-for="visa in etape.visas"
        :key="visa.id"
        class="flex full-x mb"
      >
        <textarea
          v-model="visa.texte"
          class="p-s mr-s"
        />
        <div class="flex-right">
          <button
            class="btn-border py-s px-m rnd-xs"
            @click="visaRemove(visa.id)"
          >
            <i class="icon-24 icon-24-minus" />
          </button>
        </div>
      </div>

      <button
        v-if="etape.visas && !etape.visas.find(v => !v.texte)"
        class="btn-border rnd-xs py-s px-m full-x mb flex"
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
          class="pt pb-s pl-s border mb-s rnd-l-s bg-alt"
        >
          <h4>Contour {{ contourIndex + 1 }}</h4>
          <div
            v-for="(point, pointIndex) in points"
            :key="pointIndex + 1"
            class="pt pb-s pl-s pr-s border mb-s rnd-l-s bg-bg"
          >
            <div class="flex full-x">
              <h4>Point {{ point.nom }}</h4>
              <div class="flex-right">
                <button
                  class="btn-border py-s px-m rnd-s mt--s"
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
                  class="p-s mr-s"
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
                  class="p-s mr-s"
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
                  class="p-s mr-s"
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
                    class="btn-border py-s px-m rnd-xs mt--s"
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
                class="btn-border rnd-xs py-s px-m full-x flex"
                @click="pointReferenceAdd(point)"
              >
                Ajouter une référence <i class="icon-24 icon-24-plus flex-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="btn-border rnd-xs py-s px-m full-x mb flex"
        @click="pointAdd"
      >
        Ajouter un point<i class="icon-24 icon-24-plus flex-right" />
      </button>
    </div>

    <div>
      <h3 class="mb-s">
        Titulaires ({{ titulairesLength }})
      </h3>
      <p class="h6 italic mb-s">
        Optionel
      </p>
      <div
        v-for="(titulaireId, n) in etape.titulairesIds"
        :key="`titluaire-${titulaireId}`"
      >
        <div
          class="flex full-x"
          :class="{'mb-s': titulairesLength, 'mb': !titulairesLength}"
        >
          <select
            v-model="etape.titulairesIds[n]"
            type="text"
            class="p-s mr-s"
          >
            <option
              v-for="entreprise in entreprises"
              :key="`titulaire-${titulaireId}-entreprise-${entreprise.id}`"
              :value="entreprise.id"
              :disabled="etape.titulairesIds.find(id => id === entreprise.id)"
            >
              {{ entreprise.nom }} ({{ entreprise.id }})
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border py-s px-m rnd-xs"
              @click="titulaireRemove(n)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
      </div>

      <button
        v-if="!etape.titulairesIds.includes('')"
        class="btn-border rnd-xs py-s px-m full-x flex"
        :class="{'mb-s': titulairesLength, 'mb': !titulairesLength}"
        @click="titulaireAdd"
      >
        Ajouter un titulaire<i class="icon-24 icon-24-plus flex-right" />
      </button>

      <label
        v-if="titulairesLength"
        class="h5"
      >
        <input
          v-model="etape.incertitudes.titulaires"
          type="checkbox"
        >source indisponible
      </label>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">
        Amodiataires ({{ amodiatairesLength }})
      </h3>
      <p class="h6 italic mb-s">
        Optionel
      </p>
      <div
        v-for="(amodiataireId, n) in etape.amodiatairesIds"
        :key="`amodiataire-${amodiataireId}`"
      >
        <div
          class="flex full-x"
          :class="{'mb-s': amodiatairesLength, 'mb': !amodiatairesLength}"
        >
          <select
            v-model="etape.amodiatairesIds[n]"
            type="text"
            class="p-s mr-s"
          >
            <option
              v-for="entreprise in entreprises"
              :key="`amodiataire-${amodiataireId}-entreprise-${entreprise.id}`"
              :value="entreprise.id"
              :disabled="etape.amodiatairesIds.find(id => id === entreprise.id)"
            >
              {{ entreprise.nom }} ({{ entreprise.id }})
            </option>
          </select>

          <div class="flex-right">
            <button
              class="btn-border py-s px-m rnd-xs"
              @click="amodiataireRemove(n)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
      </div>

      <button
        v-if="!etape.amodiatairesIds.includes('')"
        class="btn-border rnd-xs py-s px-m full-x flex"
        :class="{'mb-s': amodiatairesLength, 'mb': !amodiatairesLength}"
        @click="amodiataireAdd"
      >
        Ajouter un amodiataire<i class="icon-24 icon-24-plus flex-right" />
      </button>

      <label
        v-if="amodiatairesLength"
        class="h5"
      >
        <input
          v-model="etape.incertitudes.amodiataires"
          type="checkbox"
        >source indisponible
      </label>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">
        Substances ({{ substancesLength }})
      </h3>
      <p class="h6 italic mb-s">
        Optionel
      </p>
      <div
        v-for="(substanceId, n) in etape.substancesIds"
        :key="n"
      >
        <div
          class="flex full-x"
          :class="{'mb-s': substancesLength, 'mb': !substancesLength}"
        >
          <select
            v-model="etape.substancesIds[n]"
            type="text"
            class="p-s mr-s"
          >
            <option
              v-for="substance in substances"
              :key="substance.id"
              :value="substance.id"
              :disabled="etape.substancesIds.find(id => id === substance.id)"
            >
              {{ substance.nom }}
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border py-s px-m rnd-xs"
              @click="substanceRemove(n)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
      </div>

      <button
        v-if="!etape.substancesIds.includes('')"
        class="btn-border rnd-xs py-s px-m full-x flex"

        :class="{'mb-s': substancesLength, 'mb': !substancesLength}"
        @click="substanceAdd"
      >
        Ajouter une substance<i class="icon-24 icon-24-plus flex-right" />
      </button>

      <label
        v-if="substancesLength"
        class="h5"
      >
        <input
          v-model="etape.incertitudes.substances"
          type="checkbox"
        >source indisponible
      </label>
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
    },

    creation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    etapesTypes() {
      return this.demarcheType.etapesTypes
    },

    etapesStatuts() {
      const etapeType =
        this.etapesTypes &&
        this.etapesTypes.find(t => t.id === this.etape.typeId)
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

    devises() {
      return this.$store.state.metas.devises
    },

    volumeUnites() {
      return this.$store.state.metas.volumeUnites
    },

    pointsTotal() {
      return this.etape.groupes.reduce(
        (points, contours) => [
          ...points,
          ...contours.reduce((pointsTotal, ps) => [...pointsTotal, ...ps], [])
        ],
        []
      )
    },

    etapeTypeNom() {
      const etapeType = this.etapesTypes.find(et => et.id === this.etape.typeId)
      return etapeType && etapeType.nom
    },

    titulairesLength() {
      return this.etape.titulairesIds.filter(id => id).length
    },

    amodiatairesLength() {
      return this.etape.amodiatairesIds.filter(id => id).length
    },

    substancesLength() {
      return this.etape.substancesIds.filter(id => id).length
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
      const etape = JSON.parse(JSON.stringify(this.etape))

      const propsFilter = (obj, prop, key) =>
        obj[prop].reduce((r, o) => (o[key] ? [...r, o[key]] : r), [])

      etape.visas = propsFilter(etape, 'visas', 'texte')

      if (etape.groupes) {
        // etape.points = etape.groupes.reduce(
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

        delete etape.groupes
      }

      const props = [
        'date',
        'dateDebut',
        'dateFin',
        'surface',
        'duree',
        'volume',
        'volumeUniteId',
        'engagement',
        'engagementDeviseId'
      ]

      props.forEach(prop => {
        if (etape[prop] === '') {
          etape[prop] = null
        }
      })
      console.log(JSON.stringify(etape, null, 2))

      this.$store.dispatch('titre/etapeUpdate', etape)
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
      this.etape.titulairesIds.push('')
    },

    titulaireRemove(index) {
      this.etape.titulairesIds.splice(index, 1)
    },

    amodiataireAdd() {
      this.etape.amodiatairesIds.push('')
    },

    amodiataireRemove(index) {
      this.etape.amodiatairesIds.splice(index, 1)
    },

    substanceAdd() {
      this.etape.substancesIds.push('')
    },

    substanceRemove(index) {
      this.etape.substancesIds.splice(index, 1)
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
