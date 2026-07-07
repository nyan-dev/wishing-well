# Wishing Well

A single-page interactive wishing well experience built with vanilla HTML, CSS, and JavaScript for GitHub Pages.

## Project Structure

- `/home/runner/work/wishing-well/wishing-well/index.html` — semantic app shell, layered well scene, canvas overlays, and modals
- `/home/runner/work/wishing-well/wishing-well/css/well.css` — midnight theme, isometric well exterior, scroll journey layers, and modal UI
- `/home/runner/work/wishing-well/wishing-well/js/scroll.js` — scroll-driven layer progress updates
- `/home/runner/work/wishing-well/wishing-well/js/canvas.js` — water shimmer and ambient dust canvas animation loops
- `/home/runner/work/wishing-well/wishing-well/js/firebase.js` — Firestore initialization plus submit/fetch helpers
- `/home/runner/work/wishing-well/wishing-well/js/app.js` — modal flow and wish form events

## Firebase Setup (Firestore)

1. Create a Firebase project and enable Firestore (Spark/free tier).
2. In the Firebase console, create a web app and copy its config object.
3. In `index.html`, define `window.__WISHING_WELL_FIREBASE_CONFIG__` before `js/firebase.js` loads, for example:

```html
<script>
  window.__WISHING_WELL_FIREBASE_CONFIG__ = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };
</script>
```

4. Use a Firestore collection named `wishes` with documents in the shape:

```js
{
  text: string,
  createdAt: timestamp,
  color: string
}
```

## Run Locally

Because this is a static project, you can run it with any static file server, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set source to deploy from your default branch root.
4. Save and wait for Pages to publish.

Your site will be available at `https://<username>.github.io/<repo>/`.
