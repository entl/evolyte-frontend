// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    alias: {
        '@': resolve(__dirname, './'),
        '@components': resolve(__dirname, './components'),
        '@api': resolve(__dirname, './composables/api'),
        '@utils': resolve(__dirname, './lib/utils'),
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    modules: [
      '@nuxtjs/tailwindcss',
      'shadcn-nuxt',
      '@nuxtjs/color-mode',
      '@nuxt/icon',
      '@nuxtjs/leaflet',
      '@pinia/nuxt',
      'nuxt-auth-utils'
    ],
    leaflet: {
        markerCluster: true
    },
    icon: {
        customCollections: [
            {
                prefix: 'my-icon',
                dir: './assets/icons'
            }
        ]
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    },
    colorMode: {
        classSuffix: '', // so it uses `dark` instead of `dark-mode`
        storageKey: 'darkMode',
        preference: 'system',
        fallback: 'light',
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_BASE_API_URL,
        },
        oauth: {
            // provider in lowercase (github, google, etc.)
            google: {
              clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
              clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
            }
        }
    }
})