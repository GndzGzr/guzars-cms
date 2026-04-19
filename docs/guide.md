# Obsidian CMS: Frontend Guide

## 🎨 UI/UX Principles
The goal is to create a reading experience that bridges the gap between a **Vercel-like developer dashboard** and an **Obsidian-like knowledge graph**.

1. **Minimalism:** Use whitespace effectively. Remove unnecessary borders, shadows, and colors.
2. **Typography-First:** Use a clean, modern sans-serif font (like Geist or Inter) for UI, and an elegant serif or readable sans for the actual note content. High contrast for primary text, muted grays for metadata.
3. **Layout:** 
   - A persistent, resizable sidebar for navigation (like Obsidian's file explorer).
   - A central reading pane with a constrained maximum width for optimal reading.
4. **Vercel/Obsidian Aesthetics:** 
   - Subtle borders (`border-gray-200` or `border-zinc-800` in dark mode).
   - Accents should be monochromatic or rely on a single, subtle active color.
   - Dark mode is a first-class citizen.

## 🛠️ Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + `tailwindcss-animate`
- **Component Library:** `shadcn/ui` (for minimal, accessible base components like Sidebars, Dialogs for search, and tooltips).
- **Icons:** `lucide-react` (clean, minimal line icons).
- **Data Rendering:** `html-react-parser` (to render the safe HTML provided by our Django backend) + `@tailwindcss/typography`.
- **Interactivity:** `react-force-graph-2d` for the connection graph.

## 🧱 Core Application Structure
- **Sidebar (`/components/Sidebar.tsx`):** Displays a tree of notes grouped by tags or folders.
- **Note View (`/app/notes/[slug]/page.tsx`):**
  - **Header:** Note Title, Tags, Last Modified.
  - **Body:** Markdown rendered HTML.
  - **Footer:** Backlinks section ("Referenced in...").
- **Graph View (`/app/graph/page.tsx`):** Full-screen or modal network visualization of the digital garden.
- **Global Search (Cmd+K):** A command palette to quickly jump between notes.

## 📡 API Integration Strategy
- We will leverage Next.js Server Components to fetch notes directly from the Django backend.
- We will intercept Obsidian's internal `[[wikilinks]]` using the `replace` function in `html-react-parser` to convert them into Next.js `<Link>` components, enabling instant client-side routing.