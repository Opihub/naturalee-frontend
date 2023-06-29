

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [
    '../components/Atoms/*.mdx',
    '../components/Atoms/*.stories.@(js|jsx|ts|tsx)',
    '../components/Molecules/*.mdx',
    '../components/Molecules/*.stories.@(js|jsx|ts|tsx)',
    '../components/Compounds/*.mdx',
    '../components/Compounds/*.stories.@(js|jsx|ts|tsx)',
    '../components/Organisms/*.mdx',
    '../components/Organisms/*.stories.@(js|jsx|ts|tsx)',
    '../layouts/*.mdx',
    '../layouts/*.stories.@(js|jsx|ts|tsx)',
    '../pages/*.mdx',
    '../pages/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    'storybook-addon-nuxt',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
