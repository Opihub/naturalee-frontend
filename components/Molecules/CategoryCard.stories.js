import CategoryCard from './CategoryCard.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Molecules/Category Card',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
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

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
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
