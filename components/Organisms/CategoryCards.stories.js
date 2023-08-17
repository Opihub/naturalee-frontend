import CategoryCards from './CategoryCards.vue'

export default {
  title: 'Organisms/Category Cards',
  component: CategoryCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Categorie lorem ipsum dolor sit',
    categories: [
      {
        id: 1,
        title: 'Verdura',
        link: 'verdura',
        slug: 'verdura',
        image: 'https://picsum.photos/id/100/304/391?grayscale&blur=2',
      },
      {
        id: 2,
        title: 'Frutta',
        link: 'frutta',
        slug: 'frutta',
        image: 'https://picsum.photos/id/200/304/391?grayscale&blur=2',
      },
      {
        id: 3,
        title: 'Esotico',
        link: 'esotico',
        slug: 'esotico',
        image: 'https://picsum.photos/id/300/304/391?grayscale&blur=2',
      },
      {
        id: 4,
        title: 'Aromi',
        link: 'aromi',
        slug: 'aromi',
        image: 'https://picsum.photos/id/400/304/391?grayscale&blur=2',
      },
      {
        id: 5,
        title: 'Dispensa',
        link: 'dispensa',
        slug: 'dispensa',
        image: 'https://picsum.photos/id/500/304/391?grayscale&blur=2',
      },
    ],
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
