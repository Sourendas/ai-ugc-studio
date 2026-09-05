# Ayra Studio — AI UGC service site

This is a complete, dependency-free marketing website for a human-assisted AI UGC studio. It is designed for the offer: **client sends product photos → Ayra Studio delivers a consistent virtual-creator Reel plus caption and hook.**

## Run locally

1. Install [Node.js 18 or later](https://nodejs.org/) if it is not already installed.
2. Open PowerShell in this folder.
3. Run:

   ```powershell
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in a browser.
5. Stop the server with `Ctrl+C`.

There are no packages to install and no external build step. You can also open `index.html` directly, though using the local server is recommended.

If port 3000 is already busy, run `powershell -Command "$env:PORT=3001; npm start"` and open `http://localhost:3001`.

## Before publishing

- The WhatsApp number is currently set to a demo value (`918240139489`) in **two** places that must stay in sync:
  - `index.html` — the "Message the studio" link in the order section
  - `script.js` — the `studioNumber` constant used by the brief form
  Replace both with the business number in international format, without `+` or spaces.
- Replace the concept cards in the *Work* section with your actual sample Reels or images once available.
- Update package prices and copy to match your final offer.
- The favicon lives at `assets/favicon.svg`; swap it for the brand mark when ready.

## Files

- `index.html` — page structure and copy
- `styles.css` — responsive visual design
- `script.js` — mobile menu and WhatsApp intake form handoff
- `server.js` — zero-dependency local web server
- `assets/favicon.svg` — browser icon
- `package.json` — run command and Node version requirement
