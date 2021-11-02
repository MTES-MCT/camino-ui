import { shallowMount } from '@vue/test-utils'
import ActivitesTypesEmails from './activites-types-emails.vue'
import ButtonPlus from '../_ui/button-plus.vue'

describe('ActivitesTypesEmails', () => {
  const administration = {
    id: 'id',
    email: 'foo@bar.co',
    nom: 'nom',
    emailsLecture: false,
    emailsModification: false,
    activitesTypesEmails: [
      {
        id: 'grx',
        nom: "rapport d'exploitation (autorisations M)",
        email: 'foo@bar.co'
      },
      {
        id: 'pma',
        nom: 'rapport d’intensité d’exploration',
        email: 'toto@tata.com'
      }
    ]
  }

  const activitesTypes = [
    { id: 'grx', npm: 'GRX' },
    { id: 'pma', npm: 'PMA' }
  ]

  test('rend la section email visible seulement lorsque la propriété emailsLecture est true', () => {
    let wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration
      }
    })

    expect(wrapper.find('table').exists()).toBe(false)

    wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: { ...administration, emailsLecture: true }
      }
    })

    expect(wrapper.find('table').exists()).toBe(true)
  })

  test("rend la ligne d'insertion de données visible uniquement lorsque les propriétés emailsModification et emailsLecture sont true", () => {
    let wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: {
          ...administration,
          emailsLecture: true,
          emailsModification: false
        }
      }
    })

    expect(wrapper.find('select').exists()).toBe(false)
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.findComponent(ButtonPlus).exists()).toBe(false)

    wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: {
          ...administration,
          emailsLecture: false,
          emailsModification: true
        }
      }
    })

    expect(wrapper.find('select').exists()).toBe(false)
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.findComponent(ButtonPlus).exists()).toBe(false)

    wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: {
          ...administration,
          emailsLecture: true,
          emailsModification: true
        }
      }
    })

    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.findComponent(ButtonPlus).exists()).toBe(true)
  })

  test('rend le bouton de suppression visible uniquement lorsque les propriétés emailsModification et emailsLecture sont true', () => {
    let wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: {
          ...administration,
          emailsLecture: true,
          emailsModification: false
        }
      }
    })

    expect(wrapper.find('button > .icon-trash').exists()).toBe(false)

    wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: {
          ...administration,
          emailsLecture: false,
          emailsModification: true
        }
      }
    })

    expect(wrapper.find('button > .icon-trash').exists()).toBe(false)

    wrapper = shallowMount(ActivitesTypesEmails, {
      props: {
        activitesTypes,
        administration: {
          ...administration,
          emailsLecture: true,
          emailsModification: true
        }
      }
    })

    expect(wrapper.find('button > .icon-trash').exists()).toBe(true)
  })
})
