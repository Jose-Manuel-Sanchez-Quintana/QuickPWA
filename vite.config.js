import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest:{
        display:"standalone",
        name:"PWA Quick",
        short_name:"Quick",
        theme_color: "#000000",
        description:"PWA Quick",
        start_url: ".",
        icons:[
          {
            src: '/favicon-32x32.png',
            sizes:'32x32',
            type:'image/png',
            purpose:'favicon'
          },
          {
            src: '/android-chrome-192x192.png',
            sizes:'192x192',
            type:'image/png',
            purpose:'any'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes:'512x512',
            type:'image/png',
            purpose:'maskable'
          }
      ]
      }
    })
  ],
})