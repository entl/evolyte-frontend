// // https://nuxt.com/docs/api/configuration/nuxt-config
// import { resolve } from "path";
//
// export default defineNuxtConfig({
//   compatibilityDate: '2024-11-01',
//   devtools: { enabled: true },
//   css: ["~/assets/css/tailwind.css"],
//
//   postcss: {
//     plugins: {
//       tailwindcss: {},
//       autoprefixer: {},
//     },
//   },
//
//   modules: ["shadcn-nuxt"],
//
//   shadcn: {
//     /**
//      * Prefix for all the imported component
//      */
//     prefix: '',
//     /**
//      * Directory that the component lives in.
//      * @default "./components/ui"
//      */
//     componentDir: './components/ui'
//   }
// })

// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
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
        '@nuxtjs/leaflet'
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
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_BASE_API_URL,
        }
    }
})