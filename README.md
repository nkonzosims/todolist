# Pollinate Assessment

An Angular 21 application for browsing users and their todos. It uses NgRx for state management, Angular Router for page navigation, Jest for unit tests, ESLint for static analysis, and Prettier for formatting.

## Requirements

- Node.js 22
- npm 11

## Run the app locally

Install the locked dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200). The development server reloads when source files change.

The local server uses `proxy.config.json` to forward `/api` requests to [JSONPlaceholder](https://jsonplaceholder.typicode.com), so no API key or local backend is required.

## Available routes

- `/users` — paginated user list
- `/todos` — paginated list of all todos
- `/todos?userId=1` — todos belonging to a selected user

Unknown routes redirect to `/users`.

## Development commands

| Command                   | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| `npm start`               | Start the local development server                 |
| `npm run build`           | Create an optimized production build in `dist/`    |
| `npm test -- --runInBand` | Run the Jest test suite once                       |
| `npm run test:watch`      | Run Jest in watch mode                             |
| `npm run test:coverage`   | Generate the test coverage report                  |
| `npm run lint`            | Check TypeScript and Angular templates with ESLint |
| `npm run lint:fix`        | Automatically fix supported lint issues            |
| `npm run format`          | Format the repository with Prettier                |
| `npm run format:check`    | Check formatting without changing files            |
| `npm run quality`         | Run the formatting and lint quality gate           |

## Verify a change

Before opening a pull request, run the same primary checks used by CI:

```bash
npm run quality
npm test -- --runInBand
npm run build
```

## Architecture

- `src/app/pages` contains the routed Users and Todos pages.
- `src/app/components` contains reusable presentational components.
- `src/app/state` contains NgRx actions, reducers, selectors, and effects.
- `src/app/shared/service` contains the HTTP API services.
- `src/styles` contains shared SCSS variables.

NgRx effects call the API services, reducers store users, todos, pagination, loading, and error state, and pages read that state through selectors.

## Production deployment

`npm run build` creates static production files under `dist/`. Deploy those files to a static host or web server configured to:

1. Fall back to `index.html` for client-side routes such as `/users` and `/todos`.
2. Forward `/api/*` requests to `https://jsonplaceholder.typicode.com/*`, matching the development proxy behavior.

The GitHub Actions workflow validates pull requests and pushes to `main`, then uploads the production `dist/` directory as a build artifact. It does not deploy automatically.

### CI configuration

The workflow reads its Node.js version from the `NODE_VERSION` GitHub Actions repository secret. Before running CI for the first time:

1. Open the repository on GitHub.
2. Go to **Settings → Secrets and variables → Actions**.
3. Select **New repository secret**.
4. Use `NODE_VERSION` as the name and `22` as the value.
