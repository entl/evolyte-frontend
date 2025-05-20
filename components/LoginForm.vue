<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GoogleButton from '@/components/ui/GoogleButton.vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const props = defineProps<{
  onLogin: (email: string, password: string) => Promise<void>
  onGoogleLogin: () => Promise<void>
}>()

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await props.onLogin(email.value, password.value)
  } catch (e) {
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    console.log('Google login successful')
    await props.onGoogleLogin()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <form :class="cn('flex flex-col gap-6')" @submit.prevent="handleSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        Login to your account
      </h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
    </div>

    <div v-if="error" class="text-sm text-red-500 text-center">
      {{ error }}
    </div>

    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required v-model="email" />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="password">Password</Label>
          <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required v-model="password" />
      </div>

      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </Button>

      <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span class="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  </form>

  <GoogleButton class="mt-6" :buttonText="'Continue with Google'" :onClick="handleGoogleLogin" />
  
  <div class="mt-6 text-center text-sm">
    Don't have an account?
    <a href="registration" class="underline underline-offset-4">
      Sign up
    </a>
  </div>
</template>
