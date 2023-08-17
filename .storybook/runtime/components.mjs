import { defineComponent, h } from 'vue'

export const NuxtImg = defineComponent({
  name: 'NuxtImg',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    return () =>
      h('img', {
        ...props,
        ...ctx.attrs,
      })
  },
})
