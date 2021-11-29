import { mount } from '@vue/test-utils'
import Preview from './preview.vue'

describe('Activite > Preview', () => {
  const activite = {
    date: '2018-01-01',
    dateSaisie: '2018-01-01',
    periode: {
      nom: 'periode'
    },
    annee: '2021',
    type: {
      id: 'gra'
    },
    statut: {
      id: 'enc',
      nom: 'en construction',
      couleur: 'warning'
    },
    deposable: true,
    sections: [{ id: 'id', elements: [] }]
  }

  test("si l'activite est en construction et déposable, de type 'grp' ou 'gra', affiche une info-bulle d'aide", () => {
    // En construction, GRA, deposable : OK
    let wrapper = mount(Preview, {
      props: {
        activite,
        route: {
          name: 'name'
        },
        openedActivite: false,
        openedTitreActivite: false
      }
    })

    expect(wrapper.props('activite').statut.id).toBe('enc')
    expect(wrapper.props('activite').type.id).toBe('gra')
    expect(wrapper.props('activite').deposable).toBe(true)
    let tooltip = wrapper.find('.tooltip-content')
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.text()).toContain(
      'Si votre déclaration est complète, cliquez sur déposer. Cliquez sur le crayon pour modifier.'
    )

    // En construction, GRP, deposable : OK
    wrapper = mount(Preview, {
      props: {
        activite: { ...activite, type: { id: 'grp' } },
        route: {
          name: 'name'
        },
        openedActivite: false,
        openedTitreActivite: false
      }
    })
    expect(wrapper.props('activite').statut.id).toBe('enc')
    expect(wrapper.props('activite').type.id).toBe('grp')
    expect(wrapper.props('activite').deposable).toBe(true)
    tooltip = wrapper.find('.tooltip-content')
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.text()).toContain(
      'Si votre déclaration est complète, cliquez sur déposer. Cliquez sur le crayon pour modifier.'
    )

    // Autre statut, GRA, deposable : KO
    wrapper = mount(Preview, {
      props: {
        activite: { ...activite, statut: { id: 'foo' } },
        route: {
          name: 'name'
        },
        openedActivite: false,
        openedTitreActivite: false
      }
    })
    expect(wrapper.props('activite').statut.id).not.toBe('enc')
    expect(wrapper.props('activite').type.id).toBe('gra')
    expect(wrapper.props('activite').deposable).toBe(true)
    expect(wrapper.find('.tooltip-content').exists()).toBe(false)

    // En construction, GRA, non déposable (déposé) : KO
    wrapper = mount(Preview, {
      props: {
        activite: { ...activite, deposable: null },
        route: {
          name: 'name'
        },
        openedActivite: false,
        openedTitreActivite: false
      }
    })
    expect(wrapper.props('activite').statut.id).toBe('enc')
    expect(wrapper.props('activite').type.id).toBe('gra')
    expect(wrapper.props('activite').deposable).toBeNull()
    expect(wrapper.find('.tooltip-content').exists()).toBe(false)

    // En construction, GRA, non déposable (incomplet) : KO
    wrapper = mount(Preview, {
      props: {
        activite: { ...activite, deposable: false },
        route: {
          name: 'name'
        },
        openedActivite: false,
        openedTitreActivite: false
      }
    })
    expect(wrapper.props('activite').statut.id).toBe('enc')
    expect(wrapper.props('activite').type.id).toBe('gra')
    expect(wrapper.props('activite').deposable).toBe(false)
    expect(wrapper.find('.tooltip-content').exists()).toBe(false)

    // En construction, autre type, déposable : KO
    wrapper = mount(Preview, {
      props: {
        activite: { ...activite, type: { id: 'XXX' } },
        route: {
          name: 'name'
        },
        openedActivite: false,
        openedTitreActivite: false
      }
    })
    expect(wrapper.props('activite').statut.id).toBe('enc')
    expect(wrapper.props('activite').type.id).toBe('XXX')
    expect(wrapper.props('activite').deposable).toBe(true)
    expect(wrapper.find('.tooltip-content').exists()).toBe(false)
  })
})
