import { markRaw } from '@vue/reactivity'
import Tag from '../_ui/tag.vue'

const administrationsColonnes = [
  {
    id: 'abreviation',
    name: 'Abréviation'
  },
  {
    id: 'nom',
    name: 'Nom'
  },
  {
    id: 'type',
    name: 'Type'
  }
]

const administrationsLignesBuild = administrations =>
  administrations.map(administration => {
    const columns = {
      abreviation: { value: administration.abreviation },
      nom: { value: administration.nom, class: 'h5' },
      type: {
        component: markRaw(Tag),
        props: { mini: true },
        class: 'mb--xs',
        value: administration.type.nom,
        slot: true
      }
    }

    return {
      id: administration.id,
      link: { name: 'administration', params: { id: administration.id } },
      columns
    }
  })

export { administrationsColonnes, administrationsLignesBuild }
