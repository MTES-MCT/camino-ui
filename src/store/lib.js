export const state = {
  titre: {
    statuts: {
      neutral: ['neutral'],
      error: ['error', 'En attente de pièces…'],
      warning: ['warning', 'En instruction…'],
      success: ['success', 'Valide', 'En cours', 'Validé']
    },
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
  }
}

export default {
  namespaced: true,
  state
}
