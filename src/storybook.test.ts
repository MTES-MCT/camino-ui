import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots'
import { mount } from '@vue/test-utils'
import { resolve } from 'path'

initStoryshots({
  suite: 'Automated Storybook Snapshots',
  configPath: '.storybook',
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.ts', '.mdx']
  }),
  test: ({ story, context, stories2snapsConverter }) => {
    const snapshotFileName = resolve(
      stories2snapsConverter.getSnapshotFileName(context)
    )

    const storyElement = story.render()
    const wrapper = mount(storyElement)
    expect(wrapper.element).toMatchSpecificSnapshot(snapshotFileName)
  }
})
