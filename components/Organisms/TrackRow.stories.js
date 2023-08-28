import TrackRow from './TrackRow.vue'

export default {
  title: 'Organisms/Track Row',
  component: TrackRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Amet consectetur adipiscing elit',
  },
}

const Template = (args) => ({
  components: { TrackRow },
  setup() {
    return { args }
  },
  template: `
  <TrackRow v-bind="args">
    <template #title>{{ args.title }}</template>

    <template #firstPoint><strong>Scegli</strong> i tuoi prodotti</template>

    <template #secondPoint><strong>Conferma</strong> il tuo ordine</template>

    <template #thirdPoint><strong>Ricevi</strong> la tua spesa</template>

    <template #fourthPoint><strong>Riordina<br />quando vuoi!</strong></template>
  </TrackRow>
  `,
})

export const Default = Template.bind({})
Default.args = {}
