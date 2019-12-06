<template>
  <Download
    :type="'csv'"
    :content="content"
    :name="name"
  />
</template>

<script>
import { parse } from 'json2csv'
import Download from '../_ui/download.vue'

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

  computed: {
    name() {
      return this.fileNameCreate(`camino-${this.titre.id}`, 'csv')
    },

    content() {
      const titresFormatCsv = points =>
        points.map(point =>
          point.references.reduce(
            (acc, ref) =>
              Object.assign(acc, {
                [`${ref.geoSysteme.nom} x`]: ref.coordonnees.x,
                [`${ref.geoSysteme.nom} y`]: ref.coordonnees.y
              }),
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
