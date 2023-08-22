import { within, userEvent } from '@storybook/testing-library'
import DefaultLayout from './default.vue'

import { Default as Marquee } from '@/components/Molecules/MarqueeSlider.stories'
import { Default as Footer } from '@/components/Organisms/SiteFooter.stories'
import { Default as TopBar } from '@/components/Organisms/HeaderTopBar.stories'

export default {
  title: 'Layout/Default',
  component: DefaultLayout,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    marquee: Marquee.args,
    footer: Footer.args,
    topbar: TopBar.args,
  },
}

const Template = (args) => ({
  components: { DefaultLayout },
  setup() {
    return { args }
  },
  template: `
  <DefaultLayout v-bind="args">
    <div style="height: 100vh"></div>
  </DefaultLayout>
  `,
})

export const LoggedOut = Template.bind({})

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
export const LoggedIn = Template.bind({})
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loginButton = await canvas.getByRole('button', {
    name: /Log in/i,
  })
  await userEvent.click(loginButton)
}
