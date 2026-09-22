# Prompt Recipe

Prompt Recipe is a Next.js 16 App Router reference site for practical AI-assisted product, frontend, backend, and UI/UX work. Content in `content/` is rendered through route pages and typed catalogues in `lib/`.

## Run locally

Use the lockfile and avoid lifecycle scripts during an audit or other isolated install:

```bash
npm ci --ignore-scripts
npm run audit:docs
npm run lint
npm run build
npm run dev:local
```

Open [http://localhost:3000](http://localhost:3000). `npm run dev:local` binds only to localhost; `npm run preview` requires a successful production build first. The preview, smoke, and capture scripts start a local server and are not required for static content validation.

## Checks and limits

- `npm run audit:docs` verifies content metadata and internal catalogue references.
- `npm run lint` and `npm run build` require installed dependencies.
- This repository contains no application database, authentication service, or external API integration. Documentation examples describe patterns, not deployed implementations.
- A successful static build does not verify browser behavior, accessibility, or production hosting.

## Project layout

- `app/`: Next.js routes and metadata
- `components/`: UI, MDX, layout, and search components
- `content/`: MDX reference content
- `lib/`: content loaders and typed catalogue data
- `scripts/`: documentation audit, inventory, and local preview helpers
