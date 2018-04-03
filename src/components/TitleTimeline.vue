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
    <title-timeline-event
      v-for="event in eventTypes[eventTypeCurrent]"
      :key="event.id" 
      :event="event" />
  </div>
</template>

<script>
import TitleTimelineEvent from './TitleTimelineEvent.vue'

export default {
  components: {
    TitleTimelineEvent
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
