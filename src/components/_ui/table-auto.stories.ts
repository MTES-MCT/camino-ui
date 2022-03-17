import Table from './table-auto.vue'
import { Meta, Story } from '@storybook/vue3'
import { markRaw } from '@vue/reactivity'
import TitreNom from '../_common/titre-nom.vue'
import CaminoDomaine from '../_common/domaine.vue'
import TitreTypeTypeNom from '../_common/titre-type-type-nom.vue'
import Statut from '../_common/statut.vue'
import { Column, InitialSort, Row } from './table-auto.type'

const meta: Meta = {
  title: 'Ui/TableAuto',
  component: Table,
  argTypes: {
    rows: { name: 'array', value: 'string', required: true },
    columns: { name: 'array', value: 'string', required: true },
    initialSort: { name: 'object' }
  }
}
export default meta

type Props = {
  rows: Row[]
  columns: Column[]
  initialSort?: InitialSort
}

const columns: Column[] = [
  {
    id: 'nom',
    name: 'Nom',
    class: ['min-width-8']
  },
  {
    id: 'domaine',
    name: ''
  },
  {
    id: 'type',
    name: 'Type',
    class: ['min-width-8']
  },
  {
    id: 'statut',
    name: 'Statut',
    class: ['nowrap', 'min-width-5']
  },
  {
    id: 'test',
    name: 'Test'
  }
]

const rows: Row[] = [0, 1, 2, 3].map(row => {
  return {
    id: `elementId${row}`,
    link: {
      name: `elementlink${row}`,
      params: {
        id: `elementslug${row}`
      },
      value: `elementslug${row}`
    },
    columns: {
      nom: {
        component: markRaw(TitreNom),
        props: {
          nom: `220222_${row}`
        },
        value: `220222_${row}`
      },
      domaine: {
        component: markRaw(CaminoDomaine),
        props: {
          domaineId: 'm'
        },
        value: 'm'
      },
      type: {
        component: markRaw(TitreTypeTypeNom),
        props: { nom: 'Autorisation de recherches' },
        value: 'Autorisation de recherches'
      },
      statut: {
        component: markRaw(Statut),
        props: {
          color: 'warning',
          nom: `Demande initiale ${row}`
        },
        value: `Demande initiale ${row}`
      },
      test: {
        value: `Test value ${row}`
      }
    }
  }
})

const Template: Story<Props> = (args: Props) => ({
  components: { Table },
  setup() {
    return { args }
  },
  template: '<Table v-bind="args" />'
})

export const Simple = Template.bind({})
Simple.args = {
  rows,
  columns
}

export const SortedByStatusAsc = Template.bind({})
SortedByStatusAsc.args = {
  rows,
  columns,
  initialSort: { column: 'statut', order: 'desc' }
}
