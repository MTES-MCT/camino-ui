import { shallowMount } from '@vue/test-utils'
import FormSaveBtn from './form-save-btn.vue'
import HelpTooltip from '../_ui/help-tooltip.vue'

describe('FormSaveBtn', () => {
  test('rend un bouton', () => {
    const wrapper = shallowMount(FormSaveBtn)
    expect(wrapper.findAll('button')).toHaveLength(1)
  })

  test('rend un HelpTooltip uniquement si la prop "helpVisible" est définie à true', () => {
    let wrapper = shallowMount(FormSaveBtn, {
      props: { helpVisible: false }
    })
    expect(wrapper.findAllComponents(HelpTooltip)).toHaveLength(0)

    wrapper = shallowMount(FormSaveBtn, {
      props: { helpVisible: true }
    })
    expect(wrapper.findAllComponents(HelpTooltip)).toHaveLength(1)
  })

  test('émet un événement "click" remontant dans l\'arborescence quand le bouton est cliqué', async () => {
    const wrapper = shallowMount(FormSaveBtn)
    const btn = wrapper.find('button')

    await btn.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  test('bouton "disabled" si les attributs placés sur le composant contiennent un "disabled"', () => {
    let wrapper = shallowMount(FormSaveBtn)
    let btn = wrapper.find('button')
    expect(btn.classes()).not.toContain('disabled')
    expect(btn.attributes()).not.toHaveProperty('disabled')

    wrapper = shallowMount(FormSaveBtn, {
      attrs: {
        disabled: true
      }
    })
    btn = wrapper.find('button')
    expect(btn.classes()).toContain('disabled')
    expect(btn.attributes()).toHaveProperty('disabled')
  })

  test('#focusBtn place le bouton en focus', async () => {
    const wrapper = shallowMount(FormSaveBtn, { attachTo: document.body })
    expect(wrapper.find('button').element).not.toBe(document.activeElement)
    await (wrapper.vm as any).focusBtn()
    expect(wrapper.find('button').element).toBe(document.activeElement)
  })
})
