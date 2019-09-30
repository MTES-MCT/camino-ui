const referenceBuild = (geoSystemeId, uniteId, coordonnees, opposable) => ({
  geoSystemeId,
  uniteId,
  coordonnees: { x: coordonnees[0], y: coordonnees[1] },
  opposable: opposable || null
})

const geoSystemeOpposableFind = (geoSystemeOpposableId, geoSystemes) =>
  geoSystemeOpposableId
    ? geoSystemes.find(({ id }) => id === geoSystemeOpposableId)
    : geoSystemes[0]

const pointReferencesBuild = (references, geoSystemes, geoSystemeOpposableId) =>
  Object.keys(references).reduce((pointReferences, geoSystemeId) => {
    const etapeGeoSysteme = geoSystemes.find(({ id }) => geoSystemeId === id)

    if (!etapeGeoSysteme) {
      return pointReferences
    }

    if (
      references[geoSystemeId][0] &&
      references[geoSystemeId][1] &&
      geoSystemeId
    ) {
      pointReferences.push(
        referenceBuild(
          geoSystemeId,
          etapeGeoSysteme.uniteId,
          references[geoSystemeId],
          geoSystemes.length > 1 && geoSystemeId === geoSystemeOpposableId
        )
      )
    }

    return pointReferences
  }, [])

const lotPointsBuild = (
  pointsLength,
  { references, description },
  groupesLength,
  contoursLength,
  geoSystemes,
  geoSystemeOpposable
) =>
  references.length
    ? references.reduce((points, coordonnees, index) => {
        // userInput doit être de la forme 1.2,2.3\n2,-4\n-4.5,6\n
        // https://stackoverflow.com/a/18690202/2112538
        console.log(coordonnees)
        const isValid = coordonnees.match(/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/g)

        if (isValid) {
          points.push({
            nom: null,
            lot: true,
            subsidiaire: true,
            description: description,
            groupe: groupesLength + 1,
            contour: contoursLength + 1,
            point: pointsLength + index + 1,
            references: [
              referenceBuild(
                geoSystemeOpposable.id,
                geoSystemeOpposable.uniteId,
                coordonnees.split(',').map(parseFloat),
                geoSystemes.length > 1
              )
            ]
          })
        }

        return points
      }, [])
    : []

const contourBuild = (
  contour,
  contoursLength,
  groupesLength,
  geoSystemes,
  geoSystemeOpposable
) =>
  contour.reduce((points, point) => {
    if (!point.lot) {
      point.references = pointReferencesBuild(
        point.references,
        geoSystemes,
        geoSystemeOpposable.id
      )

      if (point.references.length) {
        point.groupe = groupesLength + 1
        point.contour = contoursLength + 1
        point.point = points.length + 1
        points.push(point)
      }
    } else {
      points = points.concat(
        lotPointsBuild(
          points.length,
          point,
          groupesLength,
          contoursLength,
          geoSystemes,
          geoSystemeOpposable
        )
      )
    }

    return points
  }, [])

const groupeBuild = (groupe, groupesLength, geoSystemes, geoSystemeOpposable) =>
  groupe.reduce((contours, contour) => {
    contours = contours.concat(
      contourBuild(
        contour,
        contours.length,
        groupesLength,
        geoSystemes,
        geoSystemeOpposable
      )
    )

    return contours
  }, [])

const pointsBuild = (groupes, geoSystemes, geoSystemeOpposableId) =>
  groupes.reduce((groupes, groupe) => {
    const geoSystemeOpposable = geoSystemeOpposableFind(
      geoSystemeOpposableId,
      geoSystemes
    )

    groupes = groupes.concat(
      groupeBuild(groupe, groupes.length, geoSystemes, geoSystemeOpposable)
    )

    return groupes
  }, [])

const etapeSaveFormat = etape => {
  etape = JSON.parse(JSON.stringify(etape))

  const propsFilter = (obj, prop, key) =>
    obj[prop].reduce((r, o) => (o[key] ? [...r, o[key]] : r), [])

  etape.visas = propsFilter(etape, 'visas', 'texte')

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
