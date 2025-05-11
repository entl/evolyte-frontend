<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthApi } from '~/composables/api/useAuthApi'

const router = useRouter()
const authApi = useAuthApi()

const handleLogin = async (email: string, password: string): Promise<void> => {
  console.log(email, password)
  const response = await authApi.login({email, password})
  console.log(response)
  await router.push('/app/dashboard')
}

</script>

<template>
    <div class="grid min-h-svh lg:grid-cols-2 bg-background text-foreground">
      <div class="flex flex-col gap-4 p-6 md:p-10">
        <div class="flex justify-between items-center">
          <Logo></Logo>
          <ColorModeButton></ColorModeButton>
        </div>
        <div class="flex flex-1 items-center justify-center">
          <div class="w-full max-w-xs">
            <LoginForm :onLogin="handleLogin" />
          </div>
        </div>
      </div>
      <div class="relative hidden bg-muted lg:block">
        <img
          src="/images/solar_panel_flipped_horizontal.png"
          alt="Login Hero"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
      </div>
    </div>

    <!-- <Button @click="handleLogout">Logout</Button> -->
    <!-- <Button @click="handleRefreshToken">refresh</Button> -->
</template>

<style>

</style>
