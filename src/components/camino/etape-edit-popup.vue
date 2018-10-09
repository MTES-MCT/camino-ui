<template>
  <popup
    @popup-close="errorsRemove"
  >
    <template slot="header">
      <div>
        <h5><span class="cap-first">{{ titre.nom }}</span><span class="color-neutral"> | </span><span class="cap-first">{{ demarche.type.nom }}</span></h5>
        <h2 class="cap-first mb-0">{{ etape.type.nom }}</h2>
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
      <h4 class="mb-s">Périmètre ({{ etape.points.length }} points)</h4>
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
        <button 
          class="btn-border rnd-xs p-s full-x mb flex" 
          @click="pointReferenceAdd(point)"
        > 
          Ajouter une référence
          <i class="icon-24 icon-24-plus flex-right" />
        </button>
        <hr>
      </div>
      <button 
        class="btn-border rnd-xs p-s full-x mb  flex" 
        @click="pointAdd"
      >Ajouter un point<i class="icon-24 icon-24-plus flex-right" /></button>
      <hr>
    </div>
    

    <div>
      <h4 class="mb-s">Titulaires ({{ etape.titulaires.length }})</h4>
      <hr>
      <div
        v-for="titulaire in etape.titulaires"
        :key="titulaire.id"
      >
        <div class="flex full-x">
          <h4>Titulaire</h4>
          <div class="flex-right">
            <button
              class="btn-border p-s rnd-xs mt--s"
              @click="titulaireRemove()"
            >
              <i class="icon-24 icon-24-minus" />
            </button>
          </div>
        </div>
        <div class="tablet-blobs">

          <div class="mb tablet-blob-2-3">
            <h6>Nom</h6>
            <input 
              v-model="titulaire.nom"
              type="text" 
              class="p-s"
            >
          </div>
          <div class="mb tablet-blob-1-3">
            <h6>Siret (ou équivalent)</h6>
            <div 
              class="full-x p-s bg-alt-alpha"
            >{{ titulaire.legalSiret || titulaire.legalEtranger }}&nbsp;
            </div>
          </div>
        </div>
        <hr>
      </div>
      <button 
        class="btn-border rnd-xs p-s full-x mb  flex" 
        @click="titulaireAdd"
      >Ajouter un titulaire<i class="icon-24 icon-24-plus flex-right" /></button>
      <hr>
    </div>

    <div 
      v-if="etape.amodiataires" 
      class="tablet-blobs"
    >
      <div class="mb tablet-blob-1-3 py-s">
        Amodiataires
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="etape.amodiataires"
          type="text" 
          class="p-s"
        >
      </div>
    </div>

    <div 
      v-if="etape.substances" 
      class="tablet-blobs"
    >
      <div class="mb tablet-blob-1-3 py-s">
        Substances
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="etape.substances"
          type="text" 
          class="p-s"
        >
      </div>
    </div>




    <messages :messages="messages" />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="login"
            @keyup.enter="login"
          >Annuler</button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="login"
            @keyup.enter="login"
          >Enregistrer</button>
        </div>
      </div>
    </template>
  </popup>
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

  data () {
    return {
      id: ''
    }
  },

  computed: {
    messages () {
      return this.$store.state.utilisateur.loginMessages
    },
    titre () {
      return this.$store.state.titre.current
    },
    etape () {
      return this.$store.state.titre.etapeEdit
    },
    demarche () {
      return this.titre.demarches.find(d => d.etapes.find(e => e.id === this.etape.id))
    }
  },

  methods: {
    login () {
      // this.$store.dispatch('utilisateur/connecter', { id: this.id, motDePasse: this.motDePasse })
    },

    errorsRemove () {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    },
    pointAdd () {
      const point = { coordonees: { x: '', y: '' }, references: [] }
      this.etape.points.push(point)
    },
    pointRemove (point) {
      const index = this.etape.points.findIndex(p => p.id === point.id)
      console.log(index);
      this.etape.points.splice(index, 1)
    },
    pointReferenceAdd (point) {
      const reference = { coordonees: { x: '', y: '' } }
      point.references.push(reference)
    },
    pointReferenceRemove (point, reference) {
      const index = point.references.findIndex(r => r.id === reference.id)
      point.references.splice(index, 1)
    },
    titulaireAdd () {
      const titulaire = { id: '', nom: '' }
      this.etape.titulaires.push(titulaire)
    },
    titulaireRemove () {
      const titulaire = { id: '', nom: '' }
      this.etape.titulaires.push(titulaire)
    }
  }
}
</script>
