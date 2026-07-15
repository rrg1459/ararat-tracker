// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true, // Te permite usar 'describe', 'test' y 'expect' sin importarlos en cada archivo
    setupFiles: ['./vitest.setup.js'], // Archivo de configuración inicial para las pruebas
  },
})