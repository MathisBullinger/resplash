# Resplash

A little demo app showing photos from the [Unsplash](https://unsplash.com/) API.
The app can display the photos in one of two different layouts:
  - a traditional masonry-style layout where photos are always pushed onto the
    smallest column
  - a layout that alternates between portrait- and landscape-format photos which
    are "snapped" to a grid (portrait photos taking up two rows)

The user can like photos. The liked photos are listed on a separate page and the
information which photos have been liked is persisted to IndexedDB.

The app uses React, react-router, and Redux (including the Redux Toolkit). 
Other than that, no runtime dependencies are required.

All configuration (TypeScript, Webpack, Babel, Jest, ESLint, and Prettier) is
custom to this project.

## Setup instructions

The app connects to the Unsplash API through a 
[little proxy service](https://github.com/MathisBullinger/resplash-proxy) that 
caches requests and  falls back to them in case the rate limit is exceeded. 
You can run the proxy locally or connect directly to the one the deployed 
website uses.

Either way, you will need to tell the app where to connect to. To do that, 
create a `.env` file containing:

```
API_ENDPOINT=https://hkqc9eb5si.execute-api.eu-west-1.amazonaws.com/prod/
```

Alternatively, you can also define an environment variable named `API_ENDPOINT`
that webpack will use during the build.

After that, just `npm install` the dependencies and start the dev server with
`npm run dev`

Scripts to lint and format the code have also been defined in the 
`package.json`.
