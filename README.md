# VroomHub

A local-first car marketplace demo. Browse verified-style listings, filter by make, fuel type and budget, save favourites, and request a test drive — all without an account or a backend.

## Why it exists

This repo began as a folder of unused data and image files from an earlier car-site idea. It has been rebuilt into a single, usable app with a clear design, working filters and real interactions.

## Features

- **Search and filters** — free-text search plus make, fuel type and maximum price
- **Favourites** — saved in `localStorage`, with a "favourites only" view
- **Detail view** — full specs, price and location in a modal
- **Test-drive requests** — name, phone and preferred date captured locally
- **Dark mode** and responsive card grid
- **Zero dependencies** — plain HTML, CSS and JavaScript

## Run it

```bash
# open index.html directly, or:
python3 -m http.server 8000
# visit http://localhost:8000
```

## Data & privacy

Listings are sample data in `app.js`. Favourites and requests stay in your browser's `localStorage`. Nothing is sent anywhere — this is a front-end demo, so the "request" is stored locally rather than delivered to a seller.

## Stack

HTML5, modern CSS (custom properties, grid, flexbox), vanilla JavaScript.

## License

MIT — see [LICENSE](LICENSE).
