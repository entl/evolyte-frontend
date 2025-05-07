<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <form :class="cn('flex flex-col gap-6')">
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
          <Input id="first-name" placeholder="Max" required />
        </div>
        <div class="grid gap-2">
          <Label for="last-name">Last name</Label>
          <Input id="last-name" placeholder="Robinson" required />
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" placeholder="me@gmail.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input id="username" placeholder="maxrobinson" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <div class="grid gap-2">
        <Label for="retype-password">Confirm Password</Label>
        <Input id="retype-password" type="password" required />
      </div>
      <Button type="submit" class="w-full">
        Sign Up
      </Button>
    </div>
    <div class="text-center text-sm">
      Already have an account?
      <a href="#" class="underline underline-offset-4">
        Login
      </a>
    </div>
  </form>
</template>
