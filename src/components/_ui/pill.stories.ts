import Pill from './pill.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Pill',
  component: Pill,
  argTypes: {
    color: String
  }
}

export const Primary = () => ({
  components: { Pill },
  template: '<pill>hello</pill>'
})

export const Error = () => ({
  components: { Pill },
  template: '<pill color="bg-error">hello</pill>'
})
