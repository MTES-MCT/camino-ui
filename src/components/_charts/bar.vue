<template>
  <canvas ref="canvas" />
</template>

<script>
import { nextTick } from 'vue'
import {
  Chart,
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
  LineController,
  PointElement,
  LineElement
} from 'chart.js'

Chart.register(
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
  LineController,
  PointElement,
  LineElement
)

export default {
  props: {
    data: { type: Object, default: () => ({}) },
    aspectRatio: { type: Number, default: 1.33 },
    suggestedMax: { type: Number, default: 0 }
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
          locale: 'fr-FR',
          aspectRatio: this.aspectRatio,
          scales: {
            bar: {
              id: 'bar',
              display: true,
              min: 0,
              suggestedMax: this.suggestedMax
            },
            line: {
              id: 'line',
              display: true,
              min: 0,
              position: 'right'
            }
          }
        }
      })
    })
  }
}
</script>
