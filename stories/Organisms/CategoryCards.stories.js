import CategoryCards from '@/components/Organisms/CategoryCards.vue'
import { getFromMock } from '@/utils/mock'

export default {
  title: 'Organisms/Category Cards',
  component: CategoryCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Categorie lorem ipsum dolor sit',
    categories: getFromMock('categories'),
  },
}

const Template = (args) => ({
  components: { CategoryCards },
  setup() {
    return { args }
  },
  template: `
  <CategoryCards v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {}
