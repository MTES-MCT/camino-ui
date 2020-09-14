const graph = [
  {
    name: 'productionOr',
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
        xName: 'année',
        yName: "Production d'or nette (kg)",
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
      id: 'productionOr',
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
    name: 'titresArm',
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
        xName: 'année',
        yName: 'ARM valides',
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
      id: 'titresArm',
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
    name: 'titresPrm',
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
        xName: 'année',
        yName: 'PER valides',
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
      id: 'titresPrm',
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
    name: 'titresAxm',
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
        xName: 'année',
        yName: 'AEX valides',
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
      id: 'titresAxm',
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
    name: 'titresPxm',
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
        xName: 'année',
        yName: 'PEX valides',
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
      id: 'titresPxm',
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
    name: 'titresCxm',
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
        xName: 'année',
        yName: 'Concessions valides',
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
      id: 'titresCxm',
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
