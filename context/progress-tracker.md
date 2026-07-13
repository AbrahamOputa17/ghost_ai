# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Build remaining shadcn primitives for subsequent feature specs (Card, Input, Textarea, ScrollArea, etc.)

## Completed

- Cleaned up Next.js boilerplate (stripped globals.css, deleted SVGs, and verified page.tsx is minimal).
- Set up git repository and pushed initial commit to remote origin (`https://github.com/AbrahamOputa17/ghost_ai.git`).
- Installed shadcn/ui tab and dialog primitives.
- Built the Editor Navbar component (`components/editor/editor-navbar.tsx`).
- Built the Project Sidebar component (`components/editor/project-sidebar.tsx`) with overlay/slide-in animation and tab/placeholder structures.
- Integrated the navbar and sidebar into the interactive editor shell layout in `app/page.tsx`.
- **[03-auth] Clerk authentication fully wired:**
  - `proxy.ts` middleware protects all routes; public routes: `/sign-in(.*)`, `/sign-up(.*)`.
  - `ClerkProvider` wraps root layout with `dark` theme (`@clerk/ui/themes`) + CSS variable overrides for brand colours.
  - Design system colour tokens defined in `globals.css` as `:root` CSS vars (`--bg-base`, `--accent-primary: #2dd4bf`, etc.).
  - `localization` prop on `ClerkProvider` renames "My Application" to "Ghost AI".
  - Sign-in/sign-up pages: premium two-panel layout — left branding panel (logo, headline, 3 Lucide icon features), right Clerk form.
  - `UserButton` in editor navbar via `Show when="signed-in"`, `SignInButton` via `Show when="signed-out"`.
  - `npm run build` **passes cleanly** (exit code 0).

## In Progress

- (none)

## Next Up

- Finish building shadcn primitives for subsequent feature specs (Card, Input, Textarea, ScrollArea, etc.)
- Canvas / editor main area

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions

- Editor shell lives at `/editor` (not `/`). Root `/` is a server redirect based on auth state.
- Clerk auth pages use `@clerk/ui` dark theme with CSS variable overrides for brand colours (`--accent-primary: #2dd4bf`, etc.).
- `proxy.ts` is used as middleware (not `middleware.ts`) per feature spec requirement.

## Session Notes

- `@clerk/nextjs` v7 (this version) does **not** export `SignedIn`/`SignedOut` from the client bundle. Use `Show when="signed-in|signed-out"` instead.
- `ClerkProvider appearance` takes `{ theme: dark }` (import `dark` from `@clerk/ui/themes`) — not `baseTheme`.
- Valid v7 `appearance.variables` keys: `colorPrimary`, `colorBackground`, `colorInput`, `colorForeground`, `colorMutedForeground`, `colorBorder`, `colorInputForeground`.
- `@theme` in `globals.css` produces a lint warning in some editors but is valid Tailwind v4 syntax — safe to ignore.
- Build confirmed passing (exit code 0) on 2026-07-13.
