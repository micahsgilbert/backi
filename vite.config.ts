import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import mdPlugin from 'vite-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    react(),
    ViteYaml(),
    mdPlugin({mode: ['html']})
  ],

  publicDir: resolve(__dirname, 'public'),

  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
})
