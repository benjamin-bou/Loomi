import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config } from 'dotenv'

// Load environment variables from .env file
config();

// https://vite.dev/config/
export default defineConfig({
  watch: {
    usePolling: true,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // eslint-disable-next-line no-undef
    'process.env.MY_ENV_VAR': JSON.stringify(process.env.MY_ENV_VAR),
  }
})
