import CategoriesMenu from '@/components/Compounds/CategoriesMenu.vue'
import getFromMock from '@/utils/mock'

export default {
  title: 'Compounds/Categories Menu',
  component: CategoriesMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categories: getFromMock('menu', 'categories'),
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { CategoriesMenu },
  setup() {
    return { args }
  },
  template: `
  <CategoriesMenu v-bind="args" />
  `,
})

export const Default = Template.bind({})
