<template>
  <g>
    <path
      :style="styles.path"
      :d="pathD"
    />

    <circle
      v-for="p in pointsPositions"
      :key="p.id"
      :cx="p[0]"
      :cy="p[1]"
      r="2.5"
      :style="styles.circles"
    />
    <text
      v-for="valuePosition in valuesPositions"
      :key="valuePosition.id"
      :x="valuePosition.pointsPositions[0] - valuePosition.value.toString().length*o.legend.xCenterCoef"
      :y="valuePosition.pointsPositions[1] - o.legend.yCenterRetrait"
      :style="styles.values"
    >
      {{ valuePosition.value }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'SvgChartLine',

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
    styles() {
      return {
        path: {
          fill: this.d.colors.path,
          stroke: this.d.colors.path,
          strokeWidth: 1.5,
          fillOpacity: 0.15,
          strokeOpacity: 0.8
        },
        circles: {
          fill: this.d.colors.circles
        },
        values: {
          fontFamily: this.d.font.family,
          fontSize: this.d.font.size,
          fill: this.d.colors.values
        }
      }
    },

    pathD() {
      return this.pointsPositions.reduce(
        (acc, e, i, a) =>
          i === 0
            ? `M ${a[a.length - 1][0]},${this.svgHr}
L ${e[0]},${this.svgHr} L ${e[0]},${e[1]}`
            : `${acc} ${this.bezierCommand(e, i, a)}`,
        ''
      )
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

    pasX() {
      return this.o.legend.xPas
    },

    pasY() {
      return this.o.legend.yPas
    },

    valuesVisible() {
      return this.o.legend.valuesVisible
    },

    pointsPositions() {
      return this.d.values.map(e => {
        const x = this.lib.map(
          e[0],
          this.xMin,
          this.xMax + this.pasX,
          0,
          this.svgWr
        )

        const y = this.lib.map(
          e[1],
          this.yMin,
          this.yMax + this.pasY,
          this.svgHr,
          0
        )

        const pointsPositions = [
          this.o.legend.x ? x + this.o.legend.xRetrait : x,
          y
        ]

        return pointsPositions
      })
    },

    valuesPositions() {
      return this.d.values.map(e => {
        const x = this.lib.map(
          e[0],
          this.xMin,
          this.xMax + this.pasX,
          0,
          this.svgWr
        )

        const y = this.lib.map(
          e[1],
          this.yMin,
          this.yMax + this.pasY,
          this.svgHr,
          0
        )

        const pointsPositions = [
          this.o.legend.x ? x + this.o.legend.xRetrait : x,
          y
        ]

        return this.valuesVisible && { pointsPositions, value: e[1] }
      })
    }
  },

  methods: {
    line(pointA, pointB) {
      const lengthX = pointB[0] - pointA[0]
      const lengthY = pointB[1] - pointA[1]

      return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
      }
    },

    controlPoint(current, previous, next, reverse) {
      const p = previous || current
      const n = next || current
      const o = this.line(p, n)
      // work in progress…
      const flat = this.lib.map(
        Math.cos(o.angle) * this.o.line.flattening,
        0,
        1,
        1,
        0
      )
      const angle = o.angle * flat + (reverse ? Math.PI : 0)
      const length = o.length * this.o.line.smoothing
      const x = current[0] + Math.cos(angle) * length
      const y = current[1] + Math.sin(angle) * length
      return [x, y]
    },

    bezierCommand(point, i, a) {
      const cps = this.controlPoint(a[i - 1], a[i - 2], point)
      const cpe = this.controlPoint(point, a[i - 1], a[i + 1], true)
      const close = i === a.length - 1 ? ' z' : ''
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}${close}`
    }
  }
}
</script>
