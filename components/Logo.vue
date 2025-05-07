<script setup lang="ts">
const router = useRouter();

const goToLanding = () => {
  router.push('/');
};
</script>

<template>
    <h1 class="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:cursor-pointer" @click="goToLanding">
        EvoLyte
    </h1>
</template>
