const referenceBuild = (geoSystemeId, coordonnees, opposable) => {
  const reference = {
    geoSystemeId,
    coordonnees: { x: coordonnees[0], y: coordonnees[1] }
  }

  if (opposable) {
    reference.opposable = true
  }

  return reference
}

const pointReferencesBuild = (
  references,
  geoSystemeIds,
  geoSystemeOpposableId
) =>
  Object.keys(references).reduce((pointReferences, geoSystemeId) => {
    if (
      geoSystemeIds.includes(geoSystemeId) &&
      references[geoSystemeId][0] &&
      references[geoSystemeId][1] &&
      geoSystemeId
    ) {
      pointReferences.push(
        referenceBuild(
          geoSystemeId,
          references[geoSystemeId],
          geoSystemeIds.length > 1 && geoSystemeId === geoSystemeOpposableId
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
  geoSystemeId
) =>
  references.reduce((points, coordonnees) => {
    // exemple de format valide: 1,2;2,3
    const isValid =
      coordonnees && coordonnees.match(/(-?\d+(,\d+)?);\s*(-?\d+(,\d+)?)/g)

    if (isValid) {
      const point = {
        nom: null,
        lot,
        subsidiaire: true,
        description,
        groupe,
        contour,
        point: pointsLength + points.length + 1,
        references: [
          referenceBuild(
            geoSystemeId,
            coordonnees.split(';').map(c => parseFloat(c.replace(/,/g, '.'))),
            opposable
          )
        ]
      }

      points.push(point)
    }

    return points
  }, [])

const contourBuild = (
  contour,
  contourIndex,
  groupeIndex,
  geoSystemeIds,
  geoSystemeOpposableId
) => {
  const { points } = contour.reduce(
    ({ points, lotIndex }, point) => {
      if (!point.lot) {
        point.references = pointReferencesBuild(
          point.references,
          geoSystemeIds,
          geoSystemeOpposableId
        )

        // si il y a au moins une référence
        // si il y a plusieurs géo-système, au moins une référence doit être opposable
        if (
          point.references.length &&
          (geoSystemeIds.length === 1 ||
            (geoSystemeIds.length > 1 &&
              !!point.references.find(r => r.opposable)))
        ) {
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
            geoSystemeIds.length > 1,
            geoSystemeOpposableId
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
  geoSystemeIds,
  geoSystemeOpposableId
) => {
  const { points } = contours.reduce(
    ({ points, contourIndex }, contour) => {
      const pointsNew = contourBuild(
        contour,
        contourIndex,
        groupeIndex,
        geoSystemeIds,
        geoSystemeOpposableId
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

const pointsBuild = (groupes, geoSystemeIds, geoSystemeOpposableId) => {
  const { points } = groupes.reduce(
    ({ points, groupeIndex }, groupe) => {
      const pointsNew = groupeBuild(
        groupe,
        groupeIndex,
        geoSystemeIds,
        geoSystemeOpposableId
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
    'substances',
    'titulaires',
    'amodiataires',
    'administrations'
  ]

  // supprime les champs dont les ids sont vides
  propsIds.forEach(propId => {
    if (etape[propId]) {
      etape[propId] = etape[propId].filter(({ id }) => id)
    }
  })

  if (etape.substances && etape.substances.length) {
    etape.substances.forEach((substance, index) => {
      substance.ordre = index + 1
    })
  }

  if (
    etape.geoSystemeIds &&
    etape.geoSystemeIds.length &&
    etape.groupes.length
  ) {
    etape.points = pointsBuild(
      etape.groupes,
      etape.geoSystemeIds,
      etape.geoSystemeOpposableId || etape.geoSystemeIds[0]
    )
  } else {
    etape.points = null

    delete etape.incertitudes.points
  }

  delete etape.groupes
  delete etape.geoSystemeOpposableId
  delete etape.geoSystemeIds

  if (etape.duree && (etape.duree.ans || etape.duree.mois)) {
    etape.duree =
      (etape.duree.ans ? etape.duree.ans * 12 : 0) +
      (etape.duree.mois ? etape.duree.mois : 0)
  } else {
    etape.duree = null
  }

  const props = ['date', 'dateDebut', 'dateFin', 'surface', 'duree']

  props.forEach(prop => {
    if (etape[prop] === '') {
      etape[prop] = null
    }
  })

  if (etape.heritageProps) {
    Object.keys(etape.heritageProps).forEach(id => {
      delete etape.heritageProps[id].etape
    })
  }

  if (etape.heritageContenu) {
    Object.keys(etape.heritageContenu).forEach(sectionId => {
      Object.keys(etape.heritageContenu[sectionId]).forEach(elementId => {
        delete etape.heritageContenu[sectionId][elementId].etape
        delete etape.heritageContenu[sectionId][elementId].etapeId
      })
    })
  }

  if (!etape.contenu || !Object.keys(etape.contenu).length) {
    delete etape.contenu
  }

  return etape
}

export { etapeSaveFormat }
