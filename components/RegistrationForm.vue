<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { UserCreate } from '~/types/api/user'

const props = defineProps<{
  onRegister: (userData: UserCreate) => Promise<void>
  onGoogleRegister: () => Promise<void>
}>()


const loading = ref(false)
const error = ref('')

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleFormSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    console.log('Form submitted')
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    const userData: UserCreate = {
      full_name: form.value.firstName + ' ' + form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
    }

    await props.onRegister(userData)

  } catch (e) {
    console.error(e)
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    console.log('Google login successful')
    await props.onGoogleRegister()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <form :class="cn('flex flex-col gap-6')" @submit.prevent="handleFormSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        Create an account
      </h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your details below to create your account
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="first-name">First name</Label>
          <Input id="first-name" placeholder="Max" required v-model="form.firstName"/>
        </div>
        <div class="grid gap-2">
          <Label for="last-name">Last name</Label>
          <Input id="last-name" placeholder="Robinson" required v-model="form.lastName"/>
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" placeholder="me@gmail.com" required v-model="form.email"/>
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required v-model="form.password"/>
      </div>
      <div class="grid gap-2">
        <Label for="confirm-password">Confirm Password</Label>
        <Input id="confirm-password" type="password" required v-model="form.confirmPassword"/>
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        Sign Up
      </Button>
    </div>

    <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
      <span class="relative z-10 bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </form>


  <GoogleButton class="mt-6" :buttonText="'Continue with Google'" :onClick="handleGoogleLogin" />
  
  <div class="mt-6 text-center text-sm">
    Already have an account?
    <a href="login" class="underline underline-offset-4">
      Sign in
    </a>
  </div>
</template>
