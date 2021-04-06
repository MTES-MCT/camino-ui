<template>
  <canvas ref="canvas" />
</template>

<script>
import { nextTick } from 'vue'
import Chart from 'chart.js'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    aspectRatio: {
      type: Number,
      default: 3.33
    },
    suggestedMax: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      canvas: null
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas

    nextTick(() => {
      // eslint-disable-next-line no-new
      new Chart(this.canvas.getContext('2d'), {
        type: 'bar',
        data: this.data,
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            yAxes: [
              {
                id: 'bar',
                display: true,
                ticks: {
                  beginAtZero: true,
                  suggestedMax: this.suggestedMax
                }
              },
              {
                id: 'line',
                display: true,
                ticks: {
                  beginAtZero: true
                },
                position: 'right'
              }
            ]
          }
        }
      })
    })
  }
}
</script>
