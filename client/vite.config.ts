import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  build: {
    outDir: 'build',
    sourcemap: false, // Disable sourcemaps for production
    rollupOptions: {
      output: {
        // Optional: Customize the output settings if needed
      }
    }
  }
})
