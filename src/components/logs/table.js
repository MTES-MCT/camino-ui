import { dateFormat } from '../../utils/index'

const logsLignesBuild = logs =>
  logs.map(l => {
    const columns = {
      date: { value: dateFormat(l.date) },
      action: { value: l.actionId },
      utilisateur: { value: `${l.utilisateur.prenom} ${l.utilisateur.nom}}` }
    }

    const log = {
      id: l.id,
      columns
    }

    if (l.etape) {
      log.link = { name: 'etape', params: { id: l.etape.id } }
      log.columns.element = { value: `étape: ${l.etape.type.nom}` }
    }

    if (l.activite) {
      log.link = { name: 'activite', params: { id: l.activite.id } }
      log.columns.element = {
        value: `activité: ${l.activite.type.nom} (${l.activite.periode.nom} ${l.activite.periode.annee})`
      }
    }

    return log
  })

const logsColonnes = [
  {
    id: 'date',
    name: 'Date'
  },
  { id: 'action', name: 'Action' },
  { id: 'element', name: 'Élément' }
]

export { logsColonnes, logsLignesBuild }
