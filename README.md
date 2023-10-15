# Weather Dashboard

This Weather Dashboard project is a web application that allows users to search for current weather conditions in a city of their choice. It displays essential weather information for the selected city, including the city name, current temperature in both Fahrenheit and Celsius, a weather icon, and a short description. Users can also toggle between Fahrenheit and Celsius temperature units. Additionally, the background of the dashboard changes based on the current weather condition.

# Demo

Try [here](https://weather-dashboard-orcin-kappa.vercel.app/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Clone the repository:

```sh
git clone https://github.com/burak48/weather-dashboard.git
```

### Install the dependencies:

```sh
npm install
```

### Set up environment variables:

Create a `.env` file at the root of the project and add the following environment variables:

- VITE_APP_BASE_URL=your-open-weather-map-base-url
- VITE_APP_API_KEY=your-open-weather-map-api-key

### Start the server:

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production:

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/):

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/):

```sh
npm run lint
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
