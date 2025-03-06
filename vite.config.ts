import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import dts from 'vite-plugin-dts'

const libConfig = {
  plugins: [ 
    react(),
    dts({tsconfigPath: resolve(__dirname, "tsconfig.lib.json")}),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: "Backi",
      fileName: "backi",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'color', 'sass'],
      output: {
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js'
      }
    }
  }
}

const demoConfig = {
  plugins: [ 
    react(),
    ViteYaml(),
  ],

  publicDir: resolve(__dirname, 'public'),

  build: {
    outDir: "demo",
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode == 'lib') {
    return libConfig
  } else if (mode == 'demo') {
    return demoConfig
  } else {
    return {}
  }
})
