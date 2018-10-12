<template>
  <popup
    @popup-close="cancel"
  >
    <template slot="header">
      <div>
        <h5>Utilisateur</h5>
        <h2 class="mb-0">{{ utilisateur.id }}</h2>
      </div>
    </template>


    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nom</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="utilisateur.nom"
          type="text" 
          class="p-s"
          placeholder="Nom"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Prénom</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="utilisateur.prenom"
          type="text" 
          class="p-s"
          placeholder="Prénom"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="utilisateur.email"
          type="text" 
          class="p-s"
          placeholder="Email"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Téléphone fixe</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input 
          v-model="utilisateur.telephoneFixe"
          type="text" 
          class="p-s"
          placeholder="0100000000"
        >
      </div>
    </div>

    <messages :messages="messages" />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.enter="cancel"
          >Annuler</button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
            @keyup.enter="save"
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
    utilisateur: {
      type: Object,
      default: () => ({})
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
    }
  },

  methods: {
    cancel() {
      this.$store.commit('popupClose')
    },
    save() {

    }
  }
}
</script>
