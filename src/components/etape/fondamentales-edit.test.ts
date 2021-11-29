import { shallowMount, mount } from '@vue/test-utils'
import FondamentalesEdit from './fondamentales-edit.vue'

describe('FondamentalesEdit', () => {
  const etape = {
    id: 'aZHafFDDBksskCO0ZFuaMlPA',
    type: {
      id: 'mfr'
    },
    duree: {
      ans: 0,
      mois: 4
    },
    incertitudes: {
      dateDebut: false,
      dateFin: false,
      amodiataires: false,
      substances: false,
      points: false,
      surface: false
    },
    substances: [],
    titulaires: [],
    heritageProps: {
      dateDebut: {
        etape: null,
        actif: false
      },
      dateFin: {
        etape: null,
        actif: false
      },
      duree: {
        etape: null,
        actif: false
      },
      surface: {
        etape: null,
        actif: false
      },
      points: {
        etape: null,
        actif: false
      },
      substances: {
        etape: null,
        actif: false
      },
      titulaires: {
        etape: null,
        actif: false
      },
      amodiataires: {
        etape: null,
        actif: false
      }
    }
  }

  test.each`
    titreTypeId | domaineId    | userIsSuper | expected
    ${'ar'}     | ${'m'}       | ${false}    | ${false}
    ${'ar'}     | ${'m'}       | ${true}     | ${true}
    ${'ax'}     | ${'m'}       | ${false}    | ${false}
    ${'ax'}     | ${'m'}       | ${true}     | ${true}
    ${'ni axm'} | ${' ni arm'} | ${false}    | ${true}
    ${'ni axm'} | ${' ni arm'} | ${true}     | ${true}
  `(
    '#canSeeAllDates retourne $expected si utilisateur super => $userIsSuper et démarche est $titreTypeId$domaineId',
    ({ titreTypeId, domaineId, userIsSuper, expected }) => {
      // ARM + utilisateur non-super
      const wrapper = shallowMount(FondamentalesEdit, {
        props: {
          etape,
          titreTypeId,
          domaineId,
          userIsAdmin: true,
          userIsSuper,
          substances: []
        }
      })
      expect(wrapper.vm.canSeeAllDates).toBe(expected)
    }
  )

  test('affiches les éléments de dates dans le formulaire seulement si #canSeeAllDates est true', () => {
    let wrapper = mount(FondamentalesEdit, {
      props: {
        etape,
        titreTypeId: 'ar',
        domaineId: 'm',
        userIsAdmin: true,
        userIsSuper: false,
        substances: []
      }
    })
    expect(wrapper.vm.canSeeAllDates).toBe(false)
    expect(wrapper.html().includes('Date de début')).toBe(false)
    expect(wrapper.html().includes("Date d'échéance")).toBe(false)

    wrapper = mount(FondamentalesEdit, {
      props: {
        etape,
        titreTypeId: 'ar',
        domaineId: 'm',
        userIsAdmin: true,
        userIsSuper: true,
        substances: []
      }
    })
    expect(wrapper.vm.canSeeAllDates).toBe(true)
    expect(wrapper.html().includes('Date de début')).toBe(true)
    expect(wrapper.html().includes("Date d'échéance")).toBe(true)

    wrapper = mount(FondamentalesEdit, {
      props: {
        etape,
        titreTypeId: 'ax',
        domaineId: 'm',
        userIsAdmin: true,
        userIsSuper: false,
        substances: []
      }
    })
    expect(wrapper.vm.canSeeAllDates).toBe(false)
    expect(wrapper.html().includes('Date de début')).toBe(false)
    expect(wrapper.html().includes("Date d'échéance")).toBe(false)

    wrapper = mount(FondamentalesEdit, {
      props: {
        etape,
        titreTypeId: 'ax',
        domaineId: 'm',
        userIsAdmin: true,
        userIsSuper: true,
        substances: []
      }
    })
    expect(wrapper.vm.canSeeAllDates).toBe(true)
    expect(wrapper.html().includes('Date de début')).toBe(true)
    expect(wrapper.html().includes("Date d'échéance")).toBe(true)

    wrapper = mount(FondamentalesEdit, {
      props: {
        etape,
        titreTypeId: 'ni axm',
        domaineId: 'ni arm',
        userIsAdmin: true,
        userIsSuper: false,
        substances: []
      }
    })
    expect(wrapper.vm.canSeeAllDates).toBe(true)
    expect(wrapper.html().includes('Date de début')).toBe(true)
    expect(wrapper.html().includes("Date d'échéance")).toBe(true)

    wrapper = mount(FondamentalesEdit, {
      props: {
        etape,
        titreTypeId: 'ni axm',
        domaineId: 'ni arm',
        userIsAdmin: true,
        userIsSuper: true,
        substances: []
      }
    })
    expect(wrapper.vm.canSeeAllDates).toBe(true)
    expect(wrapper.html().includes('Date de début')).toBe(true)
    expect(wrapper.html().includes("Date d'échéance")).toBe(true)
  })
})
