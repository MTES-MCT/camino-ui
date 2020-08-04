<template>
  <input
    v-if="modern"
    :value="value"
    type="date"
    class="p-s"
    :class="{ 'mb-s': value, mb: !value }"
    @change="$emit('input', $event.target.value)"
  >
  <div
    v-else
    class="blobs-mini"
  >
    <div class="blob-mini-1-3">
      <input
        v-model.number="dayId"
        type="number"
        min="1"
        :max="daysMax"
        placeholder="jour"
        class="p-s"
        @change="update"
      >
    </div>
    <div class="blob-mini-1-3">
      <select
        v-model.number="monthId"
        class="p-s mr-s"
        @change="update"
      >
        <option
          :value="null"
          disabled
          hidden
        >
          mois
        </option>
        <option
          v-for="month in months"
          :key="month.id"
          :value="month.id"
        >
          {{ monthNames[month.id - 1] }}
        </option>
      </select>
    </div>
    <div class="blob-mini-1-3">
      <input
        v-model.number="yearId"
        type="number"
        :min="yearMin"
        :max="yearMax"
        placeholder="année"
        class="p-s"
        @change="update"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    monthNames: {
      type: Array,
      default: () => [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'aout',
        'septembre',
        'octobre',
        'novembre',
        'décembre'
      ]
    }
  },

  data() {
    return {
      modern: false, // uses browser default input type="date"
      months: [
        { id: 1, days: 31 },
        { id: 2, days: 29 },
        { id: 3, days: 31 },
        { id: 4, days: 30 },
        { id: 5, days: 31 },
        { id: 6, days: 30 },
        { id: 7, days: 31 },
        { id: 8, days: 31 },
        { id: 9, days: 30 },
        { id: 10, days: 31 },
        { id: 11, days: 30 },
        { id: 12, days: 31 }
      ],
      yearId: null,
      monthId: null,
      dayId: null,
      yearMin: 1750,
      yearMax: 2099
    }
  },

  computed: {
    daysMax() {
      return this.monthId
        ? this.months.find(m => m.id === this.monthId).days
        : 31
    }
  },

  created() {
    if (this.value) {
      const ids = this.value.split('-')
      this.yearId = Number(ids[0])
      this.monthId = Number(ids[1])
      this.dayId = Number(ids[2])
    }
  },

  methods: {
    update() {
      let date

      if (this.dayId < 1) {
        this.dayId = null
      }

      if (this.dayId > this.dayMax) {
        this.dayId = this.dayMax
      }

      if (this.yearId && this.yearId < this.yearMin) {
        this.yearId = this.yearMin
      }

      if (this.yearId && this.yearId > this.yearMax) {
        this.yearId = this.yearMax
      }

      if (this.monthId && this.dayId && this.yearId) {
        date = `${this.yearId}-${this.monthId
          .toString()
          .padStart(2, '0')}-${this.dayId.toString().padStart(2, '0')}`
      } else {
        date = ''
      }

      this.$emit('input', date)
    }
  }
}
</script>
