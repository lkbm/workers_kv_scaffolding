# Basic Framework for a Cloudflare Worker site with KV storage.

A simple application built with Preact, TypeScript, Vite, and Cloudflare Workers.

You can view a deployed version at https://PLACEHOLDER_KV_NAMESPACE.your_workers_subdomain.workers.dev/

Your workers subdomain is set in the Cloudflare dashboard under Workers & Pages -> Account Details. You can also add a Workers Route to give it a custom domain.

Before deploying, you'll need to create a Cloudflare Workers project and set up a KV namespace. Copy `wrangler.toml.example` to `wrangler.toml` and update the KV namespace/id. Then just search the repo for "placeholder" to find everywhere needing configuring. Then write an app in `src/App.tsx`!
## Project Structure

```
├── src/                    # Application source code
│   ├── App.tsx            # Preact frontend component
│   └── main.tsx           # Hono backend (Cloudflare Worker)
├── dist/                   # Built frontend assets (generated)
├── index.html              # Entry HTML for Vite
└── [config files]          # See below
```

## Configuration Files Explained

This project has several config files because it runs code in **two different environments**:

| File | Purpose |
|------|---------|
| `tsconfig.json` | **Root config** - ties everything together using project references |
| `tsconfig.app.json` | **Frontend/Worker code** - for `src/` (browser + Cloudflare Workers) |
| `tsconfig.node.json` | **Build tooling** - for `vite.config.ts` (Node.js environment) |
| `vite.config.ts` | **Vite bundler config** - builds the frontend, handles Preact |
| `worker-configuration.d.ts` | **Cloudflare types** - auto-generated types for KV bindings |

### Why Three TypeScript Configs?

**`tsconfig.json`** (the root)
- Acts as a "solution" file that references the other two configs
- Includes Cloudflare Workers types globally
- Doesn't compile anything itself (`"files": []`)

**`tsconfig.app.json`** (your app code)
- Compiles everything in `src/` plus the worker types
- Targets ES2020 with DOM types for browser compatibility
- Configured for Preact JSX (`jsxImportSource: "preact"`)
- Strict mode enabled with unused variable checking

**`tsconfig.node.json`** (build tools only)
- Only compiles `vite.config.ts`
- Targets ES2022 (modern Node.js)
- No DOM types needed - this runs in Node during build

### Why `worker-configuration.d.ts`?

This file is **auto-generated** by running `wrangler types`. It provides TypeScript definitions for your Cloudflare bindings (KV namespaces, D1 databases, etc.) so you get autocomplete and type-checking when accessing `env.PLACEHOLDER_KV_NAMESPACE` in your worker code.

### Why `vite.config.ts`?

Configures the Vite bundler:
- Enables Preact with the `@preact/preset-vite` plugin
- Sets up React compatibility aliases (`react` → `preact/compat`)
- Configures build output with content hashing for cache-busting
- Includes bundle visualization for analyzing build size

## Commands

```bash
# Development
npm run dev          # Start development server

# Build and Deploy
npm run build        # TypeScript compile + Vite build
npm run deploy       # Deploy to Cloudflare Workers

# Code Quality
npm run lint         # ESLint checking
npm run preview      # Preview production build
```

## Run Locally

```bash
nvm use              # Switch to correct Node version
nvm install          # Install Node version if needed
npm run dev          # Start dev server
```

## Deploy

```bash
npx wrangler deploy
```
