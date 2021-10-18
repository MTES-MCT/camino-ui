import { Store } from 'vuex'

/* eslint-disable no-unused-vars */

declare module '@vue/runtime-core' {
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<any>
  }
}
