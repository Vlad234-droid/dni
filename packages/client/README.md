# Diversity & Inclusion App (@dni/client)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Follow the [instructions](../../README.md#L13) of the root project

## Configuration for ENV (production/dev/stage)

Copy `.env.example` and rename to .env.[ENV] and configure correctly

```bash
$ cp .env.example .env.[ENV]
```

or

```bash
$ cp .env.example .env
```

where `[ENV] = production | dev | stage` and if missing it defaults to ''.

## Available Scripts

In the project directory, you can run:

### `yarn run:dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn storybook`

It will start Storybook locally and output the address.\
Depending on your system configuration, it will automatically open the address in a new browser tab and you'll be greeted by a welcome screen.

The page will reload if you make edits.

### `yarn build-storybook`

It will output a static Storybook in the `storybook-static` directory, which can then be deployed to any static site hosting service.

### Cleanup.

- Run `yarn clean` to remove build artifact in packages.
- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.

### Test.

- Run `yarn test` to run tests.
- Run `yarn test:coverage` to collect coverage.
- Run `yarn test:watch` to run tests in watch mode.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Folder structure

src

- config - app level configuration files
- features - components that provide interface to be used
  (pages and reusable components are also developed as features and placed in features folder)
- hooks - app level reusable hooks
- store - app rootReducer and store
- theme(optional) - based on Tesco theme provided
- types - app level type definition
- utils - app level reusable functions
