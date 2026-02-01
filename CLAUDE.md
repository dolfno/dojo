# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding website for "Jorinde & Dolf" built with Next.js 16, React 19, and TypeScript. Static site deployed via SFTP to shared hosting.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build static export to /out/
npm run lint     # Run ESLint
```

## Architecture

**Static Export**: Configured in `next.config.ts` with `output: 'export'` and unoptimized images for static hosting.

**Path Alias**: `@/*` maps to `./src/*`

**Structure**:
- `src/app/page.tsx` - Single-page app composing all section components
- `src/app/layout.tsx` - Root layout with Navigation and Footer
- `src/app/globals.css` - Tailwind theme with custom colors
- `src/components/` - Section components (Hero, Story, WeddingDetails, Travel, Camping, RSVP, etc.)

**Animation Pattern**: All components use Framer Motion with `"use client"` directive. Scroll animations use `whileInView` with `viewport={{ once: true }}`.

**Custom Theme Colors** (defined in globals.css `@theme`):
- `cobalt-green` (#93FF93) - Primary accent
- `lemon-yellow` (#F2FF26) - Secondary accent
- `burnt-sienna` (#A7374B) - Tertiary
- `wedding-blue` (#0C75FF) - Accent

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys on push to `main`:
1. Builds static export with `npm run build`
2. Uploads `/out/*` to `/public_html/` via SFTP

Required secrets: `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_PASSWORD`

## Notes

- RSVP form currently has mock submission (no backend integration)
- Images served from `/images/` directory in public folder
