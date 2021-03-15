import numberFormat from './number-format'

const contenuBuild = (sections, elementContenu) =>
  sections.reduce((contenu, section) => {
    if (section) {
      contenu[section.id] = (elementContenu && elementContenu[section.id]) || {}
    }

    return contenu
  }, {})

const elementContenuBuild = (sections, contenu) =>
  sections.reduce((elementContenu, section) => {
    if (Object.keys(contenu[section.id]).length) {
      if (!elementContenu) {
        elementContenu = {}
      }
      elementContenu[section.id] = contenu[section.id]
    }

    return elementContenu
  }, null)

const contenuCompleteCheck = (sections, contenu) =>
  sections.reduce(
    (complete, s) =>
      s.elements.reduce((sectionComplete, e) => {
        if (!contenu[s.id]) return sectionComplete

        const value =
          e.type === 'checkboxes'
            ? contenu[s.id][e.id].length || null
            : contenu[s.id][e.id]

        return sectionComplete && !!(value || value === 0 || e.optionnel)
      }, complete),
    true
  )

const valeurFind = ({ id, type, valeurs }, contenu) => {
  if (contenu[id] === undefined) {
    return '–'
  }

  if (['number', 'integer'].includes(type)) {
    return numberFormat(contenu[id])
  }

  if (type === 'checkboxes') {
    return contenu[id].map(id => valeurs.find(e => e.id === id).nom).join(', ')
  }

  if (type === 'select') {
    return valeurs.find(v => v.id === contenu[id]).nom
  }

  if (contenu[id] === true) return 'Oui'
  else if (contenu[id] === false) return 'Non'

  return contenu[id]
}

const hasValeurCheck = (elementId, contenu) => {
  const valeur = contenu && contenu[elementId]

  if (
    (!Array.isArray(valeur) && (valeur || valeur === 0 || valeur === false)) ||
    (Array.isArray(valeur) && valeur.length)
  )
    return true

  return false
}

const elementsVisibleCheck = (elements, contenu) =>
  elements.some(e => hasValeurCheck(e.id, contenu) || !e.optionnel)

export {
  contenuBuild,
  elementContenuBuild,
  contenuCompleteCheck,
  valeurFind,
  hasValeurCheck,
  elementsVisibleCheck
}
