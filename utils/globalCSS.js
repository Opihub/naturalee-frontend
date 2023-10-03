const cssGlobals = [
  '@/assets/css/modules',
  '@/assets/css/variables/constants.scss',
  '@/assets/css/utilities/responsive.scss',
  '@/assets/css/utilities/bemit.scss',
  '@/assets/css/utilities/unit.scss',
  '@/assets/css/utilities/keyframes.scss',
  '@/assets/css/utilities/transition.scss',
  '@/assets/css/utilities/text.scss',
  '@/assets/css/utilities/variables.scss',
  '@/assets/css/utilities/vue-transition.scss',
  '@/assets/css/variables/compounds.scss',
  '@/assets/css/globals/extends.scss',
  '@/assets/css/globals/layout.scss',
]

export const additionalData = cssGlobals.reduce(
  (accumulator, file) => accumulator + `@import "${file}";`,
  ''
)
