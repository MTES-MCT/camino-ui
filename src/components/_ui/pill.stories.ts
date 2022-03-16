import Pill from './pill.vue'
import { Story } from '@storybook/vue3'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Pill',
  component: Pill,
  argTypes: {
    color: String
  }
}

type Props = {
  color?: string
}

const Template: Story<Props> = (args: Props) => ({
  components: { Pill },
  setup() {
    return { args }
  },
  template: '<Pill v-bind="args">Hello</Pill>'
})

export const Primary = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  color: 'bg-error'
}
