<template>
  <popup>
    <template slot="header">
      <div>
        <h5><span class="cap-first">{{ titreNom }}</span></h5>
        <h2 class="cap-first mb-0">Déclaration trimestrielle {{ declarationPeriode }}</h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Or net extrait (g)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.masse"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Masse d’or obtenu après fonderie ou affinage. L'article 318 B de l'annexe II au CGI précise que la masse nette de l'or extrait chaque année est définie d'après la quantité d'or effectivement extraite par un traitement métallurgique.
        </p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Mercure récupéré (g)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.mercure"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Ensemble des produits contaminés envoyés en traitement.</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Carburant détaxé consommé (l)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.carburantDetaxe"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Volume total de carburant détaxé consommé lié aux travaux réalisés sur le titre objet de la déclaration.</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Carburant conventionnel consommé (l)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.carburantConventionnel"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Volume total de carburant conventionnel consommé lié aux travaux réalisés sur le titre objet de la déclaration.</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Pompes actives</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.pompes"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Nombre moyen de pompes actives sur le trimestre.

        La moyenne se calcule en sommant le nombre de pompe active pendant chacun des mois du trimestre considéré. Cette somme est ensuite divisée par trois.

        Les pompes à comptabiliser sont celles utilisées au niveau du chantier (pompe à gravier, pompe de relevage…).
        </p>
      </div>
    </div>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Pelles actives</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.pelles"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Nombre moyen de pelles actives sur le trimestre.

        La moyenne se calcule en sommant le nombre de pelle active pendant chacun des mois du trimestre considéré. Cette somme est ensuite divisée par trois.

        Les pelles à comptabiliser sont toutes celles utilisées au niveau du chantier (aménagement, exploitation, réhabilitation).

        </p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Effectif moyen sur le chantier</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.pelles"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Nombre moyen de salariés sur le titre objet de la déclaration.

        La moyenne se calcule en sommant le nombre de salariés pendant chacun des mois du trimestre considéré. Cette somme est ensuite divisée par trois.
        </p>
      </div>
    </div>

    <hr>

    <h4>Travaux de réhabilitation effectués</h4>
      
    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Mois 1</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <label> <input 
          v-model="declaration.travaux1_1" 
          type="checkbox" 
          value="Jack"
        >
          Travaux non débutés</label>
        <label><input 
          v-model="declaration.travaux1_2" 
          type="checkbox" 
          value="John"
        >
          Travaux d’exploitation en cours</label>
        <label><input 
          v-model="declaration.travaux1_3" 
          type="checkbox" 
          value="Mike"
        >
          Arrêt temporaire des travaux</label>
        <label><input 
          v-model="declaration.travaux1_4" 
          type="checkbox" 
          value="Mike"
        >
          Travaux de réhabilitation</label>
        <label><input 
          v-model="declaration.travaux1_5" 
          type="checkbox" 
          value="Mike"
        >
          Arrêt définitif (après réhabilitation)
        </label>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Mois 2</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <label> <input 
          v-model="declaration.travaux2_1" 
          type="checkbox" 
          value="Jack"
        >
          Travaux non débutés</label>
        <label><input 
          v-model="declaration.travaux2_2" 
          type="checkbox" 
          value="John"
        >
          Travaux d’exploitation en cours</label>
        <label><input 
          v-model="declaration.travaux2_3" 
          type="checkbox" 
          value="Mike"
        >
          Arrêt temporaire des travaux</label>
        <label><input 
          v-model="declaration.travaux2_4" 
          type="checkbox" 
          value="Mike"
        >
          Travaux de réhabilitation</label>
        <label><input 
          v-model="declaration.travaux2_5" 
          type="checkbox" 
          value="Mike"
        >
          Arrêt définitif (après réhabilitation)
        </label>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Mois 3</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <label> <input 
          v-model="declaration.travaux3_1" 
          type="checkbox" 
          value="Jack"
        >
          Travaux non débutés</label>
        <label><input 
          v-model="declaration.travaux3_2" 
          type="checkbox" 
          value="John"
        >
          Travaux d’exploitation en cours</label>
        <label><input 
          v-model="declaration.travaux3_3" 
          type="checkbox" 
          value="Mike"
        >
          Arrêt temporaire des travaux</label>
        <label><input 
          v-model="declaration.travaux3_4" 
          type="checkbox" 
          value="Mike"
        >
          Travaux de réhabilitation</label>
        <label><input 
          v-model="declaration.travaux3_5" 
          type="checkbox" 
          value="Mike"
        >
          Arrêt définitif (après réhabilitation)
        </label>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Dépenses relatives à la protection de l’environnement (euros)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.depensesEnvironnement"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Sont concernés les investissements listés à l’article 318 C de l’annexe II du CGI. Afin de bénéficier des déductions fiscales afférentes, les bénéficiaires doivent présenter, tous les ans, aux services déconcentrés chargés des mines les justificatifs attestant de la réalisation effective des investissements qui ont fait l'objet de déduction.
        </p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Informations complémentaires</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="declaration.complement"
          type="text" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Toute information sur les événements marquants du trimestre (accident, incident, arrêt ou suspension d’activité en précisant les raisons, changement de phase d’exploitation, difficultés rencontrées, etc.…).
        </p>
      </div>
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
    declarationPeriode: {
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
      declaration: {}
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
        console.log(this.declaration); 
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
    }
  }
}
</script>
