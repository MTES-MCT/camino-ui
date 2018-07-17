<template>
  <div>
    <ul class="list-inline">
      <li
        v-for="(events, eventType) in eventTypes"
        :key="eventType"
        :class="{ active: eventTypeCurrent === eventType}">
        <button
          class="btn px py-s cap"
          @click="set(eventType)">{{ eventType }}</button>
      </li>
    </ul>
    <titre-chronologie-evenement
      v-for="event in eventTypes[eventTypeCurrent]"
      :key="event.id" 
      :event="event" />
  </div>
</template>

<script>
import TitreChronologieEvenement from '@/components/camino/titre-timeline-event.vue'

export default {
  components: {
    TitreChronologieEvenement
  },

  props: {
    eventTypes: {
      type: Object,
      default: () => { }
    }
  },

  data () {
    return {
      eventTypeCurrent: 'statut'
    }
  },

  methods: {
    set (e) {
      this.eventTypeCurrent = e

    }
  }
}
</script>
