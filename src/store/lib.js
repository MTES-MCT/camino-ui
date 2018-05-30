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
        id: 'm',
        nom: 'Minéraux et métaux',
        couleur: '#498bd6'
      },
      {
        id: 'h',
        nom: 'Substances énergétiques',
        couleur: '#856940'
      },
      {
        id: 's',
        nom: 'Stockage',
        couleur: '#8468b1'
      },
      {
        id: 'g',
        nom: 'Géothermie',
        couleur: '#d16c3e'
      },
      {
        id: 'c',
        nom: 'Carrières et granulats marins',
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
