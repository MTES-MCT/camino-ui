const graph = [
  {
    name: 'nombre de recherches par mois',
    options: {
      default: false,
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      line: {
        smoothing: 0.15,
        flattening: 0.5
      },
      legend: {
        x: true,
        y: true,
        valuesVisible: true,
        xName: 'Mois',
        yName: 'Nombre de recherches',
        xRetrait: 100,
        yRetrait: 100,
        xMarge: 50,
        yMarge: 40,
        xPas: 1,
        yPas: 1,
        xCenterCoef: 5,
        yCenterRetrait: 10,
        xColor: 'silver',
        yColor: 'silver'
      }
    },
    dataset: {
      id: 'searchCounts',
      colors: {
        path: 'rgba(55, 165, 230, 1.0)',
        circles: 'orange',
        values: 'orange'
      },
      font: {
        family: 'Verdana',
        size: '15'
      },
      values: [],
      legend: []
    }
  },
  {
    name: 'nombre de mises à jour par mois',
    options: {
      default: false,
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      line: {
        smoothing: 0.15,
        flattening: 0.5
      },
      legend: {
        x: true,
        y: true,
        valuesVisible: true,
        xName: 'Mois',
        yName: 'Nombre de mises à jour',
        xRetrait: 100,
        yRetrait: 100,
        xMarge: 50,
        yMarge: 40,
        xPas: 1,
        yPas: 1,
        xCenterCoef: 5,
        yCenterRetrait: 10,
        xColor: 'silver',
        yColor: 'silver'
      }
    },
    dataset: {
      id: 'searchCounts',
      colors: {
        path: 'rgba(55, 165, 230, 1.0)',
        circles: 'orange',
        values: 'orange'
      },
      font: {
        family: 'Verdana',
        size: '15'
      },
      values: [],
      legend: []
    }
  }
]

export { graph }
