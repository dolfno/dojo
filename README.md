# Jorinde & Dolf Wedding Website

Wedding website built with Next.js 16, React 19, and TypeScript. Static site deployed via SFTP.

## Color Palette

| Color | Hex | Role | Usage |
|-------|-----|------|-------|
| Steel Azure | #074898 | Primary | Nav bar, headings, footer text |
| Golden Glow | #D7D42B | Accent | CTA buttons, highlights |
| Sage Green | #719873 | Secondary | Section backgrounds, cards |
| Brandy | #842F12 | Emphasis | Footer background, error states |

**Note**: Never use white text on Golden Glow - use Steel Azure or Brandy instead.

## Getting Started

```bash
npm run dev      # Start development server
npm run build    # Build static export to /out/
npm run lint     # Run ESLint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

GitHub Actions deploys to shared hosting via SFTP on push to `main`.

Required secrets: `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_PASSWORD`
