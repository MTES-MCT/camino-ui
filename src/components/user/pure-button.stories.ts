import PureButton from './pure-button.vue'
import { action } from '@storybook/addon-actions'
import { User } from '@/components/user/user'
import { Story } from '@storybook/vue3'
export default {
  title: 'Components/User/Button',
  component: PureButton,
  argTypes: {
    user: Object,
    menuActive: Boolean
  }
}
type Props = {
  user: User
  menuActive: boolean
}
const Template: Story<Props> = (args: Props) => ({
  components: { PureButton },
  setup() {
    return { args }
  },
  template:
    '<PureButton @onConnectionClicked="onConnectionClicked" @onUserClicked="onUserClicked" v-bind="args" />',
  methods: {
    onConnectionClicked: action('onConnectionClicked'),
    onUserClicked: action('onUserClicked')
  }
})

export const NotConnected = Template.bind({})
NotConnected.args = {
  menuActive: false
}
const user: User = {
  nom: 'Nom',
  prenom: 'prenom'
}
export const Connected = Template.bind({})
Connected.args = {
  user: user,
  menuActive: false
}
