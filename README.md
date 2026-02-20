# Visual Schedule Builder

A cute, interactive webapp for creating printable visual routines for kids. Build morning routines, bedtime routines, or custom schedules in under a minute.

## Features

- **Template Selection** - Start with Morning, Bedtime, After School, or blank
- **Drag & Drop** - Reorder steps easily with touch/mouse support
- **40+ Pre-built Steps** - Common routine tasks with colorful icons
- **Custom Steps** - Add your own steps with icon picker
- **Interactive Mode** - "Let's Go!" mode with confetti celebrations when kids complete steps
- **Print & PDF** - Export routines for printing (auto-scales to one page)
- **Mobile Friendly** - Works great on phones and tablets

## Tech Stack

- React + Vite
- TailwindCSS
- Lucide React (icons)
- @dnd-kit (drag & drop)
- canvas-confetti (celebrations)
- react-to-print + jsPDF (export)

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
```

Deploy the `dist` folder to Vercel, Netlify, or any static host.

## Privacy

This app is 100% client-side. No data is stored or transmitted - everything stays in your browser.
