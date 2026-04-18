# Frontend Roadmap

## Phase 1: Project Initialization 🚧 (Current)
- [ ] Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
- [ ] configure strict ESLint and Prettier rules.
- [ ] Add `lucide-react` and initialize `shadcn/ui`.
- [ ] Setup global CSS with minimal, Vercel-like theme variables (light/dark mode).

## Phase 2: Layout Shell & Navigation 🧭
- [ ] Create a persistent Sidebar layout (`app/layout.tsx`).
- [ ] Build a mock dynamic file tree component in the sidebar.
- [ ] Add responsive mobile menu toggle.
- [ ] Implement a minimal top navigation bar (breadcrumbs & search trigger).

## Phase 3: Data Plumbing & API Client 🔌
- [ ] Build the `lib/api.ts` utility for typed `fetch` requests to the Django backend.
- [ ] Define TypeScript interfaces for `Note`, `Tag`, and `Link` structures.
- [ ] Set up environment variables (`.env.local`).

## Phase 4: Note Rendering & Interactions 📄
- [ ] Build the Main Index Page (`/` or `/notes`): Display recent/featured notes.
- [ ] Build the Dynamic Note Route (`/notes/[slug]`).
- [ ] Implement `html-react-parser` with `@tailwindcss/typography` (`prose`).
- [ ] Write the custom link interceptor to handle Obsidian internal `href` formats.
- [ ] Display tags as minimal Vercel-like badges.
- [ ] Render the *Backlinks* (incoming connected notes) at the bottom of the article.

## Phase 5: Advanced Obsidian Features 🕸️
- [ ] Implement the `react-force-graph-2d` Graph view component.
- [ ] Implement global search modal (Command Palette) using `cmdk`.
- [ ] Polish image rendering using the backend proxy endpoint.

## Phase 6: Polish & Deployment 🚀
- [ ] Implement full Dark Mode support using `next-themes`.
- [ ] Add loading skeletons for better UX.
- [ ] Deploy to Vercel.