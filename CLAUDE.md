# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build to dist/
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

This is a React + Vite SPA for building printable visual routines for kids. 100% client-side, no backend.

### App Flow
1. **TemplateSelector** - User picks a template (morning, bedtime, afterschool, or blank)
2. **RoutineBuilder** - Main editing UI with drag-and-drop step list
3. **InteractiveMode** - Full-screen "Let's Go!" mode where kids tap to complete steps (with confetti)

### Key State (in App.jsx)
- `steps` - Array of step objects with unique IDs (`{id, icon, label}`)
- `title` - Routine title string
- `selectedTemplate` - Which template was chosen
- `isInteractive` - Toggles between builder and interactive mode

### Data Layer (src/data/)
- `steps.js` - Step library (40+ predefined steps) with categories
- `templates.js` - Pre-built routine templates with default steps

### Drag & Drop
Uses @dnd-kit with PointerSensor/TouchSensor/KeyboardSensor. The `StepList` component wraps steps in `DndContext` and `SortableContext`.

### Print/PDF
- `PrintPreview` component renders a print-optimized layout
- `react-to-print` handles browser print dialog
- `utils/pdf.js` uses html2canvas + jsPDF to generate single-page PDFs

### Icons
All icons come from `lucide-react`. Steps store icon names as strings (e.g., `icon: 'Sun'`), which are dynamically imported using `icons[step.icon]`.

### Styling
TailwindCSS v4 via `@tailwindcss/vite` plugin. Custom gradients and the `.cute-button` class are defined in `index.css`.
