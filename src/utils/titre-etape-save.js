const referenceBuild = (id, x, y, geoSystemeId, opposable) => {
  const reference = {
    geoSystemeId,
    coordonnees: {
      x,
      y
    }
  }

  if (id) {
    reference.id = id
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
      references[geoSystemeId].x &&
      references[geoSystemeId].y &&
      geoSystemeId
    ) {
      pointReferences.push(
        referenceBuild(
          references[geoSystemeId].id,
          references[geoSystemeId].x,
          references[geoSystemeId].y,
          geoSystemeId,
          geoSystemeIds.length > 1 && geoSystemeId === geoSystemeOpposableId
        )
      )
    }

    return pointReferences
  }, [])

const pointsLotBuild = (
  { references, description },
  pointsLength,
  lot,
  contour,
  groupe,
  opposable,
  geoSystemeId
) =>
  references.reduce((points, { x, y, id }) => {
    const isValid = x && y

    if (isValid) {
      const point = {
        nom: null,
        lot,
        subsidiaire: true,
        description,
        groupe,
        contour,
        point: pointsLength + points.length + 1,
        references: [referenceBuild(id, x, y, geoSystemeId, opposable)]
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
        const newPoint = JSON.parse(JSON.stringify(point))
        newPoint.references = pointReferencesBuild(
          newPoint.references,
          geoSystemeIds,
          geoSystemeOpposableId
        )

        // si il y a au moins une référence
        // si il y a plusieurs géo-système, au moins une référence doit être opposable
        if (
          newPoint.references.length &&
          (geoSystemeIds.length === 1 ||
            (geoSystemeIds.length > 1 &&
              !!newPoint.references.find(r => r.opposable)))
        ) {
          newPoint.groupe = groupeIndex
          newPoint.contour = contourIndex
          newPoint.point = points.length + 1
          points.push(newPoint)
        }
      } else if (point.references.length) {
        points = points.concat(
          pointsLotBuild(
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

const dureeBuild = (ans, mois) => (ans ? ans * 12 : 0) + (mois || 0)

const etapeSaveFormat = etape => {
  etape = JSON.parse(JSON.stringify(etape))

  etape.justificatifIds = etape.justificatifs?.map(({ id }) => id)
  etape.documentIds = etape.documents
    ?.filter(d => d.id !== d.typeId)
    .map(({ id }) => id)

  if (etape.type) {
    etape.typeId = etape.type.id
  }
  delete etape.type
  delete etape.slug
  delete etape.justificatifs
  delete etape.documents

  if (!etape.contenu || !Object.keys(etape.contenu).length) {
    delete etape.contenu
  }

  if (etape.duree && (etape.duree.ans || etape.duree.mois)) {
    etape.duree = dureeBuild(etape.duree.ans, etape.duree.mois)
  } else {
    etape.duree = null
  }

  const props = ['date', 'dateDebut', 'dateFin', 'surface', 'duree']

  props.forEach(prop => {
    if (etape[prop] === '') {
      etape[prop] = null
    }
  })

  delete etape.suppression
  delete etape.modification

  delete etape.demarche

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

    if (etape.incertitudes) {
      delete etape.incertitudes.points
    }
  }

  delete etape.groupes
  delete etape.geoSystemeOpposableId
  delete etape.geoSystemeIds

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

  return etape
}

export { etapeSaveFormat, pointsBuild, dureeBuild }
