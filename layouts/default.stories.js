// import { within, userEvent } from '@storybook/testing-library'
import DefaultLayout from './default.vue'

import TopBar from '@/components/Organisms/HeaderTopBar.stories'
import Header from '@/components/Organisms/HeaderMain.stories'
import BottomBar from '@/components/Organisms/HeaderBottomBar.stories'
import CategoryCards from '@/components/Organisms/CategoryCards.stories'
import Marquee from '@/components/Molecules/MarqueeSlider.stories'
import Footer from '@/components/Organisms/SiteFooter.stories'

export default {
  title: 'Layouts/Default',
  component: DefaultLayout,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    topbar: TopBar.args,
    header: Header.args,
    bottombar: BottomBar.args,
    marquee: Marquee.args.marquee,
    categoriesTitle: CategoryCards.args.title,
    categories: CategoryCards.args.categories,
    footer: Footer.args,
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

export const Complete = Template.bind({})

export const NoBreadCrumb = Template.bind({})
NoBreadCrumb.args = {
  bottombar: {
    ...BottomBar.args,
    breadcrumb: null,
  },
}

export const NoBottombar = Template.bind({})
NoBottombar.args = {
  hideBottombar: true,
}

export const NoBanner = Template.bind({})
NoBanner.args = {
  topbar: {
    ...TopBar.args,
    banners: null,
  },
}

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
// export const LoggedIn = Template.bind({})
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
//   const loginButton = await canvas.getByRole('button', {
//     name: /Log in/i,
//   })
//   await userEvent.click(loginButton)
// }
