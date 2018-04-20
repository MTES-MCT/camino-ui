export const state = {
  titre: {
    filtres: {
      domaines: {
        H: 'Substances énergétiques',
        M: 'Minéraux et métaux',
        G: 'Géothermie',
        S: 'Stockage'
      },
      types: {
        CNC: 'Concession',
        PER: 'Permis exclusif de recherches'
      },
      statuts: {
        VAL: 'Valide',
        ECH: 'Échu'
      }
    }
  },
  statuts: {
    neutral: ['neutral'],
    error: ['error', 'En attente…'],
    warning: ['warning', 'En instruction…'],
    success: ['success', 'Valide', 'En cours', 'Validé']
  }
}

export default {
  namespaced: true,
  state
}
