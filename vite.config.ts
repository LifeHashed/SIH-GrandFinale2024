import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import electron from 'vite-plugin-electron-renderer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    electron(),
    react(),viteStaticCopy({
      targets: [
        { src: 'public/*', dest: '' },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the service worker
      manifest: {
        name: 'RedactX', // Replace with your app name
        short_name: 'RedactX-1.0', // Replace with a shorter name
        description: 'NLP based auto redaction tool', // Replace with a brief app description
        theme_color: '#ffffff', // Background color for the app's title bar
        background_color: '#61DBFB', // Background color for the app's splash screen
        display: 'standalone', // Makes it look like a native app
              icons: [
                {
                  src: '/icon1.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/icon1.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: '/icon1.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable', // Maskable icon for Android devices
                },
              ],
            },
          }),
        ],
        base:'./',
        build:{
          outDir: 'dist-react'
        }
      });