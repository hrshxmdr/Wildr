 # Wildr
<img src="frontend\public\img\website.png" width="800" alt="Screenshot">

live: https://wildr.onrender.com/

A React + React-Bootstrap app for discovering and booking campsites.

## Quick Start

1) Install dependencies

```
cd frontend
npm install
```

2) Create environment file

Copy `.env.example` to `.env` and set your keys:

```
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
```

3) Run the app

```
npm start
```

App runs at http://localhost:3000

## Data model

- Campsites live in `frontend/src/pages/campsiteData.js` (raw) and are normalized via `frontend/src/pages/campsites.js`.
- Normalized fields exposed to the app:
  - `images`: array of `{ url, caption, credit }`
  - `coverImage`: string URL
  - `coordinates`: `[lat, lon]` if present
  - `mapLink`, `weatherLink`: computed if not provided

Use `import campsites from './pages/campsites'` anywhere you need campsite data.

## Environment variables

- `REACT_APP_WEATHER_API_KEY` (OpenWeather). Without a key, a mock value is used on the detail page.

Safe-guard: ensure `.env` files are git‑ignored; only `.env.example` should be committed.

## Error handling

- Global error boundary: `src/components/ErrorBoundary.js`.
- 404 route: `src/pages/NotFoundPage.js`.

## Bookings

- Client merges server bookings from `GET /bookings/me` with locally saved pending bookings when the backend is unavailable.
- Local pending storage key: `pending_bookings`.

## Scripts

- `npm start` – start dev server
- `npm run build` – production build

## Deployment

Deploy the `frontend` build to a static host (Netlify/Vercel/etc.).

1) Build

```
npm run build
```

2) Deploy the `frontend/build` directory. Ensure environment variables are configured in the hosting provider.

## Linting/Formatting

This project expects imports at the top of each module and standard ESLint rules.

## Testing (recommendations)

- Unit tests for data normalization in `pages/campsites.js`.
- Integration test for booking flow and no‑coordinates fallback.

