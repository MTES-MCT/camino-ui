import { dateFormat, cap } from '../../utils/index'
import { markRaw } from '@vue/reactivity'
import Tag from '../_ui/tag.vue'

const actionColorFind = actionId => {
  if (actionId === 'mod') return 'bg-warning'

  if (actionId === 'sup') return 'bg-error'

  if (actionId === 'cre') return 'bg-info'

  return 'bg-neutral'
}

const logsLignesBuild = logs =>
  logs.map(l => {
    let utilisateurValue = `${l.utilisateur.prenom} ${l.utilisateur.nom}`

    if (l.utilisateur.administration) {
      utilisateurValue = `${utilisateurValue} (${l.utilisateur.administration.abreviation})`
    }

    const columns = {
      date: { value: dateFormat(l.date), class: 'small bold' },
      action: {
        value: l.action.nom,
        component: markRaw(Tag),
        props: { mini: true, color: actionColorFind(l.action.id) },
        class: 'mb--xs',
        slot: true
      },
      utilisateur: {
        value: utilisateurValue,
        class: 'small'
      },
      permission: {
        value: l.utilisateur.permission.id,
        component: markRaw(Tag),
        props: { mini: true },
        class: 'mb--xs',
        slot: true
      },
      element: { class: 'cap-first' }
    }

    const log = {
      id: l.id,
      columns
    }

    if (l.etape) {
      log.link = { name: 'etape', params: { id: l.etape.id } }
      log.columns.element.value = `étape: ${l.etape.demarche.titre.nom} / ${cap(
        l.etape.demarche.type.nom
      )} / ${cap(l.etape.type.nom)}`
    }

    if (l.activite) {
      log.link = { name: 'activite', params: { id: l.activite.id } }
      log.columns.element.value = `activité: ${l.activite.type.nom} (${l.activite.periode.nom} ${l.activite.periode.annee})`
    }

    return log
  })

const logsColonnes = [
  {
    id: 'date',
    name: 'Date'
  },
  { id: 'utilisateur', name: 'Utilisateur' },
  { id: 'permission', name: 'Permission' },
  { id: 'action', name: 'Action' },
  { id: 'element', name: 'Élément' }
]

export { logsColonnes, logsLignesBuild }
