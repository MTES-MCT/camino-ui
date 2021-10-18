const metasColonnes = [
  {
    id: 'nom',
    name: 'Nom'
  }
]

const metasLignesBuild = metas =>
  metas.map(meta => {
    const columns = {
      nom: { value: meta.nom }
    }

    const linkName = meta.linkName || 'meta'

    return {
      id: meta.id,
      link: { name: linkName, params: { id: meta.id } },
      columns
    }
  })

export { metasColonnes, metasLignesBuild }
