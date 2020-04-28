import Vue from 'vue'
import Pill from '../_ui/pill.vue'
import List from '../_ui/list.vue'

const lignesBuild = utilisateurs =>
  utilisateurs.map(utilisateur => {
    let elements

    if (utilisateur.administrations && utilisateur.administrations.length) {
      elements = utilisateur.administrations.map(({ nom }) => nom)
    } else if (utilisateur.entreprises && utilisateur.entreprises.length) {
      elements = utilisateur.entreprises.map(({ nom }) => nom)
    }

    const lien =
      elements && elements.length
        ? {
            component: List,
            props: {
              elements,
              mini: true
            },
            class: 'mb--xs',
            value: elements.join(', ')
          }
        : { value: '' }

    const columns = {
      prenom: { value: utilisateur.prenom || '–' },
      nom: { value: utilisateur.nom || '–' },
      email: { value: utilisateur.email || '–', class: ['h5'] },
      permissions: utilisateur.permission
        ? {
            component: Vue.component('UtilisateurPermission', {
              components: {
                Pill
              },
              render(h) {
                return h('Pill', utilisateur.permission.nom)
              }
            }),
            value: utilisateur.permission.nom
          }
        : '',
      lien
    }

    return {
      id: utilisateur.id,
      link: { name: 'utilisateur', params: { id: utilisateur.id } },
      columns
    }
  })

export { lignesBuild }
