<template>
  <popup
    @popup-close="errorsRemove"
  >
    <template slot="header">
      {{ etape.type.nom }}
    </template>

    <h4>{{ titre.nom }}</h4>
    <div 
      v-if="etape.date" 
      class="tablet-blobs mb"
    >
      <div class="tablet-blob-1-3 py-s">
        Date
      </div>
      <div class="tablet-blob-2-3">
        <input 
          v-model="etape.date"
          type="text" 
          class="p-s"
        >
      </div>
    </div>

    <messages :messages="messages" />

    <template slot="footer">
      <button
        class="btn rnd p-s full-x"
        @click="login"
        @keyup.enter="login"
      >Enregistrer</button>
    </template>
  </popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'
import { dateFormat } from '../../utils'


export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    Messages
  },

  data () {
    return {
      id: '',
      motDePasse: ''
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
    }
  },

  methods: {
    login () {
      // this.$store.dispatch('utilisateur/connecter', { id: this.id, motDePasse: this.motDePasse })
    },

    errorsRemove () {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    },

    dateFormat (date) {
      return dateFormat(date)
    }
  }
}
</script>
