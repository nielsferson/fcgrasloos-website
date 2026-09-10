import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a custom domain (fcgrasloos.com) served from the repo root on GitHub
// Pages, so the base path is simply '/'. Routing uses HashRouter, which
// means direct navigation and refreshes work correctly on GitHub Pages
// without any extra 404.html redirect trick.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
