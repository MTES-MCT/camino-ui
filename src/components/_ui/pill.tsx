import { SetupContext } from '@vue/runtime-core'

interface Props {
  color?: string
}

export default function Pill(props: Props, context: SetupContext) {
  return (
    <span class="cap-first small bold">
      <span class={`${props.color ?? 'bg-neutral'} color-bg pill py-xs px-s`}>
        {context.slots?.default?.()}
        <slot />
      </span>
    </span>
  )
}
