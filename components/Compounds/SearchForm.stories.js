import SearchForm from './SearchForm.vue'

export default {
  title: 'Compounds/Search Form',
  component: SearchForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    _background: 'color',
    _inputWidth: 'string',
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'mini'],
    },
  },
  args: {
    _background: '#00966E',
    _inputWidth: '912px',
    size: 'default',
    modelValue: '',
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
const Template = (args) => ({
  components: { SearchForm },
  setup() {
    return { args }
  },
  template: `
  <div :style="{backgroundColor: args._background, width: args._inputWidth}" style="padding: 10px; max-width: calc(100vw - 1rem * 2);">
    <SearchForm :style="{width: '100%', maxWidth: args._inputWidth}" v-bind="args" />
  </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  size: 'default',
  _inputWidth: '932px',
  placeholder: 'Inizia la tua spesa',
}

export const Mini = Template.bind({})
Mini.args = {
  size: 'mini',
  _inputWidth: '515px',
  placeholder: 'Di cosa hai bisogno?',
}
