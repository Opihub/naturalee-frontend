module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    '@nuxt/eslint-config',
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    'vue/no-multiple-template-root': 'off',
  },
}
