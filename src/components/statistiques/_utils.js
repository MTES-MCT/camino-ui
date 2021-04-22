// Valeur max des abscisses : doit être la même pour certains graphes afin de comparer visuelement les données
// = max des quantités tous graph confondus parmis les ids sur l'ensemble des années requises si supérieur à 10, sinon 10
// ids : liste des id à prendre en compte
// start : année de départ de la liste
const suggestedMaxCalc = (annees, ids) => {
  const quantiteMax = Math.max(
    ...annees.map(annee => Math.max(...ids.map(id => annee[id].quantite)))
  )

  return quantiteMax > 10 ? quantiteMax : 10
}

const statsBarFormat = ({ annees, id, bar, line, labelBar, labelLine }) => {
  return annees.reduce(
    (acc, statsAnnee) => {
      acc.id = id
      acc.labels.push(statsAnnee.annee)
      acc.datasets[0].data.push(statsAnnee[id][bar])
      acc.datasets[1].data.push(statsAnnee[id][line])

      return acc
    },
    {
      id: '',
      labels: [],
      datasets: [
        {
          type: 'line',
          label: labelLine,
          yAxisID: 'line',
          legendPosition: 'right',
          data: [],
          backgroundColor: 'rgba(55, 111, 170, 0.2)',
          borderColor: 'rgb(55, 111, 170)'
        },
        {
          type: 'bar',
          label: labelBar,
          yAxisID: 'bar',
          legendPosition: 'left',
          data: [],
          backgroundColor: 'rgb(118, 182, 189)'
        }
      ]
    }
  )
}

const statsLineFormat = ({ annees, id, label }) => {
  return annees.reduce(
    (acc, statsAnnee) => {
      acc.labels.push(statsAnnee.annee)
      acc.datasets[0].data.push(statsAnnee[id])

      return acc
    },
    {
      labels: [],
      datasets: [
        {
          label,
          data: [],
          backgroundColor: 'rgba(118, 182, 189, 0.2)',
          borderColor: 'rgb(118, 182, 189)'
        }
      ]
    }
  )
}

export { suggestedMaxCalc, statsBarFormat, statsLineFormat }
