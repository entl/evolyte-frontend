import type { FetchOptions } from 'ofetch'

declare module '#app' {
  interface NuxtApp {
    $api: typeof $fetch;
  }
}

export {}
