const lignesBuild = entreprises =>
  entreprises.map(entreprise => {
    const columns = {
      nom: { value: entreprise.nom },
      siren: {
        value: entreprise.legalEtranger || entreprise.legalSiren || '–'
      }
    }

    return {
      id: entreprise.id,
      link: { name: 'entreprise', params: { id: entreprise.id } },
      columns
    }
  })

export { lignesBuild }
