# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow
- create new brnanch from main
- get issue for requirements
- plan
- execute
- create PR
- do claude review

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
- `steel-azure` (#074898) - Primary: Nav bar, footer headings, main headings
- `golden-glow` (#D7D42B) - Accent: CTA buttons, highlights (use dark text on this!)
- `sage-green` (#719873) - Secondary: Section backgrounds, cards, form accents
- `brandy` (#842F12) - Emphasis: Footer background, error states, warmth

**Color Usage Rules**:
- Never use white text on Golden Glow - use Steel Azure or Brandy instead
- Steel Azure and Brandy backgrounds work well with white text
- Follow 60-30-10 rule: 60% neutral (white), 30% structure (Steel Azure, Sage Green), 10% accent (Golden Glow, Brandy)

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys on push to `main`:
1. Builds static export with `npm run build`
2. Uploads `/out/*` to `/public_html/` via SFTP

Required secrets: `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_PASSWORD`

## Notes

- RSVP form currently has mock submission (no backend integration)
- Images served from `/images/` directory in public folder
