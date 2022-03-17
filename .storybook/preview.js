import '../src/styles/styles.css'
import { app } from '@storybook/vue3'
import { h } from 'vue'
// This is a global mock for the router-link component in the storybooks. Without it, we had some nasty warnings
// TODO 2022-03-23 fix router-lint warning in jest... with storybook-vue3-router once jest support esm
app.component('router-link', h('div', { type: 'primary' }))
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
