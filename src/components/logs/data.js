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
    action: { id: 'mod', nom: 'modification' },
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
  },
  {
    id: 'hash-9584536',
    date: '2020-10-01-10-07',
    utilisateur: {
      id: 'utilisateur-id',
      nom: 'Torres du 973',
      prenom: 'Junior',
      permission: { id: 'entreprise' }
    },
    action: { id: 'cre', nom: 'création' },
    changes: {
      statutId: 'dep'
    },
    etape: {
      type: {
        id: 'mfr',
        nom: 'demande'
      },
      demarche: {
        type: { id: 'oct', nom: 'octroi' },
        titre: {
          id: 'm-ax-crique-ipoucin-ouest-1-2020',
          nom: 'Crique Ipoucin Ouest 1'
        }
      }
    },
    publicLecture: false,
    entrepriseLecture: true
  },
  {
    id: 'hash-8362452',
    date: '2020-10-01-10-04',
    utilisateur: {
      id: 'utilisateur-id',
      nom: 'Ortelli',
      prenom: 'Adrien',
      permission: { id: 'admin' },
      administration: {
        id: 'onf',
        abreviation: 'Onf'
      }
    },
    action: { id: 'sup', nom: 'suppression' },
    etape: {
      type: {
        id: 'mfr',
        nom: 'demande'
      },
      demarche: {
        type: { id: 'oct', nom: 'octroi' },
        titre: {
          id: 'm-ax-crique-ipoucin-ouest-1-2020',
          nom: 'Crique Ipoucin Ouest 1'
        }
      }
    },
    publicLecture: false,
    entrepriseLecture: true
  },

  {
    id: 'hash-788778235',
    date: '2020-10-01-10-00',
    utilisateur: {
      id: 'utilisateur-id',
      nom: 'Camino',
      prenom: '',
      permission: { id: 'admin' }
    },
    action: { id: 'mod', nom: 'modification' },
    etape: {
      type: {
        id: 'mfr',
        nom: 'demande'
      },
      demarche: {
        type: { id: 'oct', nom: 'octroi' },
        titre: {
          id: 'm-ax-crique-ipoucin-ouest-1-2020',
          nom: 'Crique Ipoucin Ouest 1'
        }
      }
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
