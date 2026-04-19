# Frontend Roadmap

## Phase 1: Project Initialization 🚧 (Completed)
- [x] Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
- [x] configure strict ESLint and Prettier rules.
- [x] Add `lucide-react` and initialize `shadcn/ui`.
- [x] Setup global CSS with minimal, Vercel-like theme variables (light/dark mode).

## Phase 2: Layout Shell & Navigation 🧭 (Completed)
- [x] Create a persistent Sidebar layout (`app/layout.tsx`).
- [x] Build a mock dynamic file tree component in the sidebar.
- [x] Add responsive mobile menu toggle.
- [x] Implement a minimal top navigation bar (breadcrumbs & search trigger).

## Phase 3: Data Plumbing & API Client 🔌 (Completed)
- [x] Build the `lib/api.ts` utility for typed `fetch` requests to the Django backend.
- [x] Define TypeScript interfaces for `Note`, `Tag`, and `Link` structures.
- [x] Set up environment variables (`.env.local`).

## Phase 4: Note Rendering & Interactions 📄 (Completed)
- [x] Build the Main Index Page (`/` or `/notes`): Display recent/featured notes.
- [x] Build the Dynamic Note Route (`/notes/[slug]`).
- [x] Implement `html-react-parser` with `@tailwindcss/typography` (`prose`).
- [x] Write the custom link interceptor to handle Obsidian internal `href` formats.
- [x] Display tags as minimal Vercel-like badges.
- [x] Render the *Backlinks* (incoming connected notes) at the bottom of the article.

## Phase 5: Advanced Obsidian Features 🕸️ (Completed)
- [x] Implement the `react-force-graph-2d` Graph view component.
- [x] Implement global search modal (Command Palette) using `cmdk`.
- [x] Polish image rendering using the backend proxy endpoint.

## Phase 6: Polish & Deployment 🚀 (Current)
- [ ] Implement full Dark Mode support using `next-themes`.
- [ ] Add loading skeletons for better UX.
- [ ] Deploy to Vercel.

## Phase 7: Authentication & Authorization 🔐
- [ ] Implement NextAuth.js or custom session auth.
- [ ] Secure API routes and restrict access to private notes.
- [ ] Build a custom Login UI matching the platform aesthetic.
- [ ] Handle session expiration and Token refreshes cleanly.