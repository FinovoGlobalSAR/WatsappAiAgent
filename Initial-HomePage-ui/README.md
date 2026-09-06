# Cuffy — Tailwind CSS version

Standalone React/Vite recreation of the Cuffy AI automation landing page.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

### Changes in this version
- Replaced the large component stylesheet with Tailwind CSS utility classes.
- Added Tailwind CSS v4 through `@tailwindcss/vite`.
- Increased typography sizes and font weights throughout the UI.
- Updated the full visual palette to:
  - `#0B3D3F`
  - `#033232`
  - `#18818D`
- Kept the existing layout, responsive behavior, animations, reveal effects, pricing toggle, and interactive mobile navigation.
- `src/index.css` only contains Tailwind imports, fonts, global resets, and animation keyframes that are awkward to express as normal utility classes.
