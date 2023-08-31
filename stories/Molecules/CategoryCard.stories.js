import CategoryCard from '@/components/Molecules/CategoryCard.vue'

export default {
  title: 'Molecules/Category Card',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: ['center', 'bottom', 'top'],
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

export const BackgroundAtBottom = Template.bind({})
BackgroundAtBottom.args = {
  ...Default.args,
  position: 'bottom',
}

export const BackgroundAtTop = Template.bind({})
BackgroundAtTop.args = {
  ...Default.args,
  position: 'top',
}
