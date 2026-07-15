// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    globals: true, // Te permite usar 'describe', 'test' y 'expect' sin importarlos en cada archivo
    setupFiles: ['./vitest.setup.ts'], // Archivo de configuración inicial para las pruebas
  },
})