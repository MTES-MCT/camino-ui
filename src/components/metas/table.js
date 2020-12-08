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

    return {
      id: meta.id,
      link: { name: 'meta', params: { id: meta.id } },
      columns
    }
  })

export { metasColonnes, metasLignesBuild }
