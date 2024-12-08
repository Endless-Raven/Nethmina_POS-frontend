import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      API_BASE_URL: 'https://nethminacellular.lk/api',
    },
  },
  server: {
    port: 3001, // Change to another available port
  },
})
