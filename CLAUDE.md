# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple React app built with:
- **Frontend**: Preact (React alternative) with TypeScript and Vite
- **Backend**: Hono framework running on Cloudflare Workers
- **Storage**: Cloudflare KV for persistent data storage (possibly not used)
- **Deployment**: Cloudflare Workers via Wrangler

## Architecture

### Frontend (src/App.tsx)
- Uses Preact hooks for state management

### Backend (src/main.tsx)
- Hono server with simple REST API:
  - `GET /api/state/:key` - retrieve data
  - `PUT /api/state/:key` - save data
- Serves static assets from /dist
- Uses Cloudflare KV namespace "PLACEHOLDER_KV_NAMESPACE" for persistence

### Build Configuration
- Vite with Preact preset
- TypeScript with separate configs for app and node code
- Bundle visualization enabled
- React compatibility layer (preact/compat)

## Common Commands

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

## Development Notes

## TODOs
* Durable Objects support