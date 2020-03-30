const visit = (matomo, store) => {
  const user = store.state.user.current
  if (user) {
    if (user.administrations && user.administrations.length) {
      const administrationsIds = user.administrations
        .map(administration => administration.id)
        .join()
      matomo.setCustomVariable(
        1,
        'administrationId',
        administrationsIds,
        'visit'
      )
    }
    if (user.entreprises && user.entreprises.length) {
      const entreprisesIds = user.entreprises
        .map(entreprise => entreprise.id)
        .join()
      matomo.setCustomVariable(1, 'entreprisesIds', entreprisesIds, 'visit')
    }
    matomo.setCustomVariable(5, 'permissionId', user.permission.id, 'visit')
  }
}

const page = (matomo, store, to) => {
  if (to.name === 'titre') {
    const titre = store.state.titres.list.find(
      titre => titre.id === to.path.replace('/titres/', '')
    )
    if (titre) {
      matomo.setCustomVariable(1, 'domaineId', titre.domaine.id, 'page')
      matomo.setCustomVariable(2, 'typeId', titre.type.type.id, 'page')
      matomo.setCustomVariable(3, 'statutId', titre.statut.id, 'page')
    }
  }
}

export { visit, page }
