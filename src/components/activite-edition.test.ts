import { mount } from '@vue/test-utils'
import ActiviteEdition from './activite-edition.vue'

describe('ActiviteEdition', () => {
  test("affiche une info-bulle d'aide si l'activite est de type 'grp' ou 'gra'", () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }

    const msg =
      'Tous les champs doivent être remplis même s’il n’y a pas eu d’extraction. Le cas échéant, indiquer seulement 0, puis enregistrer.'

    const $store = {
      state: {
        loading: [],
        user: {
          element: {}
        },
        titreActiviteEdition: {
          element: {
            type: {
              id: 'grp',
              nom: '',
              description: 'desc',
              documentsTypes: []
            },
            documents: [],
            sections: [],
            titre: {
              slug: ''
            },
            periode: {
              nom: ''
            },
            annee: ''
          }
        },
        popup: {
          component: {}
        }
      },
      commit: jest.fn(),
      dispatch: jest.fn()
    }

    const document = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }

    let wrapper = mount(ActiviteEdition, {
      global: {
        mocks: {
          $store,
          $route: mockRoute,
          $router: mockRouter,
          document
        },
        stubs: {
          RouterLink: true
        }
      }
    })

    expect(wrapper.vm.$store.state.titreActiviteEdition.element.type.id).toBe(
      'grp'
    )
    expect(wrapper.vm.shouldDisplayHelp).toBe(true)
    let tooltipContent = wrapper.find('.tooltip-content')
    expect(tooltipContent.exists()).toBe(true)
    expect(tooltipContent.text()).toContain(msg)

    const secondStore = { ...$store }
    secondStore.state.titreActiviteEdition.element.type.id = 'gra'
    expect(wrapper.vm.$store.state.titreActiviteEdition.element.type.id).toBe(
      'gra'
    )
    expect(wrapper.vm.shouldDisplayHelp).toBe(true)
    tooltipContent = wrapper.find('.tooltip-content')
    expect(tooltipContent.exists()).toBe(true)
    expect(tooltipContent.text()).toContain(msg)

    const thirdStore = { ...$store }
    thirdStore.state.titreActiviteEdition.element.type.id = ''

    wrapper = mount(ActiviteEdition, {
      global: {
        mocks: {
          $store: thirdStore,
          $route: mockRoute,
          $router: mockRouter,
          document
        },
        stubs: {
          RouterLink: true
        }
      }
    })

    expect(wrapper.vm.$store.state.titreActiviteEdition.element.type.id).toBe(
      ''
    )
    expect(wrapper.vm.shouldDisplayHelp).toBe(false)
    expect(wrapper.find('.tooltip-content').exists()).toBe(false)
  })
})
