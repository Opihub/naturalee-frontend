# Naturalee

Il design del sito seguirà le linee guida dell'[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

https://www.futurelearn.com/info/blog/atomic-design-molecules-organisms

## Setup

Make sure to install the dependencies:

```bash
npm install
```

### Develop a component

```html
<template>
  <!--  -->
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: '';
@include component($prefix) {
  /* */
}
</style>

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
