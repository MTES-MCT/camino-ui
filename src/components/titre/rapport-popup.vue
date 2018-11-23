<template>
  <popup>
    <template slot="header">
      <div>
        <h5><span class="cap-first">{{ titreNom }} | Rapport trimestriel d'activité</span></h5>
        <h2 class="cap-first mb-0">{{ trimestreNom }}</h2>
      </div>
    </template>

    <div class="p-s bg-info color-bg mb">Besoin d'aide pour remplir ce rapport ? Appelez le 06.61.26.42.89</div>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Or net extrait (g)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.or"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Masse d’or en gramme obtenue au cours du trimestre après fonderie ou affinage (au sens de l’<a 
          href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021850943&cidTexte=LEGITEXT000006069569" 
          target="_blank"
          rel="noopener noreferrer"
        >article 318 B de l'annexe II au code général des impôts, annexe 2</a>).
      </p></div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Mercure récupéré (g)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.mercure"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Masse en gramme de l’ensemble des produits contaminés envoyés en traitement au cours du trimestre.</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Carburant détaxé (l)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.carburantDetaxe"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Volume total en litre de carburant détaxé consommé au cours du trimestre par les travaux réalisés sur le chantier.</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Carburant conventionnel (l)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.carburantConventionnel"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Volume total en litre de carburant conventionnel consommé au cours du trimestre par les travaux réalisés sur le chantier.</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Pompes actives</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.pompes"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
          step="0.01"
        >
        <p class="h5 mb-0">Nombre moyen de pompes actives au cours du trimestre utilisées sur le chantier (pompe à gravier, pompe de relevage…).</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Pelles actives</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.pelles"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
          step="0.01"
        >
        <p class="h5 mb-0">Nombre moyen de pelles actives au cours du trimestre utilisées sur le chantier (aménagement, exploitation, réhabilitation).</p>
      </div>
    </div>

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Effectifs</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.effectifs"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
          step="0.01"
        >
        <p class="h5 mb-0">Nombre moyen de salariés sur le chantier au cours du trimestre.</p>
      </div>
    </div>
     

    <hr>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Dépenses relatives à la protection de l’environnement (euros)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model.number="rapport.contenu.environnement"
          type="number" 
          class="p-s mb-s"
          placeholder="…"
        >
        <p class="h5 mb-0">Montant en euros des investissements consentis au cours du trimestre listés à l’<a 
          href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021850940&cidTexte=LEGITEXT000006069569" 
          target="_blank"
          rel="noopener noreferrer"
        >article 318 C de l’annexe II du code général des impôts</a>. Afin de bénéficier des déductions fiscales afférentes, les justificatifs attestant de la réalisation effective des investissements sont susceptibles de vous êtres demandés par l’administration.</p>
      </div>
    </div>

    <hr>

    <h4>Statut des travaux</h4>
    <div 
      v-for="mois in rapport.contenu.travaux" 
      :key="mois.id"
    >
      <hr>
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>{{ mois.nom }}
        </h6></div>
        <div class="mb tablet-blob-2-3">
          <label><input 
            v-model="mois.nonDebutes"
            type="checkbox"
          >Non débutés</label>
          <label><input 
            v-model="mois.exploitationEnCours"
            type="checkbox"
          >Exploitation en cours</label>
          <label><input 
            v-model="mois.arretTemporaire"
            type="checkbox"
          >Arrêt temporaire</label>
          <label><input 
            v-model="mois.rehabilitation"
            type="checkbox"
          >Réhabilitation</label>
          <label><input 
            v-model="mois.arretDefinitif"
            type="checkbox"
          >Arrêt définitif (après réhabilitation)</label>
        </div>
      </div>
    </div>

    <hr>
    <h4>Informations complémentaires</h4>
    <hr>
    <div class="mb">
      <textarea 
        v-model="rapport.contenu.complement"
        class="p-s mb-s"
      />
      <p class="h5 mb-0">Toute information sur les événements marquants du trimestre (accident, incident, arrêt ou suspension d’activité en précisant les raisons, évolution de l’exploitation, difficultés rencontrées, etc.).</p>
    </div>

    <div class="p-s bg-warning color-bg bold mb">Une fois enregistré ce formulaire ne sera plus modifiable.</div>

    <template slot="footer">
      <messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >Annuler</button>
        </div>
        <div 
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
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
    rapport: {
      type: Object,
      default: () => ({})
    },
    trimestreNom: {
      type: String,
      default: ''
    },
    titreNom: {
      type: String,
      default: ''
    }
  },

  computed: {
    messages () {
      return this.$store.state.popup.messages
    },
    entreprises () {
      return this.$store.state.entreprises.list
    },
    substances () {
      return this.$store.state.substances.list
    },
    complete () {
      return this.rapport.contenu.or || this.rapport.contenu.or === 0
        && this.rapport.contenu.mercure || this.rapport.contenu.mercure === 0
        && this.rapport.contenu.carburantDetaxe || this.rapport.contenu.carburantDetaxe === 0
        && this.rapport.contenu.carburantConventionnel || this.rapport.contenu.carburantConventionnel === 0
        && this.rapport.contenu.pompes || this.rapport.contenu.pompes === 0
        && this.rapport.contenu.pelles || this.rapport.contenu.pelles === 0
        && this.rapport.contenu.effectifs || this.rapport.contenu.effectifs === 0
        && this.rapport.contenu.environnement || this.rapport.contenu.environnement === 0
    }
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save () {
      if (this.complete) {
        this.rapport.date = new Date()

        this.$store.dispatch('titreTravaux/rapportAdd', this.rapport)
      }
    },

    cancel () {
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
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
