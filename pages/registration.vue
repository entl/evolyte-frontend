<script setup lang="ts">
import { useUsersApi } from '~/composables/api/useUsersApi'
import type { UserCreate } from '~/types/api/user'

const userApi = useUsersApi()
const router = useRouter()

const handleRegistration = async (userData: UserCreate) => {
  try {
    const response = await userApi.createUser(userData)

    await router.push('login')
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

const handleGoogleRegistratrion = async () => {
  try {
    await navigateTo('/auth/google', {external: true})
    console.log('Google login attempt')
  } catch (error) {
    console.error('Google login error:', error)
  }
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
            <RegistrationForm :onRegister="handleRegistration" :onGoogleRegister="handleGoogleRegistratrion"/>
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
</template>

<style>
</style>
