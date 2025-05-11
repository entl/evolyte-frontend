import { ofetch } from "ofetch"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const accessToken = useCookie('access_token')

  const $api = ofetch.create({
    baseURL: config.public.apiBase,

    async onRequest({ options }) {
      if (accessToken) {
        options.headers = options.headers || {};
        options.headers.set('Authorization', `Bearer ${accessToken.value}`);
      }
    },

    async onResponseError({ response, request, options }) {
      if (response.status === 401 && !options._retry) {
        options._retry = true;
        try {
          // Call refresh endpoint
          await $fetch('/api/auth/refresh', {
            credentials: 'include',
            method: 'POST',
          });

          // set new access token
          accessToken.value = useCookie('access_token').value;
          
          // Retry original request with new token
          return $api(request, options);
        } catch (error) {
          console.error("Token refresh failed:", error);
          throw error;
        }
      }
      throw response;
    }
  });

  return {
    provide: {
      api: $api,
    },
  }
})