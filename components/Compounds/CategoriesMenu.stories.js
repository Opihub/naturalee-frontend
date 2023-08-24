import CategoriesMenu from './CategoriesMenu.vue'

export default {
  title: 'Compounds/Categories Menu',
  component: CategoriesMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categories: [
      {
        id: 1,
        title: 'Verdura',
        url: 'verdura',
        image: 'verdura',
      },
      {
        id: 2,
        title: 'Frutta',
        url: 'frutta',
        image: 'frutta',
      },
      {
        id: 3,
        title: 'Esotico',
        url: 'esotico',
        image: 'esotico',
      },
      {
        id: 4,
        title: 'Aromi',
        url: 'aromi',
        image: 'aromi',
      },
      {
        id: 5,
        title: 'Dispensa',
        url: 'dispensa',
        image: 'dispensa',
      },
    ],
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
