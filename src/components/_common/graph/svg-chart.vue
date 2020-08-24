<template>
  <div>
    <svg
      :view-box.camel="viewbox"
    >
      <SvgChartLine
        v-for="dataset in datasets"
        :key="dataset.name"
        :d="dataset"
        :o="options"
        :svg="svg"
        :lib="lib"
      />
      <SvgChartAxis
        :d="datasets"
        :o="options"
        :svg="svg"
        :lib="lib"
      />
    </svg>
  </div>
</template>

<script>
import SvgChartLine from './svg-chart-line.vue'
import SvgChartAxis from './svg-chart-axis.vue'

export default {
  name: 'SvgChart',

  components: {
    SvgChartLine,
    SvgChartAxis
  },

  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    datasets: {
      type: Array,
      default: () => []
    },
    svg: {
      type: Object,
      default: () => ({ w: 0, h: 0 })
    }
  },

  data() {
    return {
      lib: {
        map(value, inMin, inMax, outMin, outMax) {
          return (
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
          )
        },
        range(start, end, tick) {
          const s = Math.round(start / tick) * tick
          return Array.from(
            {
              length: Math.floor((end - start) / tick) + 1
            },
            (v, k) => {
              return k * tick + s
            }
          )
        }
      }
    }
  },

  computed: {
    viewbox() {
      return `0 0 ${this.svg.w} ${this.svg.h}`
    }
  }
}
</script>
