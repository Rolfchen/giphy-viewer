# Giphy Viewer

This repository is built for Montu's React code challenge. The goal of the challenge is to build a React application for viewing and searching GIFs using the Giphy API.

## For Developers

### Initial Setup

- Run `yarn install` to setup all dependencies
- Update `.env` to setup the environment variables. You'll need to add your own giphy api key. **NOTE!** - Because `.env` is checked into the repository, it's better to create a `.env.local` file for the API key to avoid accidentally checking it in.

### Running The code

As this project is built with ViteJS, default Vite commands are used in `package.json`.

- `yarn dev` - Run the dev server that has hot module reload.
- `yarn dev --force` - If during development your code is out of date and encounters error, run this to force it to rebuild.
- `yarn build` - Build the production bundle
- `yarn lint` - Guess
- `yarn preview` - Preview the production build.

### Deployment

This section is TBA
