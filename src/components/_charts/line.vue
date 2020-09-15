<template>
  <canvas ref="canvas" />
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
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
      type: 'line',
      data: this.data,
      options: {
        aspectRatio: 1.33,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    })
  }
}
</script>
