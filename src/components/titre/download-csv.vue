<template>
  <Download :name="titre.id" type="csv" :content-build="contentBuild" />
</template>

<script>
import { parse } from 'json2csv'
import Download from '../_common/download-client.vue'

export default {
  components: {
    Download
  },
  props: {
    titre: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    contentBuild() {
      const titresFormatCsv = points =>
        points.map(point =>
          point.references.reduce(
            (acc, ref) => {
              acc[`${ref.geoSysteme.nom} x`] = ref.coordonnees.x
              acc[`${ref.geoSysteme.nom} y`] = ref.coordonnees.y

              return acc
            },
            {
              groupe: point.groupe,
              contour: point.contour,
              point: point.point,
              nom: point.nom,
              'WGS84 x': point.coordonnees.x,
              'WGS84 y': point.coordonnees.y,
              description: point.description
            }
          )
        )

      const csv = parse(titresFormatCsv(this.titre.points), {})

      return csv
    }
  }
}
</script>
