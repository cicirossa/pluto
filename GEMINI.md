# Pluto Projector - Project Implementation Guide

This document serves as the canonical implementation guide for this project. All AI agents must strictly follow these instructions, rules, and conventions before and during development.

---

## 1. Project Analysis

Based on repository contents, the project follows this architecture and stack:

- **Project Architecture**: Single Page Application (SPA) with state-based cinematic scene transitions.
- **Folder Structure**:
  - `src/` - Application source code.
    - `components/` - React components (e.g., UI elements, sections).
      - `effects/` - Cinematic visual effect components.
    - `context/` - Global state providers (`AudioContext`, `TimelineContext`).
    - `data/` - Static data and content (lyrics, photos, opening lines).
    - `hooks/` - Custom React hooks (`useTypingText`, `useReducedMotion`).
  - `assets/` - Static media and large assets (served from root by Vite).
  - `.agents/skills/` - Local agent skills for design enforcement.
- **Tech Stack**: React 18, GSAP (GreenSock), Framer Motion.
- **Framework**: Vanilla React.
- **UI Library**: Custom components (No external UI component library).
- **CSS Framework**: Tailwind CSS v4 (`@tailwindcss/vite`).
- **Build Tool**: Vite v6.
- **Package Manager**: npm.
- **Entry Points**: `index.html` → `src/main.jsx` → `src/App.jsx`.
- **Routing System**: Custom state-based scene routing managed via `useState` in `App.jsx` (scenes: `opening`, `transition`, `main`, `ending`). No traditional router dependency.
- **Component Structure**: Functional React components with hooks. Heavy use of `useRef` for DOM manipulation via GSAP, and Framer Motion for presence animations.
- **Assets Organization**: Audio and heavy assets are placed in the root `assets/` directory (Vite config `assetsInlineLimit` is tuned for this).
- **Existing Coding Conventions**: 
  - Standard ES Modules.
  - JSX syntax for components.
  - Combination of Tailwind utility classes and bespoke CSS variables/custom classes (e.g., `.paper-texture`, `.glass-dark`) in `src/index.css`.
- **Environment Configuration**: Configured via `vite.config.js` (React plugin, Tailwind plugin, host server config).
- **Development Scripts**: 
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`

---

## 2. NPM Requirement

This project **MUST** use **npm**. 

- **Always** use npm.
- **Never** use yarn.
- **Never** use pnpm.
- **Never** use bun.

Example commands to use during development:
```bash
npm install
npm run dev
npm run build
```
If dependencies are missing or need updating, install them using `npm` only.

---

## 3. Design Skill Requirement

This project MUST use the Design Skill located inside `.agents/skills/`.

Before implementing any UI, you must:
1. Load the appropriate Design Skill (e.g., `.agents/skills/design-taste-frontend` for general UI design, or `.agents/skills/gpt-taste` for GSAP motion integration).
2. Follow every instruction defined inside the chosen Design Skill.
3. Never ignore the Design Skill.
4. Use the Design Skill as the primary source for UI/UX decisions.
5. Follow the Design Skill before writing any component.

---

## 4. UI/UX Rules

When working on UI elements, you must:
- Preserve design consistency across the cinematic experience.
- Follow the existing design language (e.g., paper textures, dark glassmorphism, cinematic film effects).
- Avoid random styling. Always use the established custom CSS tokens (e.g., `--color-paper`, `--color-olive`, `--font-serif`) and Tailwind classes.
- Reuse components whenever possible (e.g., effect overlays, media stages).
- Maintain consistent spacing based on Tailwind utilities.
- Maintain typography hierarchy using the configured fonts (Instrument Serif, DM Serif Display, Cormorant Garamond, Inter).
- Maintain consistent color usage from the palette defined in `index.css`.
- Maintain responsive behavior across mobile and desktop breakpoints.
- Preserve accessibility (e.g., respect `useReducedMotion`).

---

## 5. Coding Standards

- **Naming Conventions**: 
  - PascalCase for React component files (e.g., `ProjectorCD.jsx`).
  - camelCase for hooks and utilities (e.g., `useTypingText.js`, `lyrics.js`).
- **Component Organization**: Keep components modular. Separate purely visual effects into the `effects/` directory.
- **Folder Organization**: Group by functionality (`components`, `context`, `hooks`, `data`).
- **File Naming**: `.jsx` extension for React components, `.js` for logic/data files.
- **Import Ordering**:
  1. External libraries (`react`, `gsap`, `framer-motion`).
  2. Internal contexts and hooks.
  3. Internal components.
  4. Local data and assets.
  5. Stylesheets (if explicitly imported).
- **Reusable Component Philosophy**: Build components to be stateless where possible, deferring heavy orchestration to parent containers (like `Experience` in `App.jsx`).
- **State Management Patterns**: 
  - Use React Context (`AudioContext`, `TimelineContext`) for global/shared state.
  - Use local `useState` for component-level UI toggles.
- **Error Handling**: Fail gracefully on missing assets or unhandled context values.
- **Animation Patterns**: 
  - Use **GSAP** with `useRef` for complex, continuous, or timeline-based animations.
  - Use **Framer Motion** (`AnimatePresence`, `motion.div`) for simple enter/exit transitions and mounting logic.

---

## 6. Development Workflow

The recommended workflow for any new feature or fix is:

1. Analyze existing code.
2. Understand architecture.
3. Load Design Skill (from `.agents/skills/`).
4. Plan implementation.
5. Implement feature.
6. Verify consistency.
7. Run npm checks (`npm run build`).
8. Ensure no regressions (particularly in animations and responsive layouts).

---

## 7. AI Development Rules

- Never rewrite large portions of the project unnecessarily.
- Respect the existing architecture (do not force a router or global store if not explicitly requested).
- Avoid introducing unnecessary dependencies. Use existing GSAP, Framer Motion, and Tailwind tools.
- Keep changes minimal and focused.
- Prefer extending existing components over creating overlapping ones.
- Maintain backward compatibility whenever possible.
- Follow project conventions strictly.
- Always inspect related files before editing.
- Avoid duplicate components.
- Keep commits logically scoped.

---

## 8. Quality Checklist

Before completing any task, ensure the following checklist is satisfied:

- [ ] Architecture respected
- [ ] Design Skill followed
- [ ] npm used (no yarn, pnpm, or bun)
- [ ] Responsive design preserved
- [ ] Accessible (reduced motion respected where applicable)
- [ ] No duplicated code
- [ ] Build passes (`npm run build`)
- [ ] Existing functionality preserved (especially timeline and audio contexts)
