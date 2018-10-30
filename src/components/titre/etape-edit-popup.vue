<template>
  <popup>
    <template slot="header">
      <div>
        <h5><span class="cap-first">{{ titreNom }}</span><span class="color-neutral"> | </span><span class="cap-first">{{ demarcheNom }}</span></h5>
        <h2 class="cap-first mb-0">{{ etape && etape.type.nom }}</h2>
      </div>
    </template>

    <div>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input 
            v-model="etape.date"
            type="text" 
            class="p-s"
            placeholder="jj-mm-aaaa"
          >
        </div>
      </div>
      <hr>
    </div>


    <div>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Durée (années)</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input 
            v-model="etape.duree"
            type="text" 
            class="p-s"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date de début</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input 
            v-model="etape.dateDebut"
            type="text" 
            class="p-s"
            placeholder="jj-mm-aaaa"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date d'échéance</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <input 
            v-model="etape.dateFin"
            type="text" 
            class="p-s"
            placeholder="jj-mm-aaaa"
          >
        </div>
      </div>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">Périmètre ({{ etape.points.length }} points)</h3>
      <div class="h5 mb-s">
        <ul class="list-prefix">
          <li><b>Point</b>: le sommet d'un contour défini par des coordoonnées dans le système WGS 84.</li>
          <li><b>Contour</b>: un ensemble de points. Le premier et le dernier points doivent être identiques.</li>
          <li><b>Groupe</b>: un ensemble de contours. Le premier contour d'un groupe définit un périmètre, les contours suivants au sein du groupe définissent des trous dans ce périmètre.</li>
          <li><b>Références</b>: les coordonnées du point dans un système autre que WGS 84.</li>

        </ul>
      </div>
      <hr>
      <div 
        v-for="point in etape.points"
        :key="point.id"
      >
        <div class="flex full-x">
          <h4>Point</h4>
          <div class="flex-right">
            <button
              class="btn-border p-s rnd-xs mt--s"
              @click="pointRemove(point)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
        <div class="tablet-blobs">
          <div class="mb tablet-blob-1-3">
            <h6>
              Point
            </h6>
            <input 
              v-model="point.point"
              type="text" 
              class="p-s"
            >
          </div>
          <div class="mb tablet-blob-1-3">
            <h6>
              Contour
            </h6>
            <input 
              v-model="point.contour"
              type="text" 
              class="p-s"
            >
          </div>
          <div class="mb tablet-blob-1-3">
            <h6>
              Groupe
            </h6>
            <input 
              v-model="point.groupe"
              type="text" 
              class="p-s"
            >
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
              v-model="point.coordonees.x"
              type="text" 
              class="p-s"
            >
          </div>
          <div class="mb tablet-blob-1-3">
            <h6>Latitude</h6>
            <input 
              v-model="point.coordonees.y"
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
              <h6>
                Système
              </h6>
              <input 
                v-model="reference.systeme"
                type="text" 
                class="p-s"
              >
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Longitude</h6>
              <input 
                v-model="reference.coordonees.x"
                type="text" 
                class="p-s"
              >
            </div>
            <div class="mb tablet-blob-1-3">
              <h6>Latitude</h6>
              <input 
                v-model="reference.coordonees.y"
                type="text" 
                class="p-s"
              >
            </div>
          </div>
        </div>

        <div v-if="!point.references.find(r => r.id ==='')">
          <button 
            class="btn-border rnd-xs p-s full-x mb flex" 
            @click="pointReferenceAdd(point)"
          > 
            Ajouter une référence
            <i class="icon-24 icon-24-plus flex-right" />
          </button>
          <hr>
        </div>

      </div>
    </div>

    <div v-if="!etape.points.find(t => t.id ==='')">
      <button 
        class="btn-border rnd-xs p-s full-x mb  flex" 
        @click="pointAdd"
      >Ajouter un point<i class="icon-24 icon-24-plus flex-right" /></button>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">Titulaires ({{ etape.titulaires.length }})</h3>
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
            >{{ entreprise.nom }} {{ entreprise.legalSiren || entreprise.legalEtranger || entreprise.id }}
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

    <div v-if="!etape.titulaires.find(t => t.id ==='')">  
      <button 
        class="btn-border rnd-xs p-s full-x mb  flex" 
        @click="titulaireAdd"
      >Ajouter un titulaire<i class="icon-24 icon-24-plus flex-right" /></button>
      <hr>
    </div>

    
    <div>
      <h3 class="mb-s">Amodiataires ({{ etape.amodiataires.length }})</h3>
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
            >{{ entreprise.nom }} ({{ entreprise.id }})
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

    <div v-if="!etape.amodiataires.find(t => t.id ==='')">  
      <button 
        class="btn-border rnd-xs p-s full-x mb  flex" 
        @click="amodiataireAdd"
      >Ajouter un amodiataire<i class="icon-24 icon-24-plus flex-right" /></button>
      <hr>
    </div>

    <div>
      <h3 class="mb-s">Substances ({{ etape.substances.length }})</h3>
      <hr>
      <div
        v-for="(etapeSubstance, n) in etape.substances"
        :key="etapeSubstance.id"
      >
        <div class="flex full-x mb">
          <select 
            v-model="etapeSubstance.id"
            type="text" 
            class="p-s mr"
            @change="substanceUpdate(n, etapeSubstance.id)"
          >
            <option
              v-for="substance in substances"
              :key="substance.id"
              :value="substance.id"
              :disabled="etape.substances.find(s => s.id === substance.id)"
            >{{ substance.nom }}
            </option>
          </select>
          <div class="flex-right">
            <button
              class="btn-border p-s rnd-xs"
              @click="substanceRemove(etapeSubstance.id)"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <div v-if="!etape.substances.find(t => t.id ==='')">  
      <button 
        class="btn-border rnd-xs p-s full-x mb  flex" 
        @click="substanceAdd"
      >Ajouter une substance<i class="icon-24 icon-24-plus flex-right" /></button>
      <hr>
    </div>

    <messages :messages="messages" />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >Annuler</button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >Enregistrer</button>
        </div>
      </div>
    </template>
  </popup>
</template>

<script>
import { isoDateFormat } from '../../utils'
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
    demarcheNom: {
      type: String,
      default: ''
    },
    titreNom: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      id: ''
    }
  },

  computed: {
    messages () {
      return this.$store.state.utilisateur.popupMessages
    },
    entreprises () {
      return this.$store.state.entreprises.list
    },
    substances () {
      return this.$store.state.substances.list
    }
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      const etapeCloneAndFormat = etape => {
        JSON.parse(JSON.stringify(etape))
        etape.titulaires = etape.titulaires.filter(t => t.id)
        etape.amodiataires = etape.amodiataires.filter(t => t.id)
        etape.administrations = etape.administrations.filter(t => t.id)
        etape.substances = etape.substances.filter(t => t.id)
        etape.emprises = etape.emprises.filter(t => t.id)
        etape.points = etape.points.filter(t => t.id)

        if (etape.date) {
          etape.date = isoDateFormat(etape.date)
        }

        if (etape.dateDebut) {
          etape.dateDebut = isoDateFormat(etape.dateDebut)
        }
        if (etape.dateFin) {
          etape.dateFin = isoDateFormat(etape.dateFin)
        }

        return etape
      }

      this.$store.dispatch('titre/etapeUpdate', etapeCloneAndFormat(this.etape))  
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove () {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    },

    pointAdd () {
      const point = { id: '', coordonees: { x: '', y: '' }, references: [] }
      this.etape.points.push(point)
    },

    pointRemove (point) {
      const index = this.etape.points.findIndex(p => p.id === point.id)
      this.etape.points.splice(index, 1)
    },

    pointReferenceAdd (point) {
      const reference = { id: '', coordonees: { x: '', y: '' } }
      point.references.push(reference)
    },

    pointReferenceRemove (point, reference) {
      const index = point.references.findIndex(r => r.id === reference.id)
      point.references.splice(index, 1)
    },

    titulaireAdd () {
      this.etape.titulaires.push({ id: '' })
    }, 
    
    titulaireSet(titulaireId) {
      const index = this.etape.titulaires.findIndex(t => t.id === titulaireId)
      const entreprise = this.entreprises.find(e => e.id === titulaireId)
      this.$set(this.etape.titulaires, index, entreprise)
    },

    titulaireRemove (id) {
      const index = this.etape.titulaires.findIndex(t => t.id === id)
      this.etape.titulaires.splice(index, 1)
    },

    amodiataireAdd () {
      const amodiataire = { id: '', nom: '' }
      this.etape.amodiataires.push(amodiataire)
    },

    amodiataireRemove (id) {
      const index = this.etape.amodiataires.findIndex(t => t.id === id)
      this.etape.amodiataires.splice(index, 1)
    },

    substanceAdd () {
      const substance = { id: '', nom: ''}
      this.etape.substances.push(substance)
    },
    
    substanceUpdate (etapeSubstanceIndex, substanceId) {
      this.etape.substances[etapeSubstanceIndex] = this.substances.find(s => s.id === substanceId)
    },

    substanceRemove (id) {
      const index = this.etape.substances.findIndex(t => t.id === id)
      this.etape.substances.splice(index, 1)
    }
  }
}
</script>
