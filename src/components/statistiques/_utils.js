const suggestedMaxCalc = (annees, ids, titreType) => {
  // si le type de titre est spécifié, et que le nombre maximum de titres de ce type toute année confondue est au plus 10, on fixe la borne maximale à 10...
  if (
    titreType &&
    ids.includes(titreType) &&
    Math.max(...annees.map(annee => annee[titreType].quantite)) <= 10
  ) {
    return 10
  }
  // sinon on calcule le max de tous les graphs toute année confondue
  return Math.max(
    ...annees.reduce((acc, annee) => {
      acc.push(...ids.map(id => annee[id].quantite))

      return acc
    }, [])
  )
}

const statsBarFormat = ({
  annees,
  id,
  bar,
  line,
  labelX,
  labelBar,
  labelLine
}) =>
  annees.reduce(
    (acc, stats) => {
      acc.labels.push(stats[labelX])
      const dataLine = id ? stats[id][line] : stats[line]
      const dataBar = id ? stats[id][bar] : stats[bar]
      acc.datasets[0].data.push(dataLine)
      acc.datasets[1].data.push(dataBar)

      return acc
    },
    {
      labels: [],
      datasets: [
        {
          type: 'line',
          label: labelLine,
          data: [],
          yAxisID: 'line',
          fill: 'start',
          tension: 0.5,
          backgroundColor: 'rgba(55, 111, 170, 0.2)',
          borderColor: 'rgb(55, 111, 170)'
        },
        {
          type: 'bar',
          label: labelBar,
          yAxisID: 'bar',
          data: [],
          backgroundColor: 'rgb(118, 182, 189)'
        }
      ]
    }
  )

const statsLineFormat = ({ stats, id, labelX, labelY }) =>
  stats.reduce(
    (acc, stat) => {
      acc.labels.push(stat[labelX])
      acc.datasets[0].data.push(stat[id])

      return acc
    },
    {
      labels: [],
      datasets: [
        {
          label: labelY,
          data: [],
          fill: 'start',
          tension: 0.5,
          backgroundColor: 'rgba(118, 182, 189, 0.2)',
          borderColor: 'rgb(118, 182, 189)'
        }
      ]
    }
  )

export { suggestedMaxCalc, statsBarFormat, statsLineFormat }
