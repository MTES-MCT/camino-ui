const etablissementNameFind = (etablissements, date) => {
  if (!etablissements || !etablissements.length) {
    return null
  }

  const etablissement = etablissements.find(
    e =>
      (e.dateDebut < date && (!e.dateFin || e.dateFin > date)) || !e.dateDebut
  )

  return etablissement && etablissement.nom
}

export { etablissementNameFind }
