import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo root holds `assets/` (audio, lyrics, images) alongside `src/`.
// Vite serves the whole root, so we can import from `../assets` freely.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: true },
  build: {
    // Audio is large-ish; keep it as a real file asset rather than inlining.
    assetsInlineLimit: 4096,
  },
})
