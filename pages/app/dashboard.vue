<script setup lang="ts">

</script>

<template>
  <h1>Welcome to the dashboard</h1>
</template>


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