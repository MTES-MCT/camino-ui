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

    var myChart = new Chart(this.canvas.getContext('2d'), {
      type: 'line',
      data: this.data,
      options: {
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

    console.log(myChart)
  }
}
</script>
