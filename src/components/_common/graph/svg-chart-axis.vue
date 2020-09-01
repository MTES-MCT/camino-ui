<template>
  <g>
    <line
      :x1="tickXs[0]"
      :y1="y"
      :x2="svg.w"
      :y2="y"
      stroke-width="1"
      stroke="silver"
    />
    <line
      :x1="x"
      y1="0"
      :x2="x"
      :y2="tickYs[0]"
      stroke-width="1"
      stroke="silver"
    />
    <line
      v-for="tickX in tickXs"
      :key="tickX.id"
      :x1="tickX"
      :y1="y - 5"
      :x2="tickX"
      :y2="y + 5"
      stroke-width="1"
      stroke="silver"
    />
    <line
      v-for="tickY in tickYs"
      :key="tickY.id"
      :x1="x - 5"
      :y1="tickY"
      :x2="x + 5"
      :y2="tickY"
      stroke-width="1"
      stroke="silver"
    />
    <text
      v-for="legendX in legendXs"
      :key="legendX.id"
      :x="legendX.tick - legendX.value.length*5"
      :y="y + margeY"
      font-family="Verdana"
      font-size="20"
      :fill="legendXColor"
      :transform="legendXsTransform(legendX)"
    >
      {{ legendX.value }}
    </text>
    <text
      v-for="legendY in legendYs"
      :key="legendY.id"
      :x="x - margeX"
      :y="legendY.tick + 5"
      font-family="Verdana"
      font-size="20"
      :fill="legendYColor"
    >
      {{ legendY.value }}
    </text>
    <text
      v-if="legendXName"
      :x="svgW/2"
      :y="svg.h - 5"
      font-family="Verdana"
      font-size="20"
      fill="grey"
    >
      {{ legendXName }}
    </text>
    <text
      v-if="legendYName"
      :x="0"
      :y="legendYNamePosition"
      font-family="Verdana"
      font-size="20"
      fill="grey"
      :transform="legendYNameTransform"
    >
      {{ legendYName }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'SvgChartAxis',

  props: {
    o: {
      type: Object,
      default: () => ({})
    },
    d: {
      type: Object,
      default: () => ({})
    },
    svg: {
      type: Object,
      default: () => ({ w: 0, h: 0 })
    },
    lib: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    // si options par défaut, prendre les options par défaut
    // sinon calculer les min, max en fonction des données des datasets
    xMin() {
      return this.o.default
        ? this.o.xMin
        : Math.min(0, Math.min(...this.d.values.map(v => v[0])))
    },

    xMax() {
      return this.o.default
        ? this.o.xMax
        : Math.max(...this.d.values.map(v => v[0]))
    },

    yMin() {
      return this.o.default
        ? this.o.yMin
        : Math.min(0, Math.min(...this.d.values.map(v => v[1])))
    },

    yMax() {
      return this.o.default
        ? this.o.yMax
        : Math.max(...this.d.values.map(v => v[1]))
    },

    margeX() {
      return this.o.legend.xMarge
    },

    margeY() {
      return this.o.legend.yMarge
    },

    pasX() {
      return this.o.legend.xPas
    },

    pasY() {
      return this.o.legend.yPas
    },

    svgW() {
      return this.svg.w
    },

    svgH() {
      return this.svg.h
    },

    svgWr() {
      return this.svg.wr
    },

    svgHr() {
      return this.svg.hr
    },

    legendXColor() {
      return this.o.legend.xColor
    },

    legendYColor() {
      return this.o.legend.yColor
    },

    legendXName() {
      return this.o.legend.x && this.o.legend.xName
    },

    legendYName() {
      return this.o.legend.y && this.o.legend.yName
    },

    legendYNamePosition() {
      return this.svgH / 2 + 3 * this.legendYName.length
    },

    legendYNameTransform() {
      return `rotate(-90 20, ${this.legendYNamePosition})`
    },

    x() {
      const x = this.lib.map(0, this.xMin, this.xMax, 0, this.svgW)
      return x + this.o.legend.xRetrait
    },

    y() {
      const y = this.lib.map(0, this.yMin, this.yMax, this.svgH, 0)
      return y - this.o.legend.yRetrait
    },

    tickXs() {
      const ticks = this.lib.range(this.xMin, this.xMax + this.pasX, this.pasX)
      const tickXs = ticks.map(tick => {
        const tickXs = this.lib.map(
          tick,
          this.xMin,
          this.xMax + this.pasX,
          0,
          this.svgWr
        )
        return tickXs + this.o.legend.xRetrait
      })
      tickXs.pop()

      return tickXs
    },

    tickYs() {
      const ticks = this.lib.range(this.yMin, this.yMax + this.pasY, this.pasY)
      const tickYs = ticks.map(tick => {
        const tickYs = this.lib.map(
          tick,
          this.yMin,
          this.yMax + this.pasY,
          this.svgHr,
          0
        )
        return tickYs
      })
      tickYs.pop()

      return tickYs
    },

    legendXs() {
      const pasArray = this.getPasArray(this.pasX, this.tickXs.length)
      const legendTextArray = this.legendXText

      let i = 0
      const ticksLegendX = this.tickXs.map(tick => {
        if (legendTextArray && legendTextArray.length) {
          return { tick, value: legendTextArray[i++] }
        } else {
          return { tick, value: pasArray[i++] }
        }
      })

      return this.o.legend.x && ticksLegendX
    },

    legendYs() {
      const pasArray = this.getPasArray(this.pasY, this.tickYs.length)
      const legendTextArray = this.legendYText

      let i = 0
      const ticksLegendY = this.tickYs.map(tick => {
        if (legendTextArray && legendTextArray.length) {
          return { tick, value: legendTextArray[i++] }
        } else {
          return { tick, value: pasArray[i++] }
        }
      })
      return this.o.legend.y && ticksLegendY
    },

    legendXText() {
      return this.d.legend[0]
    },

    legendYText() {
      return this.d.legend[1]
    }
  },

  methods: {
    getPasArray(pas, taille) {
      const pasArray = [taille]
      let _pas = -pas
      for (let i = 0; i < taille; i++) {
        pasArray[i] = (_pas += pas).toString()
      }
      return pasArray
    },

    legendXsTransform(legendX) {
      const x = legendX.tick
      const y = this.y + 75
      return legendX.value.length > 5 ? `rotate(-45 ${x}, ${y})` : null
    }
  }
}
</script>
