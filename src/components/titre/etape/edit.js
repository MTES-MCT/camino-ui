const geoSystemeOpposableFind = (geoSystemeId, geoSystemes) =>
  geoSystemeId
    ? geoSystemes.find(({ id }) => id === geoSystemeId)
    : geoSystemes[0]

const referenceBuild = (geoSystemeId, uniteId, coordonnees, opposable) => ({
  geoSystemeId,
  uniteId,
  coordonnees: { x: coordonnees[0], y: coordonnees[1] },
  opposable: opposable || null
})

const pointReferencesBuild = (references, geoSystemes, geoSystemeOpposableId) =>
  Object.keys(references).reduce((pointReferences, geoSystemeId) => {
    const geoSysteme = geoSystemes.find(({ id }) => geoSystemeId === id)

    if (
      geoSysteme &&
      references[geoSystemeId][0] &&
      references[geoSystemeId][1] &&
      geoSystemeId
    ) {
      pointReferences.push(
        referenceBuild(
          geoSystemeId,
          geoSysteme.uniteId,
          references[geoSystemeId],
          geoSystemes.length > 1 && geoSystemeId === geoSystemeOpposableId
        )
      )
    }

    return pointReferences
  }, [])

const lotPointsBuild = (
  { references, description },
  pointsLength,
  lot,
  contour,
  groupe,
  opposable,
  geoSysteme
) =>
  references.reduce((points, coordonnees) => {
    // exemple de format valide: 1.2,2.3
    const isValid =
      coordonnees && coordonnees.match(/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/g)

    if (isValid) {
      points.push({
        lot,
        subsidiaire: true,
        description,
        groupe,
        contour,
        point: pointsLength + points.length + 1,
        references: [
          referenceBuild(
            geoSysteme.id,
            geoSysteme.uniteId,
            coordonnees.split(',').map(parseFloat),
            opposable
          )
        ]
      })
    }

    return points
  }, [])

const contourBuild = (
  contour,
  contourIndex,
  groupeIndex,
  geoSystemes,
  geoSystemeOpposable
) => {
  const { points } = contour.reduce(
    ({ points, lotIndex }, point) => {
      if (!point.lot) {
        point.references = pointReferencesBuild(
          point.references,
          geoSystemes,
          geoSystemeOpposable.id
        )

        if (point.references.length) {
          point.groupe = groupeIndex
          point.contour = contourIndex
          point.point = points.length + 1
          points.push(point)
        }
      } else if (point.references.length) {
        points = points.concat(
          lotPointsBuild(
            point,
            points.length,
            lotIndex,
            contourIndex,
            groupeIndex,
            geoSystemes.length > 1,
            geoSystemeOpposable
          )
        )
        lotIndex += 1
      }

      return { points, lotIndex }
    },
    { points: [], lotIndex: 1 }
  )

  return points
}

const groupeBuild = (
  contours,
  groupeIndex,
  geoSystemes,
  geoSystemeOpposable
) => {
  const { points } = contours.reduce(
    ({ points, contourIndex }, contour) => {
      const pointsNew = contourBuild(
        contour,
        contourIndex,
        groupeIndex,
        geoSystemes,
        geoSystemeOpposable
      )

      if (pointsNew.length) {
        points = points.concat(pointsNew)
        contourIndex++
      }

      return { points, contourIndex }
    },
    { points: [], contourIndex: 1 }
  )

  return points
}

const pointsBuild = (groupes, geoSystemes, geoSystemeOpposableId) => {
  const geoSystemeOpposable = geoSystemeOpposableFind(
    geoSystemeOpposableId,
    geoSystemes
  )

  const { points } = groupes.reduce(
    ({ points, groupeIndex }, groupe) => {
      const pointsNew = groupeBuild(
        groupe,
        groupeIndex,
        geoSystemes,
        geoSystemeOpposable
      )

      if (pointsNew.length) {
        points = points.concat(pointsNew)
        groupeIndex++
      }

      return { points, groupeIndex }
    },
    { points: [], groupeIndex: 1 }
  )

  return points
}

const etapeSaveFormat = etape => {
  etape = JSON.parse(JSON.stringify(etape))

  const propsIds = [
    'substancesIds',
    'titulairesIds',
    'amodiatairesIds',
    'administrationsIds'
  ]

  // supprime les champs dont les ids sont vides
  propsIds.forEach(propId => {
    if (etape[propId]) {
      etape[propId] = etape[propId].filter(id => id)
    }
  })

  if (etape.geoSystemes.length && etape.groupes.length) {
    etape.points = pointsBuild(
      etape.groupes,
      etape.geoSystemes,
      etape.geoSystemeOpposableId
    )
  } else {
    etape.incertitudes.points = null
    etape.points = null
  }

  delete etape.groupes
  delete etape.geoSystemeOpposableId
  delete etape.geoSystemes

  if (etape.duree.ans || etape.duree.mois) {
    etape.duree =
      (etape.duree.ans ? etape.duree.ans * 12 : 0) +
      (etape.duree.mois ? etape.duree.mois : 0)
  } else {
    etape.duree = null
  }

  const props = [
    'date',
    'dateDebut',
    'dateFin',
    'surface',
    'duree',
    'volume',
    'volumeUniteId',
    'engagement',
    'engagementDeviseId'
  ]

  props.forEach(prop => {
    if (etape[prop] === '') {
      etape[prop] = null
    }
  })

  return etape
}

export { etapeSaveFormat }
