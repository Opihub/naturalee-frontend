import BreadCrumb from '@/components/Molecules/BreadCrumb.vue'

export default {
  title: 'Molecules/Breadcrumb',
  component: BreadCrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    _background: 'color',
  },
  args: {
    _background: '#00966E',
    menu: [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: 'Frutta',
        link: 'frutta',
      },
      {
        title: 'Nome prodotto',
      },
    ],
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { BreadCrumb },
  setup() {
    return { args }
  },
  template: `
  <div :style="{backgroundColor: args._background}" style="padding: 10px">
    <BreadCrumb v-bind="args" />
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
