import { defineNuxtPlugin } from '#imports'
import { useStore } from '~~/store/store'
import { useApi } from '~/composables/useApi'

export default defineNuxtPlugin(async () => {
  const client = useApi()
  const store = useStore()

  try {
    const user = await client.get('/users/me')
    if(user) {
      store.setUser(user)
    }   
  } catch (err) {
    console.error('No user found')
  }
})

// import { useAuthStore } from '~/composables/server/useAuth';

// export default defineNuxtRouteMiddleware(async (to) => {
//   const auth = useAuthStore();

//   console.log('auth.isTokenFresh', auth.isTokenFresh);
//   // console.log('force refresh')
//   // await auth.refresh();
//   // Only protect routes that opt‑in

//   console.log('to.meta.requiresAuth', to.meta.requiresAuth);
//   if (!to.meta.requiresAuth) return;
//   console.log('after to.meta.requiresAuth');
  
//   // 1. Already fresh? continue
//   if (auth.isTokenFresh) return;

//   // 2. Try silent refresh
//   try {
//     await auth.refresh();
//     console.log('auth.isTokenFresh after refresh', auth.isTokenFresh);
//   } catch {
//     return navigateTo('/login');
//   }
// });