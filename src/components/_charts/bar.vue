<template>
  <canvas ref="canvas" />
</template>

<script>
import Vue from 'vue'
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

    Vue.nextTick(() => {
      // eslint-disable-next-line no-new
      new Chart(this.canvas.getContext('2d'), {
        type: 'bar',
        data: this.data,
        options: {
          aspectRatio: 1.33,
          scales: {
            yAxes: [
              {
                id: 'bar',
                display: true,
                ticks: {
                  beginAtZero: true
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
