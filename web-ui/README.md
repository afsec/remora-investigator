# myapp-v3-daisy: Svelte Kit + Tailwind CSS

## Sveltekit new project

Follow tutorial: https://svelte.dev/docs#getting-started


```
$ npm create svelte@latest myapp-v3-daisyui


create-svelte version 4.2.0

┌  Welcome to SvelteKit!
│
◇  Which Svelte app template?
│  Skeleton project
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  Select additional options (use arrow keys/space bar)
│  Add ESLint for code linting, Add Prettier for code formatting
│
└  Your project is ready!
```


## Tailwind CSS setup

### Setup
Follow tutorial: https://tailwindcss.com/docs/guides/sveltekit

```
$ npm install -D tailwindcss postcss autoprefixer

$ npx tailwindcss init -p --ts 

```

### TailwindCSS Typography plugin

#### Dependencies
```
$ npm i --save-dev @types/node
```

#### Setup plugin
Follow tutorial: https://tailwindcss.com/docs/typography-plugin#installation

```
$ npm install -D @tailwindcss/typography
```

Then add the plugin to your `tailwind.config.js` file:

```tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```


## TailwindCSS + DaisyUI

Follow tutorial: https://daisyui.com/docs/install/

```
$ npm i daisyui
```
Then add the plugin to your `tailwind.config.js` file:

```tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("daisyui"),
    // ...
  ],
}

```


## Install Svelte  + adapter-static

Follow tutorial: https://kit.svelte.dev/docs/single-page-apps

Install with `npm i -D @sveltejs/adapter-static`, then add the adapter to your `svelte.config.js` with the following options:

```svelte.config.js
import adapter from '@sveltejs/adapter-static';

...

adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
```



