import CategoryCard from './CategoryCard.vue'

export default {
  title: 'Molecules/Category Card',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['yellow', 'dark', 'white'],
    },
  },
}

const Template = (args) => ({
  components: { CategoryCard },
  setup() {
    return { args }
  },
  template: `
  <div style="max-width: 100%; width: 300px">
    <CategoryCard v-bind="args">
      {{ args.default }}
    </CategoryCard>
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  image: 'https://picsum.photos/304/391?grayscale&blur=2',
  default: 'Verdura',
  arrow: true,
}
