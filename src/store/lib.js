export const state = {
  titre: {
    filtres: {
      types: {
        CNC: 'Concession',
        PER: 'Permis exclusif de recherches'
      },
      statuts: {
        VAL: 'Valide',
        ECH: 'Échu'
      }
    },
    domaines: [
      {
        id: 'mineraux',
        code: 'M',
        nom: 'Minéraux et métaux',
        couleur: '#498bd6'
      },
      {
        id: 'hydrocarbures',
        nom: 'Substances énergétiques',
        code: 'H',
        couleur: '#856940'
      },
      {
        id: 'stockage',
        nom: 'Stockage',
        code: 'S',
        couleur: '#8468b1'
      },
      {
        id: 'geothermie',
        nom: 'Géothermie',
        code: 'G',
        couleur: '#d16c3e'
      }
    ]
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
