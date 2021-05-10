<template>
  <canvas ref="canvas" />
</template>

<script>
import {
  Chart,
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
  LineController,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
} from 'chart.js'

Chart.register(
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
  LineController,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
)

export default {
  props: {
    data: { type: Object, required: true },
    aspectRatio: { type: Number, default: 2 },
    suggestedMax: { type: Number, default: 0 }
  },

  data() {
    return {
      canvas: null
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas

    // eslint-disable-next-line no-new
    new Chart(this.canvas.getContext('2d'), {
      type: 'bar',
      data: this.data,
      options: {
        locale: 'fr-FR',
        aspectRatio: this.aspectRatio,
        responsive: true,
        scales: {
          bar: { id: 'bar', min: 0, suggestedMax: this.suggestedMax },
          line: { id: 'line', min: 0, position: 'right' }
        },
        plugins: {
          legend: {
            reverse: true
          }
        }
      }
    })
  }
}
</script>
