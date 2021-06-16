const logs = [
  {
    id: 'hash-123456789',
    date: '2020-10-01-10-10',
    utilisateur: {
      id: 'utilisateur-id',
      nom: 'Torres du 973',
      prenom: 'Junior',
      permission: { id: 'entreprise' }
    },
    actionId: 'modification',
    changes: {
      contenu: {
        travaux: {
          7: 'exploitationEnCours',
          8: 'exploitationEnCours',
          9: 'exploitationEnCours'
        },
        renseignements: {
          mercure: 0,
          effectifs: 2,
          orExtrait: 0,
          volumeMinerai: 0,
          depensesTotales: 25218,
          carburantConventionnel: 0
        }
      }
    },
    activite: {
      typeId: 'grp',
      type: {
        id: 'grp',
        nom: "rapport trimestriel d'exploitation d'or en Guyane"
      },
      periode: {
        nom: '1er trimestre',
        annee: 2021
      },
      id: 'm-ax-affluent-crique-korossibo-2021-grp-2021-01'
    },
    publicLecture: false,
    entrepriseLecture: true
  }
]

const user = {
  id: '3553d2',
  nom: 'Brandelero',
  prenom: 'Joziani',
  entreprises: [
    { id: 'fr-440095750', nom: 'CIE MINIERE JOTA', legalSiren: '440095750' },
    { id: 'fr-827791120', nom: 'CIE MINIERE PHOENIX', legalSiren: '827791120' },
    {
      id: 'fr-315014035',
      nom: "DEPARTEMENT D'OUTRE MER IMPORT EXPORT (DOMIEX)",
      legalSiren: '315014035'
    },
    {
      id: 'fr-840649602',
      nom: 'PLACER APPROUAGUE GUYANE (PAG)',
      legalSiren: '840649602'
    }
  ]
}

export { logs, user }
