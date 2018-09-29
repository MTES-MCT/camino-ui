<template>
  <card>
    <messages :messages="messages" />
  </card>
</template>

<script>
import Card from './ui/card.vue'
import Messages from './ui/messages.vue'
export default {
  components: {
    Card,
    Messages
  },

  data () {
    return {
      messages: [
        {
          type: 'error',
          value: 'Erreur: page introuvable.'
        }
      ]
    }
  }

}
</script>

