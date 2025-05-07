<script setup lang="ts">
import { useAuthService } from '~/composables/useAuthService';
import { useRouter } from 'vue-router'

const authService = useAuthService()
const router = useRouter()

const handleLogin = async (email: string, password: string): Promise<void> => {
  await authService.login(email, password)
  // await router.push('/app/dashboard')
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
</template>

<style>

</style>


<!-- <template>
  <div>
      <input placeholder="E-Mail" v-model="email" >
      <input placeholder="Password" v-model="password" >
      <button @click="login()">Login</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';
import { useAuthService } from '~/composables/useAuthService';


const email = ref('')
const password = ref('')
const authService = useAuthService()
const store = useStore()
const router = useRouter()
async function login() {
  try {
      await authService.login(email.value, password.value)
      const user = await authService.getUser()
      console.log(user)
      store.setUser(user)
      router.push('/')
  } catch (e) {
      console.log(e)
  }
}

</script>

<style scoped>

</style> -->