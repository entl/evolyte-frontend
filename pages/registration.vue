<script setup>
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // Add your login logic here
    console.log('Login attempt with:', { email: email.value, password: password.value })
  } catch (error) {
    console.error('Login error:', error)
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
            <RegistrationForm />
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
